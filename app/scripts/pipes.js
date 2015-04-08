window.Pipes = (function() {
    'use strict';

    var Pipes = function (el, game) {
        this.el = el;
        this.game = game;
        this.pipes = [];
        this.pipeID = 0;
    };

    Pipes.prototype.onFrame = function(delta) {
        for (var i = 0; i < this.pipes.length; i++) {
            this.pipes[i].onFrame(delta);
        }
    };

    Pipes.prototype.generatePipes = function() {

        this.pipeID++;

        // Create div which contains the top and bottom pipe
        var newpipe = "<div class='Pipe' id='" + this.pipeID + "'></div>";
        $('.Pipes').append(newpipe);

        //random pipe height
        var pipeHeight = Math.random() * (28 - 7) + 7;


        // Create the pipes and add them to the list
        this.pipes.push(new window.Pipe(pipeHeight, this.pipeID, this.game));
    };

    Pipes.prototype.reset = function () {
        // TODO : implement
        $('.Pipe').remove();
        this.pipes = [];
        this.pipeID = 0;
    };

    return Pipes;

})();