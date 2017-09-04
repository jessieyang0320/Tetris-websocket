var Remote = function(){
	// game object
	var game;

	// bind events 

	var bindEvents = function(){
		document.getElementById('left').onclick = function(){
			game.left()
		}
	}

	// start

	var start = function(type, dir){

		var doms = {
			gameDiv: document.getElementById('remote_game'),
			nextDiv: document.getElementById('remote_next'),
			timeDiv: document.getElementById('remote_time'),
			scoreDiv:document.getElementById('remote_score'),
			resultDiv:document.getElementById('remote_gameover')
		}

		game = new Game();
		game.init(doms, type, dir);
		

	}

// API
	this.start = start;
	this.bindEvents = bindEvents;
}