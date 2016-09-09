$(function(){
    'use strict';

    $(function() {

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.mountains').each(function () {
            new Mountains($(this));
        });

        $('.product__info').each(function () {
            new ProductInfo($(this));
        });

        $(document).on('mailsent.wpcf7', function () {
            $( '.site__content').addClass( 'contact-send' );
        });

    });

    var Menu = function( obj ) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu__btn' );

        //private methods
        var _addEvents = function() {
                _btn.on( {
                    click: function() {

                        _obj.toggleClass( 'menu_open' );

                    }
                } );
            },
            _init = function() {
                _addEvents();
            };

        _init();
    };

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

    var ProductInfo = function(obj) {

        //private properties
        var _obj = obj,
            _table = _obj.find('table');

        //private methods
        var _addEvents = function() {


            },

            _init = function() {
                if ( _table ) {
                    var rows = _table.find('tr'),
                        columns = rows.find('td');

                    columns.css( { width: 100/Math.round(columns.length/rows.length) + '%' } );
                }
            };

        //public properties

        //public methods

        _init();
    };
});