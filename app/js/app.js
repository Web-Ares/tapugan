$(function(){
    'use strict';


    $(function(){

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

    });

    var Menu = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj;

        //private methods
        var _addEvents = function () {

            },
            _init = function () {

                _addEvents();

            };

        _init();
    };

});