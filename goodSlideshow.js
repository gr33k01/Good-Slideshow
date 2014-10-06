/* goodSlideshow.js v1 by @gr33k01 */

var goodSlideshow = {

    config: {
        selector: '[data-slideshow]',
        nextBtnText: 'next',
        prevBtnText: 'prev',
        animate: true,
        timingFunction: 'ease',
        animationDuration: 300, // In milliseconds
        disableDuration: 0,
        cssVendorPrefix: ''
    },

    animationActive: false,

    init: function(config) {
        var prevBtn = '<li data-prev>' + goodSlideshow.config.prevBtnText + '</li>',
            nextBtn = '<li data-next>' + goodSlideshow.config.nextBtnText + '</li>',
            navigation = '<ul class="ss-navigation">' + '\n' + prevBtn + '\n' + nextBtn + '\n' + '</ul>';

        // Allow overriding the default settings
        $.extend(goodSlideshow.config, config);
        $(navigation).insertAfter(goodSlideshow.config.selector);
        $('[data-next], [data-prev]').on('click', goodSlideshow.cycle);

        if (goodSlideshow.config.animate) goodSlideshow.setCssTransitions(); 
    },

    cycle: function(e) {

        var target = e.currentTarget.parentNode.previousElementSibling;

        if (goodSlideshow.animationActive) return;

        if(e.currentTarget.textContent == goodSlideshow.config.prevBtnText){
            goodSlideshow.previous(target);
            return;
        }

        goodSlideshow.next(target);
    },

    setCssTransitions: function(){
        var transition = 'visibility 0ms' + ' ' 
                        + goodSlideshow.config.timingFunction + ' ' 
                        + goodSlideshow.config.animationDuration + 'ms, opacity ' 
                        + goodSlideshow.config.animationDuration + 'ms ' 
                        + goodSlideshow.config.timingFunction + ';';

        var style = '<style>\n' + 'ul' 
                        + goodSlideshow.config.selector + ' li {\n\t' 
                        + goodSlideshow.config.cssVendorPrefix + 'transition: ' 
                        + transition + '\n}\n</style>';

        goodSlideshow.config.cssVendorPrefix = (function() {

            var computedStyles = window.getComputedStyle(document.documentElement, ''),
                prefix = (Array.prototype.slice
                                .call(computedStyles)
                                .join('')
                                .match(/-(moz|webkit|ms)-/))[1];
                
            return '-' + prefix + '-';
        }());

        $('head').append(style);

        // Diable for 10ms longer than the animation duration
        goodSlideshow.config.disableDuration = goodSlideshow.config.animationDuration + 10;
    },

    previous: function(activeTarget) {

        var index = activeTarget.children.length - 1;
        var target = $(activeTarget.children[index]).detach();

        $(activeTarget).prepend(target);
        goodSlideshow.animationActive = true;
        window.setTimeout(function() {
            goodSlideshow.animationActive = false;
        }, goodSlideshow.config.disableDuration);
    },

    next: function(activeSlideshow) {
        var targetImg = $(activeSlideshow.children[1]).detach();

        $(activeSlideshow).prepend(targetImg);
        goodSlideshow.animationActive = true;

        window.setTimeout(function() {
            var imgToAppend = $(activeSlideshow.children[1]).detach();
            $(activeSlideshow).append(imgToAppend);
            goodSlideshow.animationActive = false;
        }, goodSlideshow.config.disableDuration);
    }
}