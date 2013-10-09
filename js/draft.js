BEERVIZ = (function(){

	var init = function(){
		console.log('basic page initializations');

		getBeerHt();


		// evtHandler();

		// d3Example();
	};

	function getBeerHt(){
		
		param = jQuery.urlParam('beer');
		// console.log(param);
		ht = 0 - (param/256) * 792;
		

		jQuery('#beeroverlay')
					.stop()
					.animate({top: ht+'px'},800);
	
	}


	jQuery.urlParam = function(name){
		var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
		return results[1] || 0;
	};


	return {
		'init' : init
	};

})();


jQuery(document).ready(function(){
	BEERVIZ.init();
});
