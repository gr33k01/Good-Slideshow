# Good-Slideshow

 Cycle through a good slideshow with Good-Slideshow, a basic script for image slideshows with CSS3 transitions!

## Requirements

* [jQuery](http://jquery.com/)

## HTML structure

```html
<ul data-slideshow>
	<li><img src="img/1.jpg"></li>
	<li><img src="img/2.jpg"></li>
	<li><img src="img/3.jpg"></li>
</ul>
```

## Getting started

* `git clone` into project or download as .zip and copy files into project.
* Link script (after jQuery) and stylesheet in the head.

```html
<link href="path/to/goodSlideshow.css" type="text/css" rel="stylesheet" />
...
<script src="path/to/jQuery.js" type="text/javascript"></script>
...
<script src="path/to/goodSlideshow.js" type="text/javascript"></script>
```

* Call init method when the DOM is ready.

```javascript
goodSlideshow.init();
```
