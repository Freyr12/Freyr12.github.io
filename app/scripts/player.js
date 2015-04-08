window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var JUMP = 0.3;
	var FALL = 0.4;
	var WIDTH = 5;
	var INITIAL_POSITION_X = 40;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.rotation = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.isJumping) {
			this.pos.y -= 1.3;
		} else {
			this.pos.y += FALL;
		}

		this.checkCollisionWithBounds();

		if (Controls.didJump() ) {
			this.rotation = 0;
		}
		// Update UI
		if (Controls.isJumping) {
			// No falling effect
			this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em) rotate(' + this.rotation + 'deg)');
			this.rotation -= 2.5;
		} else {
			// With falling effect
			if (this.rotation <= 60) {
				this.rotation += 1.7;
			}
			this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em) rotate(' + this.rotation + 'deg)');
		}

	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y + this.HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	Player.prototype.HEIGHT = 5;
	return Player;

})();
