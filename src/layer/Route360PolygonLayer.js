/*
 *
 */
r360.Route360PolygonLayer = L.Class.extend({
   
    /**
      * This methods initializes the polygon layer's stroke width and polygon opacity.
      * It uses the default values, and in case the options contain other values, the
      * default values are overwritten. 
      *
      * @method send
      * 
      * @param {Object} [options] The typical JS options array.
      * @param {Number} [options.opacity] Defines the opacity of the polygons. 
      *     Higher values mean that the polygon is less opaque.
      * @param {Number} [options.strokeWidth] Defines the strokewidth of the polygons boundaries.
      *     Since we have degenerated polygons (they can have no area), the stroke width defines the
      *     thickness of a polygon. Thicker polygons are not as informative as thinner ones.
      */
    initialize: function (options) {
        
        // set default parameters
        this.opacity     = r360.config.defaultPolygonLayerOptions.opacity;
        this.strokeWidth = r360.config.defaultPolygonLayerOptions.strokeWidth;
        
        // overwrite defaults with optional parameters
        if ( typeof options != 'undefined' ) {

            if ( typeof options.opacity     != 'undefined') this.opacity      = options.opacity;
            if ( typeof options.strokeWidth != 'undefined') this.strokeWidth  = options.strokeWidth;
        }

        this._multiPolygons = new Array(); 
    },

    /* 
     *
     */
    getBoundingBox : function(){
        return new L.LatLngBounds(this._bottomLeft, this._topRight)
    },
    
    /*
     *
     */
    onAdd: function (map) {

        this._map = map;
        // create a DOM element and put it into one of the map panes
        this._el = L.DomUtil.create('div', 'my-custom-layer-'+$(map._container).attr("id")+' leaflet-zoom-hide');
        $(this._el).css({"opacity": this.opacity});
        $(this._el).attr("id","canvas" + $(this._map._container).attr("id"));
        this._map.getPanes().overlayPane.appendChild(this._el);

        // add a viewreset event listener for updating layer's position, do the latter
        this._map.on('moveend', this._reset, this);
        this._reset();
    },
    
    /*
    *
     */
    addLayer:function(sourceToPolygons){        
        
        var that    = this;

        if(r360.config.logging) var start   = new Date().getTime();

        that._resetBoundingBox();
        that._multiPolygons = new Array();

        if(r360.config.logging) var start_projecting   = new Date().getTime();
        

        _.each(sourceToPolygons, function(source){
            _.each(source.polygons, function(polygon){
                polygon.project(that._map);                
            });
        })

        if(r360.config.logging) var end_projecting   = new Date().getTime();
        

         _.each(sourceToPolygons, function(source){
            _.each(source.polygons, function(polygon){             
                that._updateBoundingBox(polygon.outerBoundary);         
            });
        })

         _.each(sourceToPolygons, function(source){
            _.each(source.polygons, function(polygon){               
                that._addPolygonToMultiPolygon(polygon);
            });
            that._multiPolygons.sort(function(a,b) { return (b.getTravelTime() - a.getTravelTime()) });
        })

        if(r360.config.logging){
            var end = new Date().getTime();
            console.log("adding layers took " + (end - start) + "ms; Projecting took: " + (end_projecting - start_projecting) + "ms");
        }
    },

    /*
     *
     */
    _addPolygonToMultiPolygon: function(polygon){

        var multiPolygons = _.filter(this._multiPolygons, function(multiPolygon){ return multiPolygon.getTravelTime() == polygon.travelTime; });

        // multipolygon with polygon's travetime already there
        if ( multiPolygons.length > 0 ) multiPolygons[0].addPolygon(polygon);
        else {

            var mp = new r360.multiPolygon();
            mp.setTravelTime(polygon.travelTime);
            mp.addPolygon(polygon);
            mp.setColor(polygon.getColor());
            this._multiPolygons.push(mp);
        }
    },

    /*
     *
     */
    _resetBoundingBox: function(){
        this._latlng = new L.LatLng(-180, 90);
        this._topRight = new L.latLng(-90,-180);
        this._bottomLeft = new L.latLng(90, 180);
    },
    
    /*
     *
     */
    _updateBoundingBox:function(coordinates){

        var that = this;

        _.each(coordinates, function(coordinate){

            if ( coordinate.lat > that._topRight.lat )          that._topRight.lat   = coordinate.lat;                
            else if( coordinate.lat < that._bottomLeft.lat )    that._bottomLeft.lat = coordinate.lat;
            
            if ( coordinate.lng > that._topRight.lng )          that._topRight.lng   = coordinate.lng;
            else if( coordinate.lng < that._bottomLeft.lng )    that._bottomLeft.lng = coordinate.lng;
        })
        
        if ( that._latlng.lat < that._topRight.lat)     that._latlng.lat = that._topRight.lat;
        if ( that._latlng.lng > that._bottomLeft.lng)   that._latlng.lng = that._bottomLeft.lng;
    },
  
    /*
     *
     */
    onRemove: function (map) {

        // remove layer's DOM elements and listeners
        map.getPanes().overlayPane.removeChild(this._el);
        map.off('viewreset', this._reset, this);
    },
    
    /*
     *
     */
    _buildString:function(path, point, suffix){
        
        var a = new Array();

        a.push(suffix);
        a.push(Math.round(point.x));
        a.push(Math.round(point.y));
        path.push(a)
        //path += suffix + point.x + ' ' + point.y;
        return path;
    },
    
    /*
     *
     */
    _createSVGData: function(polygon){

        // the min amount of pixels for a new point
        var minDiff = 5;

        var that    = this;        
        var points  = new Array();
        var scale   = Math.pow(2,that._map._zoom);
        var svgM    = "M";
        var svgL    = "L";        
        var pathData= new Array();
        var diffX, diffY, px, py, projectedPoint;
        var bounds  = that._map.getPixelBounds();
        var mapSize = that._map.getSize();


        

        /*
        we are only drawing the point if it is different to the last one
        hence, depending on zoom, we can reduce the number of points (SVG size) dramatically
        */   
        

        // the outer boundary
        for(var i = 0; i < polygon.outerProjectedBoundary.length; i++){

            projectedPoint = polygon.outerProjectedBoundary[i];

            px    = projectedPoint.x * scale; 
            py    = projectedPoint.y * scale; 
            

           

            if(px > bounds.max.x + mapSize.x)
                px = bounds.max.x + mapSize.x;
            if(py > bounds.max.y + mapSize.y)
                py = bounds.max.y + mapSize.y;
            if(px < bounds.min.x - mapSize.x)
                px = bounds.min.x - mapSize.x;
            if(py < bounds.min.y - mapSize.y)
                py = bounds.min.y - mapSize.y;
          

            point = new L.Point(px,py);
            point.x -= that._map.getPixelOrigin().x;
            point.y -= that._map.getPixelOrigin().y;

            if(i > 0){
                diffX = points[points.length-1].x - point.x;
                diffY = points[points.length-1].y - point.y;
            }
            else
                diffX = diffY = minDiff;
            

            if(diffY >= minDiff || diffX >= minDiff || diffX <= -minDiff || diffY <= -minDiff){
                points.push(point);
                if(i > 0)
                    pathData = that._buildString(pathData, point, svgL)
                else
                    pathData = that._buildString(pathData, point, svgM)
            }
        }
        
        pathData.push(['z']);
       

        // the inner boundaries

        /*
        for(var i = 0; i < polygon.innerProjectedBoundaries.length; i++){
            for(var j = 0; j < polygon.innerProjectedBoundaries[i].length; j++){
                projectedPoint = polygon.innerProjectedBoundaries[i][j];
                
                px    = projectedPoint.x * scale - that._map.getPixelOrigin().x;
                py    = projectedPoint.y * scale - that._map.getPixelOrigin().y;
                point = new L.Point(px,py);

                diffX = points[points.length-1].x - point.x;
                diffY = points[points.length-1].y - point.y; 



                if(diffY >= minDiff || diffX >= minDiff || diffX <= -minDiff || diffY <= -minDiff){
                    points.push(point);
                    if(j != 0)
                        pathData = that._buildString(pathData, point, svgL)
                    else
                        pathData = that._buildString(pathData, point, svgM)
                }
            }
            pathData.push(['z']);
        }
        */
        return pathData;
    },

    /*
     *
     */
    clearLayers: function(){        
        $('#canvas'+ $(this._map._container).attr("id")).empty();
        this.initialize();
    },

    /*
     *
     */
    _reset: function () {

        var that = this;
        
        //internalSVGOffset is used to have a little space between geometries and svg frame. otherwise buffers won't be displayed at the edges.
        var internalSVGOffset = 100;

        if(r360.config.logging) var start   = new Date().getTime();

        if(this._multiPolygons.length > 0){
            var pos = this._map.latLngToLayerPoint(this._latlng);         
            pos.x -= internalSVGOffset;
            pos.y -= internalSVGOffset;
            L.DomUtil.setPosition(this._el, pos);

            var bounds = that._map.getPixelBounds()

            console.log("pos: " + pos + " bound max " + bounds.max);


            that._ieFixes();

            $('#canvas'+ $(this._map._container).attr("id")).empty();         

            var bottomLeft = this._map.latLngToLayerPoint(this._bottomLeft);
            var topRight = this._map.latLngToLayerPoint(this._topRight);
            var paper = Raphael('canvas'+ $(this._map._container).attr("id"), (topRight.x - bottomLeft.x) + internalSVGOffset * 2, (bottomLeft.y - topRight.y) + internalSVGOffset * 2);
            var st = paper.set();
            var svgData;
            var mp, poly;

            for(var i = 0; i < this._multiPolygons.length; i++){
                mp = this._multiPolygons[i];
                
                svgData = new Array();

                if(r360.config.logging) var start_svg   = new Date().getTime();
                for ( var j = 0; j < mp.polygons.length; j++) {
                    var svg = this._createSVGData(mp.polygons[j]);
                    if(svg.length > 2)
                        svgData.push(svg);
                }
                if(r360.config.logging) console.log("svg creation took: " + (new Date().getTime() - start_svg));                    
                
             
                // ie8 (vml) gets the holes from smaller polygons
                if(navigator.appVersion.indexOf("MSIE 8.") != -1){
                    if (i < this._multiPolygons.length-1 ) {
                        for ( var l = 0; l < this._multiPolygons[i+1].polygons.length; l++ ) {
                            var poly2 = this._multiPolygons[i+1].polygons[l];
                            svgData.push(this._createSVGData(poly2.outerBoundary));
                        }
                    }
                }

                //'fill-opacity': 0

                var color = mp.getColor();
                if(r360.config.logging) var start_raphael  = new Date().getTime();
                var path = paper.path(svgData).attr({fill: color, stroke: color, "stroke-width": that.strokeWidth, "stroke-linejoin":"round","stroke-linecap":"round","fill-rule":"evenodd"})
                            .attr({ "opacity":"1"}).animate({ "opacity" : "1" }, mp.polygons[0].travelTime/3)
                            path.translate((bottomLeft.x - internalSVGOffset) *-1,((topRight.y - internalSVGOffset)*-1));
                st.push(path);
                if(r360.config.logging){
                    console.log("raphael creation took: " + (new Date().getTime() - start_raphael));                    
                }
            }

            if(navigator.appVersion.indexOf("MSIE 8.") != -1){
                $('shape').each(function() {
                    $( this ).css( {"filter": "alpha(opacity=" + that.opacity * 100 + ")"} );
                });
            }
        }

        if(r360.config.logging){
            var end   = new Date().getTime();
            console.log("layer resetting tool: " +  (end - start) + "ms");
        } 
    },

    _ieFixes: function(){
         //ie 8 and 9 
        if (navigator.appVersion.indexOf("MSIE 9.") != -1 )  {
            $('#canvas'+ $(this._map._container).attr("id")).css("transform", "translate(" + pos.x + "px, " + pos.y + "px)");
        }
        if(navigator.appVersion.indexOf("MSIE 8.") != -1){
            $('#canvas'+ $(this._map._container).attr("id")).css({"position" : "absolute"});
        }
    }


});

r360.route360PolygonLayer = function () {
    return new r360.Route360PolygonLayer();
};