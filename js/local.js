var Local = function(){
//  game object
	var game;

//  set interval 
	var INTERVAL = 200;
// set Timer
	var timer = null;

// bind key event
	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			if(e.keyCode === 38) { //up
				game.rotate();

			} else if (e.keyCode === 39){ //right
				game.right();

			} else if (e.keyCode === 40){ // down

				game.down();

			} else if (e.keyCode === 37){ //left

				game.left();

			} else if (e.keyCode === 32){// space 
				game.fall();

			}
		}
	}


// move 

	var move = function(){
		if(!game.down()){
			game.fixed();
			game.checkClear();
			var gameOver = game.checkGameOver();
			if(gameOver){
				stop();
			} else {
				game.performNext(generateType(), generateDir())
			}
			
		};
		
	}

// randomly generate square type

  var generateType = function () {
    return Math.ceil(Math.random() * 7) - 1; //0-6
  }

//  randomly generate a direction

 var generateDir = function () {
    return Math.ceil(Math.random() * 4) - 1; //0-4
  }
//  stop

var stop = function () {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    document.onkeydown = null;
  }

//  start
	var start = function(){
		var doms = {
			gameDiv: document.getElementById('game'),
			nextDiv: document.getElementById('next')
		}

		game = new Game();
		game.init(doms);
		bindKeyEvent();
		timer = setInterval(move, INTERVAL)

	}

	this.start = start
}