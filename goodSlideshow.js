/* goodSlideshow.js v1 by @gr33k01 */

var goodSlideshow = {

    config: {
        selector: '[data-slideshow]',
        // Disable duration should match the transition duration 
        // applied to ul[data-slideshow] li (in milliseconds).
        disableDuration: 300 
    },

    animationActive: false,

    init: function(config) {
        var prevBtn = '<li data-prev></li>',
            nextBtn = '<li data-next></li>',
            navigation = '<ul class="ss-navigation">' + prevBtn + nextBtn + '</ul>';

        // Allow overriding the default settings
        $.extend(goodSlideshow.config, config);
        $(goodSlideshow.config.selector).append(navigation);
        $('[data-next], [data-prev]').on('click', goodSlideshow.cycle);
    },

    cycle: function(e) {
        var target = e.currentTarget.parentNode.parentNode;
        if (goodSlideshow.animationActive) return;
        if (e.currentTarget.dataset.next == "") {
            goodSlideshow.next(target);
            return;
        }
        goodSlideshow.previous(target);
    },

    previous: function(activeTarget) {
        var index = $(activeTarget).children('li').length;
        var target = $(activeTarget).children('li:nth-child(' + index + ')').detach();

        $(activeTarget).prepend(target);
        goodSlideshow.animationActive = true;
        window.setTimeout(function() {
            goodSlideshow.animationActive = false;
        }, goodSlideshow.config.disableDuration);
    },

    next: function(activeSlideshow) {
        var targetImg = $(activeSlideshow).children('li:nth-child(2)').detach();
        $(activeSlideshow).prepend(targetImg);
        goodSlideshow.animationActive = true;
        window.setTimeout(function() {
            var imgToAppend = $(activeSlideshow).children('li:nth-child(2)').detach();
            $(imgToAppend).insertBefore($(activeSlideshow).find('.ss-navigation'));
            goodSlideshow.animationActive = false;
        }, goodSlideshow.config.disableDuration);
    }
};