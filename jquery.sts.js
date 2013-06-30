/* 
	Image scroller
	By Tim Hosey
	Written for the Florida Garrison of the 501st Legion
	
	Written because no one had a good solution I liked, ffs.
	
	FOR LORD VADER!
*/

var container;
var containerBuffer;
var target;
var caption;
var timeBetween;
var fadeSpeed;
var currentSlide;
var v;

function imageScroller(param) {
	clearTimeout(v);
			
	container = param.container;
	containerBuffer = param.containerBuffer;
	target = param.target;
	caption = param.caption;
	timeBetween = param.timeBetween;
	fadeSpeed = param.fadeSpeed;
	divHeight = param.targetHeight;
	var maxHeight = 0;
	
	$(target).css("height", divHeight+"px").css("position", "relative").css("margin-left", "6px").css("display", "block");
	
	$(target+" div").each(function(index) {
		theCaption = $(this).find("img").attr("data-caption");
		maxHeight = Math.max(maxHeight, $(theCaption).height());
		$(this).find("img").css("display", "block");
		$(theCaption).hide();
		if (index==0) {
			$(theCaption).show();
		}
		$(this).attr("index", index+1);
		$(this).css("position", "absolute").css("display", "block");
		if ($(this).attr("index")>1) {
			$(this).css("display", "none");
		}
	});
	
	$(caption).css("display", "block").css("padding-top", "5px");
	$(container).css("position", "relative").css("display", "block").css("height", (divHeight+maxHeight+containerBuffer)+"px");
	
	currentSlide = 1;
	
	// kicks off initial timer
	activateScroll();
	
	// when moused over, it kills the timer.
	$(container).mouseenter(function() {
		clearTimeout(v);
	});
	
	// reactivate timer when mouse leaves
	$(container).mouseleave(function() {
		activateScroll();
	});
}

// activateScroll causes our scroller to set the timeout (v), and scroll to the next slide every timeBetween seconds
function activateScroll() {
	
	v = setTimeout(function() {
		scrollSlide();
	}, timeBetween);
}

function scrollSlide() {
	nextSlide = currentSlide + 1;
	
	if (nextSlide > $(target+" div").length) {
		nextSlide = 1;
	}
	
	// sets the divs of the current and next captions to a var
	var thisCaptionDiv = $(target+" div[index="+currentSlide+"] img").attr("data-caption");
	var nextCaptionDiv = $(target+" div[index="+nextSlide+"] img").attr("data-caption");
	// speed of fade is half the speed of a regular fade
	var capSpeed = fadeSpeed/2;
	
	var nextHeight = $(target+" div[index="+nextSlide+"]").height();
	var nextPos = ($(target).height()-nextHeight);
	
	// sets the z-index to be above so the newly appearing image doesn't obscure the old one.
	$(target+" div[index="+currentSlide+"]").css("z-index", "5");
	// set z-index low to hide behind existing image. set display to block.
	$(target+" div[index="+nextSlide+"]").css("z-index", "1");
	$(target+" div[index="+nextSlide+"]").find("img").css("padding-top", (nextPos/2)+"px");
	
	// fade out current slide
	$(target+" div[index="+currentSlide+"]").fadeOut(fadeSpeed);
	
	// fade out the caption
	$(thisCaptionDiv).fadeOut(capSpeed, function() {
		$(nextCaptionDiv).fadeIn(capSpeed);
	});
	
	// concurrently fade in next slide (crossfade)
	$(target+" div[index="+nextSlide+"]").fadeIn(fadeSpeed);
	// set the current slide correctly
	currentSlide = nextSlide;
	
	activateScroll();
}