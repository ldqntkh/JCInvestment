'use strict';

function init() {
    $(window).on('load', function(){
        $('.dv-header-context').css({
            'right':0,
            'left':0
        });
    });
}

var homePage = {
    init
}

module.exports = homePage;