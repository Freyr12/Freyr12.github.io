window.Spaceship = (function() {
	'use strict';

	var Controls = window.Controls;

	var FALL = 0.4;
	var INITIAL_POSITION_X = 80;
	var INITIAL_POSITION_Y = 4;

	var Spaceship = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	Spaceship.prototype.onFrame = function(delta) {

		this.pos.x -= 0.027;
		this.pos.y += 0.001;
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em)');
	};

	/**
	 * Resets the state of the wing for a new game.
	 */
	Spaceship.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	return Spaceship;

})();