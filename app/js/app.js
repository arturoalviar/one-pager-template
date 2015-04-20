'use strict';

var app = (function(document, $) {
    var docElem = document.documentElement,
        _userAgentInit = function() {
            docElem.setAttribute('data-useragent', navigator.userAgent);
        },
        _init = function() {
            $(document).foundation();
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            $(document).on('click', '#start-jr', function() {
                $(document).foundation('joyride', 'start');
            });
            _userAgentInit();
        };
    return {
        init: _init
    };

})(document, jQuery);

(function() {
    app.init();
})();



function initialize() {

    var MY_MAPTYPE_ID = 'custom_style';

    var myLatlng = new google.maps.LatLng(44.012269, -73.170070);


    var featureOpts = [{
        stylers: [{
            hue: '#388E3C'
        }, {
            visibility: 'simplified'
        }, {
            gamma: 0.5
        }, {
            weight: 0.3
        }, {
            lightness: 40
        }]
    }, {
        featureType: 'road.arterial',
        elementType: 'all',
        stylers: [{
            hue: '#2200ff'
        }, {
            lightness: -40
        }, {
            visibility: 'simplified'
        }, {
            saturation: 30
        }]
    }, {
        featureType: 'water',
        stylers: [{
            color: '#2196F3'
        }]
    }];




    var mapOptions = {
        scrollwheel: false,
        zoom: 14,
        center: myLatlng,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'MTO'
    });

    var styledMapOptions = {
        name: 'Custom Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
        'callback=initialize';
    document.body.appendChild(script);
}

window.onload = loadScript;
