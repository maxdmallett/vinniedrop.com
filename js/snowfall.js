var SnowFall = function () {

	var SNOW_CREATION_RATE = 100,
		FADE_OUT_TIME = 5000,
		MIN_SCREEN_WIDTH = 600,
		oWindow = $(window),
		oSnowHolder = null,
		bSnowTriggered = false;

	// Public methods
	function fnInit(oOptions) {

		// Gather vars
		oSnowHolder = oOptions.container;

		// Start animating
		letItSnow();
		
		// Clear snow on window resize
		oWindow.resize(function() {
		  oSnowHolder.empty();
		  letItSnow();
		});
	}


	// Private methods
	function letItSnow() {
		if (document.documentElement.clientWidth > MIN_SCREEN_WIDTH && !bSnowTriggered) {
			bSnowTriggered = true;
			setInterval(function () {
				createSnowDrop();
			}, SNOW_CREATION_RATE);
		}
	}

	function createSnowDrop() {

		// Gather properties
		var iSize = getRandomInt(10, 30),
			xPos = getRandomInt(0, oWindow.width() - iSize),
			fOpacity = getRandomInt(20,100) / 100,
			iTravelTime = getRandomInt(5000, 20000),
			iTransitionTime = iTravelTime/1000;

		// Create DOM object
		var oSnowDrop = $('<div></div>');
		oSnowDrop.addClass('snow-drop');

		// Apply styles
		oSnowDrop.css({
			width: iSize + "px",
			height: iSize + "px",  
			left: xPos + "px",
			borderRadius: Math.ceil(iSize/2) + "px",
			top: "-" + iSize + "px",
			opacity: fOpacity,
			transition: 'all ' + iTransitionTime + 's linear'
		});

		// Add to container
		oSnowHolder.append(oSnowDrop);

		// Start falling
		setTimeout(function () {
			oSnowDrop.addClass('falling');
		}, 500);	

		// Fade out
		setTimeout(function () {
			oSnowDrop.css({
				opacity: 0,
				transition: 'all ' + FADE_OUT_TIME/1000 + 's'
			});
		}, iTravelTime - FADE_OUT_TIME, oSnowDrop);

		// Remove when done
		setTimeout(function () {
			oSnowDrop.remove();
			oSnowDrop = null;
		}, iTravelTime, oSnowDrop);
		
	}

	function getRandomInt(iMin, iMax) {
		return Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
	}

	// Public methods
	return {
		init: fnInit
	}

}();
