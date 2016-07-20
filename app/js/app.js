$(function(){
    'use strict';


    $(function() {

        $('.mountains').each(function () {
            new Mountains($(this));
        });

        $(document).on('mailsent.wpcf7', function () {
            $( '.site__content').addClass( 'contact-send' );
        });

    });

    var Mountains = function(obj) {

        //private properties
        var _obj = obj,
            _window = $( 'body' ),
            _mountain = _obj.find( '.mountains__mountain' ),
            _potatoes = _obj.find( '.mountains__potatoes' );

        //private methods
        var _addEvents = function() {

            _obj.on( {
                'mousemove': function (e) {
                    var x = e.pageX,
                        y = e.pageY;

                    _paralax( _mountain, 0, y, 0.02);
                    _paralax( _potatoes, 0, y, 0.04);
                }
            });

            },
            _paralax = function( elem, x, y, koef ) {
                var translate = 'translate3d(' + Math.round(x*koef) + 'px, ' + Math.round(y*koef) + 'px, 0px )';

                elem.css( {
                    'transform': translate
                } );
            },
            _init = function(e) {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };
});