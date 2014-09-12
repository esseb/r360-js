/*
 *
 */
r360.Route = function(travelTime){

    var that = this;
    that.travelTime = travelTime;
    that.routeSegments = new Array();

    /*
     *
     */
    that.addRouteSegment = function(routeSegment){
        that.routeSegments.push(routeSegment);
    }

    /*
     *
     */
    that.setTravelTime = function(travelTime){
        that.travelTime = travelTime;
    }

    /*
     *
     */

    that.getDistance = function(){
        var distance = 0;
        for(var i = 0; i < that.routeSegments.length; i++){
            distance += that.routeSegments[i].getDistance();
        }
        return distance;
    }
  
    /*
     *
     */
    that.getSegments = function(){
        return that.routeSegments;
    }

    /*
     *
     */
    that.getTravelTime = function(){
        return that.travelTime;
    }

    that.fadeIn = function(map, drawingTime, fadingType){

        var total, segment, percent, timeToDraw, lastSegement;
        var k = 0;

        if(typeof drawingTime == 'undefined') drawingTime = 0;
        if(typeof fadingType == 'undefined') fadingType = "travelTime";



        for(var j = that.routeSegments.length - 1; j >= 0; j--){
            segment     = that.routeSegments[j];
            if(fadingType == "travelTime")
                percent = segment.getTravelTime() / that.getTravelTime();
            else if (fadingType == "travelDistance")
                percent = segment.getDistance() / that.getDistance();
           
            
            timeToDraw  = percent * drawingTime;
            if(segment.getType() != "TRANSFER"){
                (function(segment, k, timeToDraw) {
                    setTimeout(function() {
                        fader(segment, timeToDraw);
                    }, k);
                })(segment, k, timeToDraw);

            }else{
                // create a small circlular marker to indicate the users have to switch trips

                var latLng = lastSegement.points[0];
                var marker = L.circleMarker(latLng, { 
                    color: lastSegement.color, fillColor: that.routeSegments[j-1].color, fillOpacity: 0.5, opacity: 0.5, stroke : true, weight: 3, 
                            radius : 5 });         

               (function(marker, k) {
                    setTimeout(function() {
                        marker.addTo(map);
                        marker.bringToFront();
                    }, k);
                })(marker, k);
            }
            k += timeToDraw;
            lastSegement = segment;
        }

        function fader(segment, millis){

            var polylineOptions         = {};
            polylineOptions.color       = segment.getColor();
            polylineOptions.opacity     = 0.8;
            polylineOptions.weight      = 8;

            if ( segment.getType() != "TRANSIT" && segment.getType() == "WALK" )  polylineOptions.dashArray = "1, 12";

            var polylineHaloOptions     = {};
            polylineHaloOptions.weight  = 12;
            polylineHaloOptions.opacity = 0.9;
            polylineHaloOptions.color   = '#9D9D9D';

            // 15ms for one peace. So if we want do draw the segment in 1 sec we need 66 pieces
            var pieces = millis / 15;
            var choppedLine = chopLineString(segment.getPoints().reverse(), pieces);
            var haloLine    = L.polyline(choppedLine[0], polylineHaloOptions).addTo(map);
            var polyLine    = L.polyline(choppedLine[0], polylineOptions).addTo(map);
            fadeLine(polyLine, haloLine, choppedLine, 1)
        };

        /*
        function is recalling itself every 25ms
        if you want the line to be drawn in one second you need to add a chopped line in (roughly) 40 pieces
        precise timing is hard to perform as a few millis are taken by the actual line drawing
        */

        function fadeLine(polyLine, haloLine, choppedLine, i){

            var latlngs = polyLine.getLatLngs();
            for(var j = 0; j < choppedLine[i].length; j++){
                latlngs.push(choppedLine[i][j])
            }
            if(latlngs.length != 0){
                haloLine.setLatLngs(latlngs);
                polyLine.setLatLngs(latlngs);
            } 

            i++;
            if(i < choppedLine.length){
                setTimeout(function(){               
                    fadeLine(polyLine, haloLine, choppedLine, i);
                }, 15);
            }                 
        }

        /*
        chops a linestring in a chosen number of equal pieces
        */

        function chopLineString(latlngs, pieces){

            var length          = 0;
            var steps           = 1 / pieces;        
            var percentSoFar    = 0;
            var segmentDistance;
            var segmentPercent;
            var newLatLngs  = new Array();
           
            for(var i = 1; i < latlngs.length; i++){
                length += latlngs[i-1].distanceTo(latlngs[i]);
            }

            var part        = new Array(); 

            for(var i = 0; i < latlngs.length -1; i++){

                
                part.push(latlngs[i]);
               
                segmentDistance  = latlngs[i].distanceTo(latlngs[i + 1]);
                segmentPercent   = segmentDistance / length;
                percentSoFar    += segmentPercent;

                if(percentSoFar >= steps){
                    while(percentSoFar >= steps){
                        percent = ((steps - (percentSoFar - segmentPercent))/segmentPercent);
                        part.push(interpolatePoint(latlngs[i],latlngs[i + 1],percent));
                        steps += 1 / pieces;

                        newLatLngs.push(part);
                        part        = new Array();
                    }
                }
            }

            newLatLngs.push(part);
            part    = new Array();
            part.push(latlngs[latlngs.length -1]);
            newLatLngs.push(part);
            return newLatLngs;
        };

        function interpolatePoint(latlng1, latlng2, percent){

            var project, unproject, tempmap;

            /*
                ugly hack. shall be redone when working with projected coordinates
            */
            if(typeof map.project != "undefined"){
                tempmap = map;
            }else{
                tempmap = map._map;
            }
            var p1 = tempmap.project(latlng1);
            var p2 = tempmap.project(latlng2);

            var xNew = (p2.x - p1.x) * percent + p1.x;
            var yNew = (p2.y - p1.y) * percent + p1.y;
            var newPoint = new L.point(xNew, yNew);

            var latlng = tempmap.unproject(newPoint);
        
            return latlng;          
        };
    };
};

r360.route = function (travelTime) { 
    return new r360.Route(travelTime);
};