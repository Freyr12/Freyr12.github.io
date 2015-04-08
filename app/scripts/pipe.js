window.Pipe = (function() {
	'use strict';

	var GAPHEIGHT = 15;

	var Pipe = function(topHeight, id, game) {
		this.topHeight = topHeight;
		this.id = id;
		this.game = game;
		this.top = { x: 102.4, y: topHeight };
		var bottomHeight = GAPHEIGHT;
		this.bottom = { x:102.4, y: bottomHeight };


		// Create a top an bottom pipe
		var top = "<div style='height: " + this.top.y + "em' class='Toppipe'></div>";
		var bot = "<div style='margin-top: " + this.bottom.y + "em; height: " + 40 + "em' class='Bottompipe'></div>";

		// Append the pipes to the list of pipes
		$('#'+ this.id).append(top);
		$('#'+ this.id).append(bot);
    };

    Pipe.prototype.onFrame = function(delta) {

		if (this.top.x < -20) {
			this.deletePipe(this.id); // delete the pipe if it has passed by
		} else if (this.top.x >= 35 && this.top.x <= 45) {
			this.checkCollision();
		} else if ( this.top.x <= 42) {
			Pipe.prototype.score =$ ('.score').text(this.id); // update the score
		}

		this.top.x -= 0.4;

		//Update UI
		$('#'+ this.id).css('transform', 'translate3d(' + this.top.x + 'em, 0em, 0em)');
	};

	Pipe.prototype.checkCollision = function() {
		var playerpos = this.game.player.pos;

		// check top pipe
		if (playerpos.y <= this.top.y) {
			this.game.gameover();
		} else if (playerpos.y >= (GAPHEIGHT - this.game.player.HEIGHT + this.top.y)) {
			this.game.gameover();
		}
	};

	Pipe.prototype.deletePipe = function (id) {
		$('#' + id).remove();
	};

	Pipe.prototype.method_name = function(first_argument) {
		// body...
	};

	return Pipe;

})();