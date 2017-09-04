var Local = function(){
//  game object
	var game;

//  set interval 
	var INTERVAL = 200;
// set Timer
	var timer = null;

// time calculator
	var timeCount = 0;

// time used
	var time = 0;



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
		timeFunc();
		if(!game.down()){
			game.fixed();
			var line = game.checkClear();
			if(line){
				game.addScore(line)
			}
			var gameOver = game.checkGameOver();
			if(gameOver){
				game.onGameover(false);
				stop();
			} else {
				game.performNext(generateType(), generateDir())
			}
			
		};
		
	}

//  randomly generate lines 
 	var generateBottomLine = function(lineNum){
 		var lines =[];
 		for(var i =0; i< lineNum; i++){
 			var line = [];
 			for(var j=0; j< 10; j++){
 				line.push(Math.ceil(Math.random()*2)-1);
 			}
 			lines.push(line)
 		}

 		return lines;
 	}

// timeFunc

	var timeFunc = function(){
		timeCount = timeCount + 1;
		if(timeCount ==5){
			timeCount = 0;
			time = time + 1
			game.setTime(time);
			if(time % 10 == 0){
				game.addTailLines(generateBottomLine(1));
			}
		}
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
			nextDiv: document.getElementById('next'),
			timeDiv: document.getElementById('time'),
			scoreDiv:document.getElementById('score'),
			resultDiv:document.getElementById('gameover')
		}

		game = new Game();
		game.init(doms, generateType(),generateDir());
		bindKeyEvent();
		game.performNext(generateType(),generateDir())
		timer = setInterval(move, INTERVAL)

	}

	this.start = start
}