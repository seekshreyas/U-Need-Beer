var BEERVIZ = BEERVIZ || {};

BEERVIZ = (function(){

	//var styleColors = [ 'fd78bd', 'a186be', '662d91', '5ea95c', 'ffdd00', '6dcff6', 'd74d94', '46142e', 'f26d7d', '5dbab9', '80bb42', 'cacec2', 'f1b867', '003663', 'f5989d', 'cd6f3c', '00a99d', '2e5a59', 'fff799', 'fbaf5d', '003663', '052a24', 'fff799', 'fbaf5d', '007236', 'aa71aa', 'bbbb42', '9ac2b9', '1d3b56', 'f26c4f', '7b0046', 'fed42a', '82ca9c', 'aaa6ce', '455870', '0b6e5f', '00aeef'];
	// var styleColors = [ 'A6ACF4', '43ACED', '38ACB2', '906AE2', 'EA6363', 'F445DB', '9938C1', '97F77C', 'F4B608', 'ED985F', 'F9E662', 'C3F9A0', '076EEA','9681EA', 'FC00FC','E5A1E5','A5DBF9','92FF92','1F74A3','3F093F','042B59','117A93','03352B','FF1515','54280A','123F06','4A0566','212A5E','052A3F','8CA9AA','2F5B49','113003','3A0303','E56565','FC4FEC','F70D88','AA5CA5','824EA0','794CF2','4743F9']
	 var styleColors = [ 'fd78bd', 'a186be', '662d91', '5ea95c', 'ffdd00', '6dcff6', 'd74d94', '46142e', 'f26d7d', '5dbab9', '80bb42', 'cacec2', 'f1b867', '003663', 'f5989d', 'cd6f3c', '00a99d', '2e5a59', 'fff799', 'fbaf5d', '003663', '052a24', 'fff799', 'fbaf5d', '007236', 'aa71aa', 'bbbb42', '9ac2b9', '1d3b56', 'f26c4f', 'ee3224', 'fed42a', '82ca9c', 'aaa6ce', '455870', '0b6e5f', '00aeef', '448ccb', '7b0046', 'c4d9ec']
	// var styleColors = [ 'fd78bd', 'a186be', '662d91', '5ea95c', 'ffdd00', '6dcff6', 'd74d94', '46142e', 'f26d7d', '5dbab9', '80bb42', 'cacec2', 'f1b867', '003663', 'f5989d', 'cd6f3c', '00a99d', '2e5a59', 'fff799', 'fbaf5d', '003663', '052a24', 'fff799', 'fbaf5d', '007236', 'aa71aa', 'bbbb42', '9ac2b9', '1d3b56', 'f26c4f', 'ee3224', 'fed42a', '82ca9c', 'aaa6ce', '455870', '0b6e5f', '00aeef']
	// var styleColors = [ 'fd78bd', 'a186be', '662d91', '5ea95c', 'ffdd00', '6dcff6', 'd74d94', '46142e', 'f26d7d', '5dbab9', '80bb42', 'cacec2', 'f1b867', '003663', 'f5989d', 'cd6f3c', '00a99d', '2e5a59', 'fff799', 'fbaf5d', '003663', '052a24', 'fff799', 'fbaf5d', '007236', 'aa71aa', 'bbbb42', '9ac2b9', '1d3b56', 'f26c4f', 'ee3224', 'fed42a', '82ca9c', 'aaa6ce', '455870', '0b6e5f', '00aeef'];
	var colorSelector = 0;
	var colorIndex = [];
	var styleVal = 0;
	var userBeerType = 0;
	var attributeVal =[];
	var beerStyles = [];
	var userpref='overall';



	/****************************************
	** Module:: Global Initialization
	*****************************************/
	var init = function(){
		console.log('basic page initializations');

		initColorFilter();
		evtHandler();
		initAttributeFilter();
		hideVizContext(); // hide all the the containers that are viz sensitive on document load
		loadData('DF1');

	};

	$("#list-credit").click(function () {
    $("#wrapper-credit").slideToggle("slow");
});

	$(".close").click(function() {
     $("#wrapper-credit").slideToggle("slow");
});

	function loadData(id){
		var subPlotData
		var code = id.slice(0,2);
		console.log(code);
		// Added to display the block only when user hovers
		if(code !='DF') 
		{
			$('#wrapper-details').css("display", "block" );
			$('#wrapper-details').css("background", "rgba(190, 215, 53, 0.77)" );
			$('#list-beersummary').css("display", "block" );
		}

		switch(code){

			case 'AR':
				path = 'data/aroma.json'
				break;
			case 'AP':
				path = 'data/appearance.json'
				break;
			case 'TA':
				path = 'data/taste.json'
				break;
			case 'OV':
				path = 'data/overall.json'
				break;
			default:
				path = 'data/overall.json'
		}

		jQuery.getJSON(path, function(data) {
			  			  
			  jQuery.each(data, function(key,val) { 
			  		if (val.id==id)
			  		{
			  			// console.log("hover values:", val);
			  			$('#beersummary-name').html(val.name.split(".")[1]);
			  			$('#beersummary-style').text('Style: '+val.style);
						$('#beersummary-ABV').text('ABV: '+val.ABV);
			  			$('#beersummary-rating').html('Average Rating of <span class=highlight>  '+val.avg_rating+' / 5</span> by <b>'+ val.size+'</b> users');
			  			$('#beersummary-rating').text(val.user);

			  		}
			  		
			  });
			});
	}
	

	var hideVizContext = function(){
		jQuery('.context-viz').hide();
	}
	
	var initColorFilter = function(){

		jQuery('#list-beercategory li').each(function(){
			var colorVal = jQuery(this).attr('data-hue');
			colorIndex.push(colorVal);
			colorVal = '#' + colorVal; //to add the '#' to color values



			// jQuery(this).css({
			// 	'background-color': colorVal
			// });
		});

		 console.log("colorIndex:", colorIndex);
	};



	var initAttributeFilter = function(){

		jQuery('#list-attributes li').each(function(){
			var attrVal = jQuery(this).attr('data-attribute');
			attributeVal.push(attrVal);
		});
		console.log("attributeVal:", attributeVal);
	};

	function resetClass(selector,c){

		selector.parent().children().each(function(){

			 	if(jQuery(this).hasClass('active')){
			 		jQuery(this).removeClass('active');
			 	}
			 });

	}

	function evtHandler(){
		// console.log("event handler initialized");
		
		jQuery('#list-beercategory li').click(function(){
			var getColorVal = jQuery(this).attr('data-hue');

			// jQuery('#list-beercategory li').each(function)

			resetClass(jQuery(this), 'active');
			jQuery(this).addClass('active');

			colorSelector = getColorVal;
			console.log("getColorVal" , getColorVal);
			console.log("styleVal" , styleVal);
			triggerViz(colorSelector, styleVal);

			//jQuery(this).class('active');

		});


		jQuery('#list-usePref li').click(function(){

			resetClass(jQuery(this), 'active');
			jQuery(this).addClass('active');
			console.log("colorSelector: ",colorSelector);
			triggerViz(colorSelector, styleVal);



		});



		// jQuery('#btn-toggleCategory').click(function(){
		// 	jQuery('#list-beercategory').toggleClass('less');
		// });


		// jQuery('#list-beerstyle li').click(function(){
		// 	var getBeerStyle = jQuery(this).attr('data-catname');

		// 	console.log("get beer style:", getBeerStyle);

		// 	triggerViz(colorSelector, getBeerStyle);
		// });


	}

	var triggerViz = function(colorVal, styleVal){

		jQuery('#beerCategorySelection').css({
			"background-color": "#" + colorVal
		});

		var getColorIndex = jQuery.inArray(colorVal, colorIndex);
		var beerType = 0;
		console.log("colorVal",colorVal);
		console.log("getColorIndex:",getColorIndex);
		switch(true){

			case (getColorIndex>0 && getColorIndex<=10):
				beerType = 0; ////light beer
				break;
			case (getColorIndex>10 && getColorIndex<=20):
				beerType = 1; //medium beer

				break;
			case (getColorIndex>20 && getColorIndex<=40):
				beerType = 2; //dark beer
				break;
			default:
				console.log("unknown beer variety");
		}
		userBeerType = beerType;

		$("#beerType").val(userBeerType);
		console.log("userBeerType*********",$('#beerType').val());

		d3Example(userBeerType, styleVal);

		renderBeerStyles();


		var vizPos = jQuery('#wrapper-viz').offset();
		// jQuery('html, body').animate({
		// 	scrollTop : vizPos.top + 500
		// }, 1000);

		jQuery('.context-viz').show();
		jQuery('#wrapper-viz').fadeIn(4000);
	}






	function renderBeerStyles(bStyles, bStylesColors){
		// console.log("beer styles:", bStyles, bStyles.length, typeof bStyles, typeof bStyles.length);

		console.log("style colors:", styleColors);

		var styleContainer = jQuery('#list-beerstyle');
		styleContainer.html('');

		styleContainer.html('');
		var header =   jQuery('#styleHead');  
		header.html(''); 

		switch (userBeerType){

			case 0:
				var type="Light";
				break;
			case 1: 
				var type="Medium";
				break;
			case 2:
				var type="Dark";
				break;
			default:
				var type="";
		}

		header.append("<h3>Beer Styles ("+type+" Beers)<h3>");
		console.log("bStyles: ",bStyles);
		if (bStyles && bStyles.length > -1){
			// console.log("beer styles:", bStyles, bStyles.length, typeof bStyles, typeof bStyles.length, bStylesColors, styleColors[bStylesColors]);

			for(var i=0; i < bStyles.length; i++){
				var tempInsertElement = '<li><span class="beerstyle-name">'+ bStyles[i]+'</span><span class="beerstyle-color" style="background-color:#'+ styleColors[bStylesColors[i]-1]+'">&nbsp;</span></li>';
				styleContainer.append(tempInsertElement);
			}
		}
	}



	var d3Example = function(colorVal, styleVal){

		// console.log("color Value:", colorVal, "style Value:", styleVal);


		
		var w = 1100,
		    h = 1000,
		    rx = w / 2 - 100,
		    ry = h / 2 - 100,
		    m0,
		    rotate = 0;

		var splines = [];

		var cluster = d3.layout.cluster()
		    .size([360, ry - 120])
		    .sort(function(a, b) { return d3.ascending(a.key, b.key); });

		var bundle = d3.layout.bundle();

		var line = d3.svg.line.radial()
		    .interpolate("bundle")
		    .tension(.85)
		    .radius(function(d) { return d.y; })
		    .angle(function(d) { return d.x / 180 * Math.PI; });

		// Chrome 15 bug: <http://code.google.com/p/chromium/issues/detail?id=98951>
		jQuery('#wrapper-viz').html('');
		var div = d3.select("#wrapper-viz");

		var svg = div.append("svg:svg")
		    .attr("width", w)
		    .attr("height", w)
		    .append("svg:g")
		    .attr("transform", "translate(" + rx + "," + (ry + 100)+ ")");

		svg.append("svg:path")
		    .attr("class", "arc")
		    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
		    .on("mousedown", mousedown);

		//Initialising userPrefChoice
		userpref =  jQuery("#list-usePref li.active").attr('data-usePref');
		//var filename = 'data/'+jQuery("#list-usePref li.active").attr('data-usePref')+'.json';
		filename = 'data/'+userpref+'.json';
		console.log("filename",filename);
		d3.json(filename, function(error, classes){




			var nodes = cluster.nodes(packages.root(classes)),
		      	links = packages.imports(nodes),
		      	splines = bundle(links);


			var path = svg.selectAll("path.link")
			      .data(links)
			    .enter().append("svg:path")
			      .attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key; })
			      .attr("stroke", function(d,i){
	      				// console.log("style value", d.style_color, "line:", d.source.style_color);
	      				return '#' + styleColors[d.source.style_color - 1];
	      		   })
			      .attr("d", function(d, i) { return line(splines[i]); });

			var label = svg.selectAll("g.node")
			      			.data(nodes.filter(function(n) { return !n.children; }))
			    		.enter().append("svg:g")
			      			.attr("class", "node")
			      			.attr("id", function(d) { return "node-" + d.key; })

			      			.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });

			
		    label.append("circle")
		    	.attr("cx", 0)
		    	.attr("cy", 0)
		    	.attr("fill", function(d,i){
		    		return '#' + styleColors[d.style_color - 1];
		    	})
		    	.attr("opacity", 1.0)
		    	.attr("r", function(d,i){ 
		    		return Math.round(Math.pow(d.size, 1/3)); 
		    	});

		    label.append("svg:text")
		      .attr("dx", function(d) { return d.x < 180 ? 30 : -30; })
		      .attr("dy", "0.31em")
		      .attr("font-size", function(d,i){
		      	// console.log("font-size", d.size);

		      	// var textSize = 1 + (d.size/1000); 
		      	textSize = 1.2;
		      	return textSize + 'em';
		      })
		      .attr("fill", function(d,i){
		      	

		      	return '#' + styleColors[d.style_color - 1];
		      })
		      .attr("beerid", function(d,i){
		      	// console.log("beer id:", d.id);

		      	return d.id;
		      })
		      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
		      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
		      .text(function(d) { 

			      	var beerName = d.key;

			      	// console.log("beer name:", beerName, beerName.length, beerName.slice(0, 10));

			      	if(beerName.length > 20){
			      		beerName = d.key.slice(0, 19);

			      		beerName = beerName + '...';
			      	}

			      	return beerName; 
			     })
		     
		      .on("mouseover", function(d,i){
		      	console.log("style color:", d.id);

		      	loadData(d.id);

		      	mouseover(d,i);
		      })
			  .on("mouseout", mouseout)
			  .append("svg:title")
		      	.text(function(d){
		      		return d.key;
		      	});
	});
	

			
		

		// d3.select(window)
		//     .on("mousemove", mousemove)
		//     .on("mouseup", mouseup);

		function mouse(e) {
		  return [e.pageX - rx, e.pageY - ry];
		}

		function mousedown() {
		  m0 = mouse(d3.event);
		  d3.event.preventDefault();
		}

		function mousemove() {
		  if (m0) {
		    var m1 = mouse(d3.event),
		        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
		    div.style("-webkit-transform", "translate3d(0," + (ry - rx) + "px,0)rotate3d(0,0,0," + dm + "deg)translate3d(0," + (rx - ry) + "px,0)");
		  }
		}

		

		function mouseup() {
		  if (m0) {
		    var m1 = mouse(d3.event),
		        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

		    rotate += dm;
		    if (rotate > 360) rotate -= 360;
		    else if (rotate < 0) rotate += 360;
		    m0 = null;

		    div.style("-webkit-transform", "rotate3d(0,0,0,0deg)");

		    svg
		        .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
		      .selectAll("g.node text")
		        .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 30 : -30; })
		        .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
		        .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });
		  }
		}


		var pathOriginalColor = '';


		function mouseover(d) {
			jQuery('#wrapper-viz').addClass('chordhover');


			// svg.selectAll("path").attr("stroke", "#999999");

			svg.selectAll("path.link.target-" + d.key)
				// .attr("stroke", "red")
			      .classed("target", true)
			      .each(updateNodes("source", true));

			svg.selectAll("path.link.source-" + d.key)
			      .classed("source", true)
			      .each(updateNodes("target", true));

			
		}

		function mouseout(d) {
			
		jQuery('#wrapper-viz').removeClass('chordhover');


		  svg.selectAll("path.link.source-" + d.key)
		      .classed("source", false)
		      .each(updateNodes("target", false));

		  svg.selectAll("path.link.target-" + d.key)
		      .classed("target", false)
		      .each(updateNodes("source", false));
		}
		


		

		function updateNodes(name, value) {
		  return function(d) {
		    if (value) this.parentNode.appendChild(this);
		    svg.select("#node-" + d[name].key).classed(name, value);
		  };
		}


		function cross(a, b) {
		  return a[0] * b[1] - a[1] * b[0];
		}

		function dot(a, b) {
		  return a[0] * b[0] + a[1] * b[1];
		}

	};


	




	return {
		'init' : init,
		'colorSelector' : colorSelector,
		'userBeerType' : userBeerType,
		'beerStyles': beerStyles,
		'renderBeerStyles' : renderBeerStyles
	};

})();


jQuery(document).ready(function(){
	BEERVIZ.init()

  // console.log("BeerViz getdata", BEERVIZ.getData() )
});

