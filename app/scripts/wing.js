window.Wing = (function() {
	'use strict';

	var Controls = window.Controls;

	var FALL = 0.4;
	var INITIAL_POSITION_X = 38;
	var INITIAL_POSITION_Y = 26;

	var Wing = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	Wing.prototype.onFrame = function(delta) {

		if (Controls.isJumping) {
			this.pos.y -= 1.3;
			this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em) rotate(70deg)');
		} else {
			this.pos.y += FALL;
			this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em)');
		}
	};

	/**
	 * Resets the state of the wing for a new game.
	 */
	Wing.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	return Wing;

})();