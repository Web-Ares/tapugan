window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout( callback, 1000 / 60 );
        };
})();
$(function(){
    'use strict';

    var gameField = [
        // [8,2,2,4],
        // [4,0,0,0],
        // [2,0,0,0],
        // [2,0,0,0]
        [2,0,0,0],
        [2,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    $(function() {

        $('.game').each(function () {
            new Game($(this));
        });

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

    var Game = function(obj) {

        //private properties
        var _obj = obj,
            _window = $( window ),
            _items = _obj.find( '.game__item span' ),
            _animationPicStartTime = -1,
            _animationDuration = 3000,
            _highScore = 2,
            _score = 2,
            _oldHighScore = 2,
            _highScoreField = _obj.find( '.game__highscore dd' ),
            _scoreField = _obj.find( '.game__score dd' ),
            _btnClearHighScore = _obj.find( '.game__clear-highscore' );

        //private methods
        var _addEvents = function() {

            _window.on( {
                'keyup': function( e ) {
                    var keyCode = e.keyCode;

                    switch (keyCode) {
                        case 37:
                            _left();

                            break;
                        case 38:
                            _top();

                            break;
                        case 39:
                            _right();

                            break;
                        case 40:
                            _bottom();

                            break;
                    }

                    _editScore();
                }
            });

            _btnClearHighScore.on( {
                'click': function () {
                    window.localStorage.clear();
                    location.reload();
                    return false;
                }
            } );

            },
            _addedElem = function() {

                if ( _canElem() ) {
                    var col = _getRandomInt( 0, 3 ),
                        row = _getRandomInt( 0, 3 );

                    if ( gameField[ row ][ col ] < 1 ) {
                        gameField[ row ][ col ] = 2;
                    } else {
                        _addedElem();
                    }
                }
            },
            _canElem = function() {
                for ( var col = 0; col < 4; col++ ) {

                    for ( var row = 0; row < 4; row++ ) {

                        if ( gameField[ row ][ col ] == 0 ) {
                            return true;
                        }
                    }
                }

                _gameOver();

            },
            _gameOver = function() {

                if ( _score > _oldHighScore ) {
                    alert( 'GAME OVER.\nCONGRATELATION YOU NEW RECORD IS: ' + _score );
                } else {
                    alert( 'GAME OVER' );
                }

                gameField = [
                    [2,0,0,0],
                    [2,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ];

                _score = 2;

                _createField();
                _inspectionScore();
                _editScore();
            },
            _inspectionScore = function() {
                if ( localStorage.getItem( 'highScore' ) ) {
                    _highScore = localStorage.getItem( 'highScore' );
                } else {
                    _highScore = 2;
                }
                _oldHighScore = _highScore
            },
            _editScore = function() {

                for ( var col = 0; col < 4; col++ ) {

                    for ( var row = 0; row < 4; row++ ) {

                        if ( gameField[ row ][ col ] > _score ) {
                            _score = gameField[ row ][ col ];
                        }
                    }
                }

                if ( _score > _highScore ) {
                    _highScore = _score;
                }
                localStorage.setItem( 'highScore', _highScore );

                _scoreField.text( _score );
                _highScoreField.text( _highScore );

            },
            _top = function() {
                var tmp = [],
                    k = 0;

                for ( var col = 0; col < 4; col++ ) {

                    for ( var row = 0; row < 4; row++ ) {

                        if ( gameField[ row ][ col ] > 0 ) {
                            tmp[ k ] = gameField[ row ][ col ];
                            k++;
                        }
                    }

                    tmp = _summ( tmp, false );

                    for ( var i = 0; i < 4; i++ ) {

                        if ( tmp[ i ] ) {
                            gameField[ i ][ col ] = tmp[ i ];
                        } else {
                            gameField[ i ][ col ] = 0;
                        }
                    }

                    _clear( tmp );
                }

                _addedElem();

                _createField();
            },
            _bottom = function() {
                var tmp = [],
                    k = 0;

                for ( var col = 0; col < 4; col++ ) {

                    for ( var row = 0; row < 4; row++ ) {

                        if ( gameField[ row ][ col ] > 0 ) {
                            tmp[ k ] = gameField[ row ][ col ];
                            k++;
                        }
                    }

                    tmp = _summ( tmp, true );

                    for ( var i = 0; i < 4; i++ ) {

                        if ( tmp[ i ] ) {
                            gameField[ i ][ col ] = tmp[ i ];
                        } else {
                            gameField[ i ][ col ] = 0;
                        }
                    }

                    _clear( tmp );
                }

                _addedElem();

                _createField();
            },
            _left = function() {
                var tmp = [],
                    k = 0;

                for ( var row = 0; row < 4; row++ ) {

                    for ( var col = 0; col < 4; col++ ) {

                        if ( gameField[ row ][ col ] > 0 ) {
                            tmp[ k ] = gameField[ row ][ col ];
                            k++;
                        }
                    }

                    tmp = _summ( tmp, false );

                    for ( var i = 0; i < 4; i++ ) {

                        if ( tmp[ i ] ) {
                            gameField[ row ][ i ] = tmp[ i ];
                        } else {
                            gameField[ row ][ i ] = 0;
                        }
                    }

                    _clear( tmp );
                }

                _addedElem();

                _createField();
            },
            _right = function() {
                var tmp = [],
                    k = 0;

                for ( var row = 0; row < 4; row++ ) {

                    for ( var col = 0; col < 4; col++ ) {

                        if ( gameField[ row ][ col ] > 0 ) {
                            tmp[ k ] = gameField[ row ][ col ];
                            k++;
                        }
                    }

                    tmp = _summ( tmp, true );

                    for ( var i = 0; i < 4; i++ ) {

                        if ( tmp[ i ] ) {
                            gameField[ row ][ i ] = tmp[ i ];
                        } else {
                            gameField[ row ][ i ] = 0;
                        }
                    }

                    _clear( tmp );
                }

                _addedElem();

                _createField();
            },
            _summ = function( arr, revert ) {
                var resArr = [];

                if ( arr.length > 1 ) {

                    if ( revert ) {

                        for ( var i = ( arr.length - 1 ); i >= 0 ; i-- ) {

                            if ( arr[ i ] == arr[ i + 1 ] ) {
                                arr[ i + 1 ] = arr[ i ] + arr[ i + 1 ];
                                arr[ i ] = 0;
                            }
                        }


                    } else {

                        for ( var i = 1; i < arr.length; i++ ) {

                            if ( arr[ i ] == arr[ i - 1 ] ) {
                                arr[ i - 1 ] = arr[ i ] + arr[ i - 1 ];
                                arr[ i ] = 0;
                            }
                        }

                    }

                    for ( var i = 0; i < arr.length; i++ ) {

                        if ( arr[ i ] > 0 ) {
                            resArr[ resArr.length ] = arr[ i ];
                        }
                    }
                } else {
                    resArr = arr;
                }

                if ( revert ) {
                    while ( resArr.length < 4 ) {
                        resArr.unshift( 0 );
                    }
                } else {
                    while ( resArr.length < 4 ) {
                        resArr.push( 0 );
                    }
                }

                return resArr;
            },
            _clear = function( arr ) {

                for ( var i = 0; i < arr.length; i++ ) {
                    arr[ i ] = 0;
                }
            },
            _createField = function() {

                var rows = 0,
                    col = 0;

                _items.each( function () {
                    var curElem = $( this );

                    if ( gameField[ rows ][ col ] > 0 ) {
                        curElem.text( gameField[ rows ][ col ] );
                    } else {
                        curElem.text('');
                    }

                    if ( col < 3 ) {
                        col++;
                    } else {
                        col = 0;
                        rows++;
                    }
                } );
            },
            _getRandomInt = function( min, max ) {
                return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
            },
            _step = function( time ) {

                var progress;

                if ( _animationPicStartTime < 0 ) {
                    _animationPicStartTime = time;
                }

                progress = ( time - _animationPicStartTime ) / _animationDuration;

                if ( progress > 1 ) {
                    progress = 1;
                } else {
                    requestAnimationFrame( _step );
                }

                console.log(progress)

            },
            _init = function() {
                _createField();
                _addEvents();
                _inspectionScore();
                _editScore();
                // _step(0);
            };

        //public properties

        //public methods

        _init();
    };
});