#Sen Tango Slider

##Information
The Sen Tango Slider (Sen Tango meaning "1000 words" in Japanese) is an image rotator intended to do just that: rotate images.

It supports divs with captions, as well as URL linking on images.

As webmaster of the Florida Garrison of the 501st Legion (http://www.fl501st.com), I came across difficulty finding an open-source image rotator that was customizable and simply could fade between a collection of images easily. So, I decided to make my own. The first version only does fading, but in the future the goal is to add multiple transition styles (cross-fade; slide left, right, up and down; and possibly some other effects such as dissolve and the like), increase the modularity, and the like.

##Prerequisites
To get this to work, you will need to have jQuery 1.3 or higher. It may work on older versions of jQuery, but use at your own risk, as the only version I've tested thus far are 1.3.2, but as I develop new features I will be trying to bring it up to par with the later version of jQuery (the version out at the time I write this, 6/30/2013, is 1.10).

##Usage
```$(document).ready(function() {
	var scroller = new imageScroller({
		container: "#slides-wrapper",
		containerBuffer: 20,
		target: "#slides",
		caption: "#caption",
		timeBetween: 5000,
		fadeSpeed: 1000,
		targetHeight: 400	// height of the parent div
	});
});
```

## Credits
This is created solely by Tim Hosey, aka Zomgrei, initially for the Florida Garrison of the 501st Legion. If you find this useful, please feel free to let me know one my blog (http://www.zomgrei.com) or via email (tsh4life@gmail.com).