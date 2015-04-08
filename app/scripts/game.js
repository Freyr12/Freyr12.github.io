window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.wing = new window.Wing(this.el.find('.Wing'), this);
		this.ground = new window.Ground(this.el.find('.Ground'), this);
		this.pipes = new window.Pipes(this.el.find('.Pipes'), this);
		this.spaceship = new window.Spaceship(this.el.find('.Spaceship'), this);
		this.highscore = 0;
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.wing.onFrame(delta);
		this.ground.onFrame(delta);
		this.pipes.onFrame(delta);
		this.spaceship.onFrame(delta);
		// this.toppipe.onFrame(delta);
		// this.bottompipe.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		var that = this;
		that.pipes.generatePipes();
		this.intervalID = setInterval(function () {
			return that.pipes.generatePipes();
		},1700);

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.wing.reset();
		this.pipes.reset();
		this.spaceship.reset();
		$('.score').text(0);
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {


		this.highscore = $('.highscore').text();
		var score = $('.score').first().text();

		if (score > this.highscore) {
			$('.highscore').text(score);
		}

		// Play scream
		var scream = document.getElementById("WilhelmScream");
		scream.volume = 0.3;
		scream.play();

		this.isPlaying = false;
		clearInterval(this.intervalID);

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 50;

	return Game;
})();


