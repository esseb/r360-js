/*
 Route360° JavaScript API v0.2.1 (bef1379), a JS library for leaflet maps. http://route360.net
 (c) 2014 Henning Hollburg and Daniel Gerber, (c) 2014 Motion Intelligence GmbH
*/
!function(t,o,n){r360.photonPlaceAutoCompleteControl=function(t){return new r360.PhotonPlaceAutoCompleteControl(t)},r360.PhotonPlaceAutoCompleteControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.photonPlaceAutoCompleteOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"country")&&(this.options.country=t.country),_.has(t,"reset")&&(this.options.reset=t.reset),_.has(t,"serviceUrl")&&(this.options.serviceUrl=t.serviceUrl),_.has(t,"reverse")&&(this.options.reverse=t.reverse),_.has(t,"placeholder")&&(this.options.placeholder=t.placeholder),_.has(t,"width")&&(this.options.width=t.width),_.has(t,"maxRows")&&(this.options.maxRows=t.maxRows),_.has(t,"image")&&(this.options.image=t.image),_.has(t,"index")&&(this.options.index=t.index),_.has(t,"options")&&(this.options.options=t.options,this.options.travelType=_.has(this.options.options,"init")?this.options.options.init:"walk"))},onAdd:function(t){var o=this,n=r360.config.i18n,e="",i=L.DomUtil.create("div",o._container);o.options.map=t,o.options.id=$(t._container).attr("id")+r360.Util.generateId(10),t.on("resize",o.onResize.bind(o));var s=o.options.width,a='style="width:'+s+'px;"';o.options.input='<div class="input-group autocomplete" '+a+'>                 <input id="autocomplete-'+o.options.id+'" style="color: black;width:'+s+'"                 type="text" class="form-control r360-autocomplete" placeholder="'+o.options.placeholder+'" onclick="this.select()">',o.options.image&&(o.options.input+='<span id="'+o.options.id+'-image" class="input-group-addon btn-autocomplete-marker">                     <img style="height:22px;" src="'+o.options.image+'">                  </span>');var r=[];return o.options.input+='<span id="'+o.options.id+'-options-button" class="input-group-btn travel-type-buttons" '+(o.options.options?"":'style="display: none;"')+'>                     <button class="btn btn-autocomplete" type="button" title="'+n.get("settings")+'"><i class="fa fa-cog fa-fw"></i></button>                 </span>',r.push('<div id="'+o.options.id+'-options" class="text-center" style="color: black;width:'+s+'; display: none;">'),r.push('  <div class="btn-group text-center">'),o.options.options&&o.options.options.walk&&r.push('<button type="button" class="btn btn-default travel-type-button '+("walk"==this.options.travelType?"active":"")+'" travel-type="walk"><span class="map-icon-walking travel-type-icon"></span> <span lang="en">Walk</span><span lang="de">zu Fuß</span></button>'),o.options.options&&o.options.options.bike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("bike"==this.options.travelType?"active":"")+'" travel-type="bike"><span class="map-icon-bicycling travel-type-icon"></span> <span lang="en">Bike</span><span lang="de">Fahrrad</span></button>'),o.options.options&&o.options.options.hirebike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("hirebike"==this.options.travelType?"active":"")+'" travel-type="hirebike">                             <span class="map-icon-bicycling travel-type-icon"></span> <span lang="en">Hire Bike</span><span lang="de">Leihfahrrad</span>                        </button>'),o.options.options&&o.options.options.transit&&r.push('<button type="button" class="btn btn-default travel-type-button '+("transit"==this.options.travelType?"active":"")+'" travel-type="transit"><span class="map-icon-train-station travel-type-icon"></span> <span lang="en">Transit</span><span lang="de">ÖPNV</span></button>'),o.options.options&&o.options.options.car&&r.push('<button type="button" class="btn btn-default travel-type-button '+("car"==this.options.travelType?"active":"")+'" travel-type="car"><span class="fa fa-car"></span> <span lang="en">Car</span><span lang="de">Auto</span></button>'),r.push("  </div>"),r.push("</div>"),o.options.input+='<span id="'+o.options.id+'-reverse" '+(o.options.reverse?"":'style="display: none;"')+'" class="input-group-btn">                     <button class="btn btn-autocomplete" type="button" title="'+n.get("reverse")+'"><i class="fa fa-arrows-v fa-fw"></i></button>                 </span>',o.options.input+='<span id="'+o.options.id+'-reset" '+(o.options.reset?"":'style="display: none;"')+'" class="input-group-btn">                     <button class="btn btn-autocomplete" type="button" title="'+n.get("reset")+'"><i class="fa fa-times fa-fw"></i></button>                 </span>',o.options.input+="</div>",o.options.options&&(o.options.input+=r.join("")),$(i).append(o.options.input),$(i).find("#"+o.options.id+"-reset").click(function(){o.options.onReset()}),$(i).find("#"+o.options.id+"-reverse").click(function(){o.options.onReverse()}),$(i).find("#"+o.options.id+"-options-button").click(function(){$("#"+o.options.id+"-options").slideToggle()}),$(i).find(".travel-type-button").click(function(){$(i).find(".travel-type-button").removeClass("active"),$(this).addClass("active"),setTimeout(function(){$("#"+o.options.id+"-options").slideToggle()},300),o.options.travelType=$(this).attr("travel-type"),o.options.onTravelTypeChange()}),L.DomEvent.disableClickPropagation(i),_.has(o.options,"country")&&(e+=" AND country:"+o.options.country),$(i).find("#autocomplete-"+o.options.id).autocomplete({source:function(t,n){o.source=this;var e=(t.term.split(" "),new Array,t.term);$.ajax({url:o.options.serviceUrl,async:!1,data:{q:e,limit:o.options.maxRows},success:function(e){var i=new Array;n($.map(e.features,function(n){if("boundary"!=n.osm_key){var e={},s=[],a=[];if(e.name=n.properties.name,e.city=n.properties.city,e.street=n.properties.street,e.housenumber=n.properties.housenumber,e.country=n.properties.country,e.postalCode=n.properties.postcode,e.name&&s.push(e.name),e.city&&s.push(e.city),e.street&&a.push(e.street),e.housenumber&&a.push(e.housenumber),e.postalCode&&a.push(e.postalCode),e.city&&a.push(e.city),a.push(e.country),!_.contains(i,s.join()+a.join()))return i.push(s.join()+a.join()),{label:s.join(", "),value:s.join(", "),firstRow:s.join(", "),secondRow:a.join(" "),term:t.term,index:o.options.index,latlng:new L.LatLng(n.geometry.coordinates[1],n.geometry.coordinates[0])}}}))}})},minLength:2,select:function(t,n){o.options.value=n.item,o.options.onSelect(n.item)}}).data("ui-autocomplete")._renderItem=function(t,o){function n(t){return t.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}var e=o.term?o.firstRow.replace(new RegExp(n(o.term),"gi"),"<strong>$&</strong>"):o.firstRow,i=o.term?o.secondRow.replace(new RegExp(n(o.term),"gi"),"<strong>$&</strong>"):o.secondRow,s="<a><span class='address-row1'>"+e+"</span><br/><span class='address-row2'>  "+i+"</span></a>";return $("<li>").append(s).appendTo(t)},this.onResize(),i},onSelect:function(t){this.options.onSelect=t},onReset:function(t){this.options.onReset=t},onReverse:function(t){this.options.onReverse=t},onTravelTypeChange:function(t){this.options.onTravelTypeChange=t},reset:function(){this.options.value={},this.setFieldValue("")},update:function(t,o){this.setLatLng(t),this.setFieldValue(o)},setLatLng:function(t){this.options.value.latlng=t},setFieldValue:function(t){var o=this;$("#autocomplete-"+o.options.id).val(t)},getFieldValue:function(){var t=this;return $("#autocomplete-"+t.options.id).val()},getTravelType:function(){return this.options.travelType},setValue:function(t){this.options.value=t},getValue:function(){return this.options.value},getIndex:function(){return this.options.index},onResize:function(){var t=this;this.options.map.getSize().x<550?$(t.options.input).css({width:"45px"}):$(t.options.input).css({width:""})}}),r360.placeAutoCompleteControl=function(t){return new r360.PlaceAutoCompleteControl(t)},r360.PlaceAutoCompleteControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.defaultPlaceAutoCompleteOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"country")&&(this.options.country=t.country),_.has(t,"reset")&&(this.options.reset=t.reset),_.has(t,"reverse")&&(this.options.reverse=t.reverse),_.has(t,"placeholder")&&(this.options.placeholder=t.placeholder),_.has(t,"width")&&(this.options.width=t.width),_.has(t,"maxRows")&&(this.options.maxRows=t.maxRows),_.has(t,"showOnStartup")&&(this.options.showOnStartup=t.showOnStartup),_.has(t,"image")&&(this.options.image=t.image),_.has(t,"index")&&(this.options.index=t.index),_.has(t,"autoHide")&&(this.options.autoHide=t.autoHide),_.has(t,"options")&&(this.options.options=t.options,this.options.travelType=_.has(this.options.options,"init")?this.options.options.init:"walk"))},toggleOptions:function(t){var o=this;"undefined"==typeof t?$("#"+o.options.id+"-options").slideToggle():$(t).find("#"+o.options.id+"-options").slideToggle()},onAdd:function(t){var o=this,n=r360.config.i18n,e="",i=L.DomUtil.create("div",o._container);o.options.map=t,o.options.id=$(t._container).attr("id")+r360.Util.generateId(10),t.on("resize",o.onResize.bind(o));var s=o.options.width,a='style="width:'+s+'px;"';o.options.input='<div class="input-group autocomplete r360-box-shadow" '+a+'>                 <input id="autocomplete-'+o.options.id+'" style="color: black;widthe:'+s+'"                 type="text" class="form-control r360-autocomplete" placeholder="'+o.options.placeholder+'" onclick="this.select()">',o.options.image&&(o.options.input+='<span id="'+o.options.id+'-image" class="input-group-addon btn-autocomplete-marker">                     <img style="height:22px;" src="'+o.options.image+'">                  </span>');var r=[];return o.options.input+='<span id="'+o.options.id+'-options-button" class="input-group-btn travel-type-buttons" '+(o.options.options?"":'style="display: none;"')+'>                     <button id="'+o.options.id+'-options-btn" class="btn btn-autocomplete" type="button" title="'+n.get("settings")+'"><i class="fa fa-cog fa-fw"></i></button>                 </span>',r.push('<div id="'+o.options.id+'-options" class="text-center r360-box-shadoww" style="color: black;widtth:'+s+"; display: "+(this.options.showOnStartup?"block":"none")+';">'),r.push('  <div class="btn-group text-center">'),o.options.options&&o.options.options.walk&&r.push('<button type="button" class="btn btn-default travel-type-button '+("walk"==this.options.travelType?"active":"")+'" travel-type="walk"><span class="fa fa-male travel-type-icon"></span> <span lang="en">Walk</span><span lang="no">Gå</span><span lang="de">zu Fuß</span></button>'),o.options.options&&o.options.options.bike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("bike"==this.options.travelType?"active":"")+'" travel-type="bike"><span class="fa fa-bicycle travel-type-icon"></span> <span lang="en">Bike</span><span lang="no">Sykle</span><span lang="de">Fahrrad</span></button>'),o.options.options&&o.options.options.rentbike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("rentbike"==this.options.travelType?"active":"")+'" travel-type="rentbike">                             <span class="fa fa-bicycle travel-type-icon"></span> <span lang="en">Hire Bike</span><span lang="no">Bysykkel</span><span lang="de">Leihfahrrad</span>                        </button>'),o.options.options&&o.options.options.rentandreturnbike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("rentandreturnbike"==this.options.travelType?"active":"")+'" travel-type="rentandreturnbike">                             <span class="fa fa-bicycle travel-type-icon"></span> <span lang="en">Hire & Return Bike</span><span lang="no">Bysykkel</span><span lang="de">Leihfahrrad</span>                        </button>'),o.options.options&&o.options.options.ebike&&r.push('<button type="button" class="btn btn-default travel-type-button '+("ebike"==this.options.travelType?"active":"")+'" travel-type="ebike"><span class="fa fa-bicycle travel-type-icon"></span> <span lang="en">E-Bike</span><span lang="no">Elsykkel</span><span lang="de">E-Fahrrad</span></button>'),o.options.options&&o.options.options.transit&&r.push('<button type="button" class="btn btn-default travel-type-button '+("transit"==this.options.travelType?"active":"")+'" travel-type="transit"><span class="fa fa-bus travel-type-icon"></span> <span lang="en">Transit</span><span lang="no">TODO</span><span lang="de">ÖPNV</span></button>'),o.options.options&&o.options.options.car&&r.push('<button type="button" class="btn btn-default travel-type-button '+("car"==this.options.travelType?"active":"")+'" travel-type="car"><span class="fa fa-car"></span> <span lang="en">Car</span><span lang="no">TODO</span><span lang="de">Auto</span></button>'),r.push("  </div>"),r.push("</div>"),o.options.input+='<span id="'+o.options.id+'-reverse" '+(o.options.reverse?"":'style="display: none;"')+'" class="input-group-btn">                     <button id="'+o.options.id+'-reverse-button" class="btn btn-autocomplete" type="button" title="'+n.get("reverse")+'"><i class="fa fa-arrows-v fa-fw"></i></button>                 </span>',o.options.input+='<span id="'+o.options.id+'-reset" '+(o.options.reset?"":'style="display: none;"')+'" class="input-group-btn">                     <button id="'+o.options.id+'-reset-button" class="btn btn-autocomplete" type="button" title="'+n.get("reset")+'"><i class="fa fa-times fa-fw"></i></button>                 </span>',o.options.input+="</div>",o.options.options&&(o.options.input+=r.join("")),$(i).append(o.options.input),$(i).find("#"+o.options.id+"-reset").click(function(){o.options.onReset()}),$(i).find("#"+o.options.id+"-reverse").click(function(){o.options.onReverse()}),$(i).find("#"+o.options.id+"-options-button").click(function(){$("#"+o.options.id+"-options").slideToggle()}),$(i).find(".travel-type-button").click(function(){$(i).find(".travel-type-button").removeClass("active"),$(this).addClass("active"),o.options.autoHide&&setTimeout(function(){$("#"+o.options.id+"-options").slideToggle()},300),o.options.travelType=$(this).attr("travel-type"),o.options.onTravelTypeChange()}),L.DomEvent.disableClickPropagation(i),_.has(o.options,"country")&&(e+=" AND country:"+o.options.country),$(i).find("#autocomplete-"+o.options.id).autocomplete({source:function(t,n){o.source=this;for(var i=t.term.split(" "),s=new Array,a="",r="",p=0;p<i.length;p++)-1!=i[p].search(".*[0-9].*")?s.push(i[p]):a+=i[p]+" ";if(s.length>0){r+=" OR ";for(var l=0;l<s.length;l++){var d="(postcode : "+s[l]+" OR housenumber : "+s[l]+" OR street : "+s[l]+") ";r+=d}}$.ajax({url:o.options.serviceUrl,dataType:"jsonp",jsonp:"json.wrf",async:!1,data:{wt:"json",indent:!0,rows:o.options.maxRows,qt:"en",q:"("+a+r+")"+e},success:function(e){var i=new Array;n($.map(e.response.docs,function(n){if("boundary"!=n.osm_key){var e=n.coordinate.split(","),s={},a=[],r=[];if(s.name=n.name,s.city=n.city,s.street=n.street,s.housenumber=n.housenumber,s.country=n.country,s.postalCode=n.postcode,s.name&&a.push(s.name),s.city&&a.push(s.city),s.street&&r.push(s.street),s.housenumber&&r.push(s.housenumber),s.postalCode&&r.push(s.postalCode),s.city&&r.push(s.city),!_.has(o.options,"country")&&s.country&&r.push(s.country),!_.contains(i,a.join()+r.join()))return i.push(a.join()+r.join()),{label:a.join(", "),value:a.join(", "),firstRow:a.join(", "),secondRow:r.join(" "),term:t.term,index:o.options.index,latlng:new L.LatLng(e[0],e[1])}}}))}})},minLength:2,select:function(t,n){o.options.value=n.item,o.options.onSelect(n.item)}}).data("ui-autocomplete")._renderItem=function(t,o){function n(t){return t.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}var e=o.term?o.firstRow.replace(new RegExp(n(o.term),"gi"),"<strong>$&</strong>"):o.firstRow,i=o.term?o.secondRow.replace(new RegExp(n(o.term),"gi"),"<strong>$&</strong>"):o.secondRow,s="<a><span class='address-row1'>"+e+"</span><br/><span class='address-row2'>  "+i+"</span></a>";return $("<li>").append(s).appendTo(t)},this.onResize(),i},onSelect:function(t){this.options.onSelect=t},onReset:function(t){this.options.onReset=t},onReverse:function(t){this.options.onReverse=t},onTravelTypeChange:function(t){this.options.onTravelTypeChange=t},updateI18n:function(t){var o=this;$("#autocomplete-"+o.options.id).attr("placeholder",r360.config.i18n.get(t?"placeholderSrc":"placeholderTrg")),$("#"+o.options.id+"-reverse-button").attr("title",r360.config.i18n.get("reverse")),$("#"+o.options.id+"-reset-button").attr("title",r360.config.i18n.get("reset")),$("#"+o.options.id+"-options-btn").attr("title",r360.config.i18n.get("settings"))},reset:function(){this.options.value={},this.setFieldValue("")},update:function(t,o){this.setLatLng(t),this.setFieldValue(o)},setLatLng:function(t){this.options.value.latlng=t},setFieldValue:function(t){var o=this;$("#autocomplete-"+o.options.id).val(t)},getFieldValue:function(){var t=this;return $("#autocomplete-"+t.options.id).val()},getTravelType:function(){return this.options.travelType},setValue:function(t){this.options.value=t},getValue:function(){return this.options.value},getIndex:function(){return this.options.index},onResize:function(){var t=this;this.options.map.getSize().x<550?$(t.options.input).css({width:"45px"}):$(t.options.input).css({width:""})}}),r360.TravelStartDateControl=L.Control.extend({options:{position:"topright",dateFormat:"yy-mm-dd",minDate:0},initialize:function(t){L.Util.setOptions(this,t)},onChange:function(t){this.options.onChange=t},onAdd:function(t){var o=this;o.options.map=t;var n=L.DomUtil.create("div","startDatePicker",this._container);o.datepicker=$("<div/>"),$(n).append(o.datepicker);var e={onSelect:function(){o.options.onChange(o.getValue())},firstDay:1},i=r360.config.i18n;return"en"!=i.language&&(e.monthNames=i.monthNames[i.language],e.dayNames=i.dayNames[i.language],e.dayNamesMin=i.dayNamesMin[i.language]),$(o.datepicker).datepicker(e),L.DomEvent.disableClickPropagation(n),n},getValue:function(){var t=this,o=$(t.datepicker).datepicker({dateFormat:"dd-mm-yy"}).val(),n=o.split("/"),e=n[2]+""+n[0]+n[1];return e}}),r360.travelStartDateControl=function(){return new r360.TravelStartDateControl},r360.TravelStartTimeControl=L.Control.extend({options:{position:"topright",range:!1,min:0,max:86400,step:600,initValue:28800,value:0},initialize:function(t){this.options.value=r360.Util.getHoursAndMinutesInSeconds(),L.Util.setOptions(this,t)},onSlideStop:function(t){this.options.slideStop=t},minToString:function(t){t/=60;var o=Math.floor(t/60),n=t-60*o;return o>24&&(o-=24),10>o&&(o="0"+o),10>n&&(n="0"+n),0==n&&(n="00"),o+":"+n},onAdd:function(t){var o=this;o.options.map=t,o.options.mapId=$(t._container).attr("id"),t.on("resize",this.onResize.bind(this));var n=L.DomUtil.create("div","startTimeSlider",this._container);return o.miBox=$("<div/>",{"class":"mi-box"}),o.startTimeInfo=$("<div/>"),o.label=$("<span/>"),o.slider=$("<div/>"),$(n).append(o.miBox.append(o.startTimeInfo.append(o.label)).append(o.slider)),$(o.label).text(r360.config.i18n.get("departure")+": "+o.minToString(this.options.value)+" "+r360.Util.getTimeFormat(o.options.value)),$(o.slider).slider({range:o.options.range,value:o.options.value,min:o.options.min,max:o.options.max,step:o.options.step,slide:function(t,n){$(o.label).text(r360.config.i18n.get("departure")+": "+o.minToString(n.value)+" "+r360.Util.getTimeFormat(n.value)),o.options.value=n.value},stop:function(t,n){o.options.slideStop(n.value)}}),this.onResize(),L.DomEvent.disableClickPropagation(n),n},onResize:function(){this.options.map.getSize().x<550?(this.removeAndAddClass(this.miBox,"leaflet-traveltime-slider-container-max","leaflet-traveltime-slider-container-min"),this.removeAndAddClass(this.startTimeInfo,"travel-time-info-max","travel-time-info-min"),this.removeAndAddClass(this.slider,"leaflet-traveltime-slider-max","leaflet-traveltime-slider-min")):(this.removeAndAddClass(this.miBox,"leaflet-traveltime-slider-container-min","leaflet-traveltime-slider-container-max"),this.removeAndAddClass(this.startTimeInfo,"travel-time-info-min","travel-time-info-max"),this.removeAndAddClass(this.slider,"leaflet-traveltime-slider-min","leaflet-traveltime-slider-max"))},removeAndAddClass:function(t,o,n){$(t).addClass(n),$(t).removeClass(o)},getValue:function(){return this.options.value}}),r360.travelStartTimeControl=function(){return new r360.TravelStartTimeControl},r360.TravelTimeControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.defaultTravelTimeControlOptions)),"undefined"!=typeof t&&(_.has(t,"position")&&(this.options.position=t.position),_.has(t,"unit")&&(this.options.unit=t.unit),_.has(t,"initValue")&&(this.options.initValue=t.initValue),_.has(t,"label")&&(this.options.label=t.label),_.has(t,"travelTimes")&&(this.options.travelTimes=t.travelTimes),_.has(t,"icon")&&(this.options.icon=t.icon)),this.options.maxValue=_.max(this.options.travelTimes,function(t){return t.time}).time/60,this.options.step=(this.options.travelTimes[1].time-this.options.travelTimes[0].time)/60},onAdd:function(t){var o=this;this.options.map=t,t.on("resize",this.onResize.bind(this));for(var n="",e=100/this.options.travelTimes.length,i=0;i<this.options.travelTimes.length;i++)0==i?n+='<div style="position: absolute; top: 0; bottom: 0; left: '+i*e+"%; right: "+(100-(i+1)*e)+"%; background-color: "+this.options.travelTimes[i].color+'; -moz-border-top-left-radius: 8px;-webkit-border-radius-topleft: 8px; border-top-left-radius: 8px; -moz-border-bottom-left-radius: 8px;-webkit-border-radius-bottomleft: 8px; border-bottom-left-radius: 8px;"></div>':i<this.options.travelTimes.length-1?n+='<div style="position: absolute; top: 0; bottom: 0; left: '+i*e+"%; right: "+(100-(i+1)*e)+"%; background-color: "+this.options.travelTimes[i].color+';"></div>':i==this.options.travelTimes.length-1&&(n+='<div style="position: absolute; top: 0; bottom: 0; left: '+i*e+"%; right: "+(100-(i+1)*e)+"%; background-color: "+this.options.travelTimes[i].color+'; -moz-border-top-right-radius: 8px;-webkit-border-radius-topright: 8px; border-top-right-radius: 8px; -moz-border-bottom-right-radius: 8px;-webkit-border-radius-bottomright: 8px; border-bottom-right-radius: 8px;"></div>');this.options.sliderContainer=L.DomUtil.create("div",this._container),this.options.miBox=$("<div/>",{"class":"mi-box"}),this.options.travelTimeInfo=$("<div/>"),this.options.travelTimeSlider=$("<div/>",{"class":"no-border"}).append(n);var s=$("<div/>",{"class":"ui-slider-handle"});this.options.labelSpan=this.options.label,_.has(this.options,"icon")&&"undefined"!==this.options.icon&&(this.options.iconHTML=$("<img/>",{src:this.options.icon})),this.options.travelTimeSpan=$("<span/>",{text:this.options.initValue});var a=$("<span/>",{text:this.options.unit});return $(this.options.sliderContainer).append(this.options.miBox),this.options.miBox.append(this.options.travelTimeInfo),this.options.miBox.append(this.options.travelTimeSlider),this.options.travelTimeSlider.append(s),this.options.travelTimeInfo.append(this.options.iconHTML).append(this.options.labelSpan).append(": ").append(this.options.travelTimeSpan).append(a),$(this.options.travelTimeSlider).slider({range:!1,value:o.options.initValue,min:0,max:o.options.maxValue,step:o.options.step,slide:function(t,n){return 0==n.value?!1:void $(o.options.travelTimeSpan).text(n.value)},stop:function(t,n){for(var e=new Array,i=0;i<n.value;i+=o.options.step)e.push(o.options.travelTimes[i/o.options.step]);o.options.onSlideStop(e)}}),this.onResize(),L.DomEvent.disableClickPropagation(this.options.sliderContainer),this.options.sliderContainer},onResize:function(){this.options.map.getSize().x<550?(this.removeAndAddClass(this.options.miBox,"leaflet-traveltime-slider-container-max","leaflet-traveltime-slider-container-min"),this.removeAndAddClass(this.options.travelTimeInfo,"travel-time-info-max","travel-time-info-min"),this.removeAndAddClass(this.options.travelTimeSlider,"leaflet-traveltime-slider-max","leaflet-traveltime-slider-min")):(this.removeAndAddClass(this.options.miBox,"leaflet-traveltime-slider-container-min","leaflet-traveltime-slider-container-max"),this.removeAndAddClass(this.options.travelTimeInfo,"travel-time-info-min","travel-time-info-max"),this.removeAndAddClass(this.options.travelTimeSlider,"leaflet-traveltime-slider-min","leaflet-traveltime-slider-max"))},removeAndAddClass:function(t,o,n){$(t).addClass(n),$(t).removeClass(o)},onSlideStop:function(t){var o=this.options;o.onSlideStop=t},setValue:function(t){$(this.options.travelTimeSlider).slider("value",t),$(this.options.travelTimeSpan).text(t)},getValues:function(){for(var t=this.options,o=new Array,n=0;n<$(this.options.travelTimeSlider).slider("value");n+=t.step)o.push(t.travelTimes[n/t.step].time);return o},getMaxValue:function(){return _.max(this.getValues())}}),r360.travelTimeControl=function(t){return new r360.TravelTimeControl(t)},r360.waitControl=function(t){return new L.Control.WaitControl(t)},L.Control.WaitControl=L.Control.extend({options:{position:"topleft"},initialize:function(t){L.Util.setOptions(this,t)},onAdd:function(t){this.options.map=t,this.options.mapId=$(t._container).attr("id");var o=L.DomUtil.create("div","leaflet-control-wait");return $(o).append('<div id="wait-control-'+this.options.mapId+'" class="mi-box waitControl">                 <i class="fa fa-spinner fa-spin"></i> '+("undefined"!=typeof this.options.text?this.options.text:r360.config.i18n.get("wait"))+"            </div>"),o},updateText:function(t){$("#wait-control-"+this.options.mapId).html('<i class="fa fa-spinner fa-spin"></i> '+t),$("span[lang][lang!='"+r360.config.i18n.language+"']").hide()},show:function(){$("#wait-control-"+this.options.mapId).show()},hide:function(){$("#wait-control-"+this.options.mapId).hide()}}),r360.htmlControl=function(t){return new L.Control.HtmlControl(t)},L.Control.HtmlControl=L.Control.extend({options:{position:"topleft"},initialize:function(t){L.Util.setOptions(this,t)},onAdd:function(t){this.options.id=$(t._container).attr("id")+r360.Util.generateId();var o=L.DomUtil.create("div","leaflet-control-html");return $(o).append('<div id="html-control-'+this.options.id+'" class="html-control '+this.options.classes+'"></div>'),$(o).on("mouseover",function(){t.scrollWheelZoom.disable()}),$(o).on("mouseout",function(){t.scrollWheelZoom.enable()}),o},setHtml:function(t){$("#html-control-"+this.options.id).html(t)},show:function(){$("#html-control-"+this.options.id).show()},hide:function(){$("#html-control-"+this.options.id).hide()},toggle:function(){$("#html-control-"+this.options.id).toggle()}}),r360.RadioButtonControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.defaultRadioOptions)),"undefined"!=typeof t?("undefined"!=typeof t.position&&(this.options.position=t.position),"undefined"!=typeof t.buttons&&(this.options.buttons=t.buttons),"undefined"!=typeof t.onChange&&(this.options.onChange=t.onChange)):alert("No buttons supplied!")},onAdd:function(t){var o=this;this.options.map=t;var n=L.DomUtil.create("div",this._container);return this.options.input=this.getRadioButtonHTML(),$(n).append(this.options.input),$(this.options.input).buttonset({}).change(function(){o.options.checked=$("input[name='r360_radiobuttongroup_"+o.options.buttonGroupId+"']:checked").attr("key"),o.options.onChange(o.options.checked)}),$(this.options.input).each(function(t){$(this).tooltip({open:function(t,o){$("[lang='de'], [lang='en'], [lang='no']").hide(),$("[lang='"+r360.config.i18n.language+"']").show()},content:function(){return $(this).attr("title")},position:{my:"center top+10",at:"center bottom",using:function(t,o){$(this).css(t),$("<div>").addClass("arrow top").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}})}),L.DomEvent.addListener(n,"click",L.DomEvent.stopPropagation),n},onChange:function(t){this.options.onChange=t},setValue:function(t){$("input[name='r360_radiobuttongroup_"+this.options.buttonGroupId+"']:checked").next().removeClass("ui-state-active");var o=$("input[name='r360_radiobuttongroup_"+this.options.buttonGroupId+"'][key='"+t+"']");o.attr("checked",!0),o.addClass("checked"),o.next().addClass("ui-state-active"),this.options.checked=t},getValue:function(){return this.options.checked},getRadioButtonHTML:function(){var t=this;t.options.buttonGroupId=r360.Util.generateId(5);var o=$("<div/>",{id:t.options.buttonGroupId});return o.addClass("r360-box-shadow"),_.each(t.options.buttons,function(n){var e=r360.Util.generateId(),i=$("<input/>",{type:"radio",id:"r360_"+e,value:n.key,key:n.key,name:"r360_radiobuttongroup_"+t.options.buttonGroupId}),s=$("<label/>",{"for":"r360_"+e,html:n.label});n.checked&&(t.options.checked=n.key,i.attr({checked:"checked"})),"undefined"!=typeof n.tooltip&&s.attr({title:n.tooltip}),o.append(i),o.append(s)}),o}}),r360.radioButtonControl=function(t){return new r360.RadioButtonControl(t)},r360.CheckboxButtonControl=L.Control.extend({initialize:function(t){this.options=JSON.parse(JSON.stringify(r360.config.defaultRadioOptions)),this.options.checked={},"undefined"!=typeof t?("undefined"!=typeof t.position&&(this.options.position=t.position),"undefined"!=typeof t.buttons&&(this.options.buttons=t.buttons),"undefined"!=typeof t.onChange&&(this.options.onChange=t.onChange)):alert("No buttons supplied!")},onAdd:function(t){var o=this;this.options.map=t;var n=L.DomUtil.create("div",this._container);return this.options.input=this.getCheckboxButtonHTML(),$(n).append(this.options.input),$(this.options.input).buttonset({}).change(function(){$("input:checkbox[name='r360_checkboxbuttongroup_"+o.options.buttonGroupId+"']").each(function(){$(this).is(":checked")?o.options.checked[$(this).attr("key")]=!0:o.options.checked[$(this).attr("key")]=!1}),o.options.onChange(o.options.checked)}),$(this.options.input).each(function(){$(this).tooltip({open:function(t,o){$("[lang='de'], [lang='en'], [lang='no']").hide(),$("[lang='"+r360.config.i18n.language+"']").show()},content:function(){return $(this).attr("title")},position:{my:"center top+10",at:"center bottom",using:function(t,o){$(this).css(t),$("<div>").addClass("arrow top").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}})}),L.DomEvent.addListener(n,"click",L.DomEvent.stopPropagation),n},onChange:function(t){this.options.onChange=t},getValue:function(){return this.options.checked},getId:function(){return this.id},getCheckboxButtonHTML:function(){var t=this;t.options.buttonGroupId=r360.Util.generateId(5),t.id=t.options.buttonGroupId;var o=$("<div/>",{id:t.options.buttonGroupId});return o.addClass("r360-box-shadow"),_.each(t.options.buttons,function(n){var e=r360.Util.generateId(),i=$("<input/>",{type:"checkbox",id:"r360_"+e,value:n.key,key:n.key,name:"r360_checkboxbuttongroup_"+t.options.buttonGroupId}),s=$("<label/>",{"for":"r360_"+e,html:_.isUndefined(n.icon)?""+n.label:n.icon+" "+n.label});n.checked&&(t.options.checked[n.key]=!0,i.attr({checked:"checked"})),"undefined"!=typeof n.tooltip&&s.attr({title:n.tooltip}),o.append(i),o.append(s)}),o}}),r360.checkboxButtonControl=function(t){return new r360.CheckboxButtonControl(t)},r360.LeafletPolygonLayer=L.Class.extend({initialize:function(t){this.opacity=r360.config.defaultPolygonLayerOptions.opacity,this.strokeWidth=r360.config.defaultPolygonLayerOptions.strokeWidth,this.tolerance=r360.config.defaultPolygonLayerOptions.tolerance,this.extendWidthX=r360.config.defaultPolygonLayerOptions.strokeWidth/2,this.extendWidthY=r360.config.defaultPolygonLayerOptions.strokeWidth/2,this.backgroundColor=r360.config.defaultPolygonLayerOptions.backgroundColor,this.backgroundOpacity=r360.config.defaultPolygonLayerOptions.backgroundOpacity,"undefined"!=typeof t&&("undefined"!=typeof t.opacity&&(this.opacity=t.opacity),"undefined"!=typeof t.strokeWidth&&(this.strokeWidth=t.strokeWidth),"undefined"!=typeof t.inverse&&(this.inverse=t.inverse),"undefined"!=typeof t.tolerance&&(this.tolerance=t.tolerance),"undefined"!=typeof t.extendWidthX&&(this.extendWidthX=t.extendWidthX),
"undefined"!=typeof t.extendWidthY&&(this.extendWidthY=t.extendWidthY))},setInverse:function(t){this.inverse=t},getInverse:function(){return this.inverse},getBoundingBox3857:function(){return this.multiPolygons[0].getBoundingBox3857()},getBoundingBox4326:function(){return this.multiPolygons[0].getBoundingBox4326()},onAdd:function(t){this.map=t,this.element=L.DomUtil.create("div","r360-leaflet-polygon-layer-"+$(t._container).attr("id")+" leaflet-zoom-hide"),$(this.element).attr("id","canvas"+$(this.map._container).attr("id")),this.map.getPanes().overlayPane.appendChild(this.element),this.map.on("moveend",this.draw,this),this.draw()},fitMap:function(){var t=this.getBoundingBox4326(),o=t.getSouthWest(),n=t.getNorthEast();this.map.fitBounds(L.latLngBounds(L.latLng({lat:o.lat,lng:o.lng}),L.latLng({lat:n.lat,lng:n.lng})))},clearAndAddLayers:function(t,o){return this.clearLayers(),this.addLayer(t),"undefined"!=typeof o&&o===!0&&this.fitMap(),this},addLayer:function(t){this.multiPolygons=t,this.draw()},addTo:function(t){return t.addLayer(this),this},onRemove:function(t){t.getPanes().overlayPane.removeChild(this.element),t.off("viewreset",this.draw,this)},createSvgData:function(t){var o=r360.PolygonUtil.extendBounds(this.getMapPixelBounds(),this.extendWidthX,this.extendWidthY);return r360.SvgUtil.createSvgData(t,{bounds:o,scale:256*Math.pow(2,this.map._zoom),tolerance:this.tolerance,pixelOrigin:this.map.getPixelOrigin(),offset:this.offset})},getMapPixelBounds:function(){var t=this.map.getPixelBounds();return{max:{x:t.max.x,y:t.max.y},min:{x:t.min.x,y:t.min.y}}},clearLayers:function(){this.multiPolygons=n,$("#canvas"+$(this.map._container).attr("id")).empty()},setStrokeWidth:function(t){this.strokeWidth=t},draw:function(){if("undefined"!=typeof this.multiPolygons){this.svgWidth=this.map.getSize().x+this.extendWidthX,this.svgHeight=this.map.getSize().y+this.extendWidthY;var t=$("#svg_"+$(this.map._container).attr("id")).offset(),o=$(this.map._container).offset();"undefined"==typeof this.offset&&(this.offset={x:0,y:0}),t&&(this.offset.x+=o.left-t.left-this.extendWidthX/2,this.offset.y+=o.top-t.top-this.extendWidthY/2),$("#canvas"+$(this.map._container).attr("id")).empty();for(var n=[],e=0;e<this.multiPolygons.length;e++){for(var i=this.multiPolygons[e],s=[],a=0;a<i.polygons.length;a++)s.push(this.createSvgData(i.polygons[a]));0!=s.length&&n.push(r360.SvgUtil.getGElement(s,{color:this.inverse?"black":i.getColor(),opacity:this.inverse?i.getOpacity():1,strokeWidth:this.strokeWidth}))}var r={id:$(this.map._container).attr("id"),offset:this.offset,svgHeight:this.svgHeight,svgWidth:this.svgWidth,backgroundColor:this.backgroundColor,backgroundOpacity:this.backgroundOpacity,opacity:this.opacity,strokeWidth:this.strokeWidth};$("#canvas"+$(this.map._container).attr("id")).append(this.inverse?r360.SvgUtil.getInverseSvgElement(n,r):r360.SvgUtil.getNormalSvgElement(n,r))}}}),r360.leafletPolygonLayer=function(t){return new r360.LeafletPolygonLayer(t)},r360.LeafletUtil={getMarker:function(t,o){var n=r360.has(o,"color")?"-"+o.color:"-blue";return o.icon=L.icon({iconSize:[25,41],iconUrl:o.iconPath+"marker-icon"+n+".png",iconAnchor:[12,41],shadowSize:[41,41],shadowUrl:o.iconPath+"marker-shadow.png",shadowAnchor:[41/3,41],popupAnchor:[0,-35]}),L.marker(t,o)},fadeIn:function(t,o,n,e,i,s){function a(t){segment=o.routeSegments[t],percent="travelTime"==e?segment.getTravelTime()/o.getTravelTime():segment.getDistance()/o.getDistance(),timeToDraw=percent*n,"TRANSFER"!=segment.getType()?l(segment,timeToDraw,i,t):(("undefined"==typeof i||i.paintTransfer||"undefined"!=typeof i&&!r360.has(i,"paintTransfer"))&&r(segment,i),++t<o.routeSegments.length&&a(t))}function r(t,o){p(t.points[0],t,o),t.points.length>1&&t.points[0].lat!=t.points[1].lat&&t.points[0].lng!=t.points[1].lng&&p(t.points[1],t,o)}function p(o,n,e){var i=L.circleMarker(o,{color:!r360.isUndefined(e)&&r360.has(e,"transferColor")?e.transferColor:n.getColor(),fillColor:!r360.isUndefined(e)&&r360.has(e,"transferHaloColor")?e.transferHaloColor:"undefined"!=typeof n.getHaloColor()?n.getHaloColor():"#9D9D9D",fillOpacity:!r360.isUndefined(e)&&r360.has(e,"transferFillOpacity")?e.transferFillOpacity:1,opacity:!r360.isUndefined(e)&&r360.has(e,"transferOpacity")?e.transferOpacity:1,stroke:!r360.isUndefined(e)&&r360.has(e,"transferStroke")?e.transferStroke:!0,weight:!r360.isUndefined(e)&&r360.has(e,"transferWeight")?e.transferWeight:4,radius:!r360.isUndefined(e)&&r360.has(e,"transferRadius")?e.transferRadius:8}),s=!r360.isUndefined(e)&&r360.has(e,"popup")?e.popup:"INSERT_TEXT";if("undefined"!=typeof n){var a=_.contains(["walk","transit","source","target","bike","car"],n.startname)?"":n.startname;a=""!=a||_.contains(["walk","transit","source","target","bike","car"],n.endname)?a:n.endname,s=s.replace("INSERT_TEXT",a)}!r360.isUndefined(e)&&r360.has(e,"popup")&&(i.bindPopup(s),i.on("mouseover",function(){i.openPopup()})),i.addTo(t),i.bringToFront()}function l(o,n,e,i){var a={};a.color=!r360.isUndefined(e)&&r360.has(e,"color")?e.color:o.getColor(),a.opacity=!r360.isUndefined(e)&&r360.has(e,"opacity")?e.opacity:.8,a.weight=!r360.isUndefined(e)&&r360.has(e,"weight")?e.weight:5,"TRANSIT"!=o.getType()&&"WALK"==o.getType()&&(a.color=!r360.isUndefined(e)&&r360.has(e,"walkColor")?e.walkColor:"#006F35",a.weight=!r360.isUndefined(e)&&r360.has(e,"walkWeight")?e.walkWeight:7,a.dashArray=!r360.isUndefined(e)&&r360.has(e,"walkDashArray")?e.walkDashArray:"1, 10");var r={};r.weight=!r360.isUndefined(e)&&r360.has(e,"haloWeight")?e.haloWeight:10,r.opacity=!r360.isUndefined(e)&&r360.has(e,"haloOpacity")?e.haloOpacity:.7,r.color=!r360.isUndefined(e)&&r360.has(e,"haloColor")?e.haloColor:"undefined"!=typeof o.getHaloColor()?o.getHaloColor():"#9D9D9D";var p=n/15,l=u(o.getPoints(),p),c=L.polyline(l[0],r).addTo(t),h=L.polyline(l[0],a).addTo(t);c.on("click",s),h.on("click",s),d(h,c,l,1,i)}function d(t,n,e,i,s){for(var r=t.getLatLngs(),p=0;p<e[i].length;p++)r.push(e[i][p]);0!=r.length&&(n.setLatLngs(r),t.setLatLngs(r)),++i<e.length?setTimeout(function(){d(t,n,e,i,s)},15):++s<o.routeSegments.length&&a(s)}function u(t,o){for(var n,e,i=0,s=1/o,a=0,r=new Array,p=1;p<t.length;p++)i+=t[p-1].distanceTo(t[p]);for(var l=new Array,p=0;p<t.length-1;p++)if(l.push(t[p]),n=t[p].distanceTo(t[p+1]),e=n/i,a+=e,a>=s)for(;a>=s;)percent=(s-(a-e))/e,l.push(c(t[p],t[p+1],percent)),s+=1/o,r.push(l),l=new Array;return r.push(l),l=new Array,l.push(t[t.length-1]),r.push(l),r}function c(o,n,e){var i;i="undefined"!=typeof t.project?t:t._map;var s=i.project(o),a=i.project(n),r=(a.x-s.x)*e+s.x,p=(a.y-s.y)*e+s.y,l=new r360.point(r,p),d=i.unproject(L.point(l.x,l.y));return d}"undefined"==typeof n&&(n=0),"undefined"==typeof e&&(e="travelTime"),a(0)}}}(window,document);