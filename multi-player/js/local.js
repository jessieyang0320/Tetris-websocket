var Local = function(socket){
//  game object
	var game;

//  set interval 
	var INTERVAL = 2000;
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
				socket.emit('rotate');

			} else if (e.keyCode === 39){ //right
				game.right();
				socket.emit('right');

			} else if (e.keyCode === 40){ // down

				game.down();
				socket.emit('down');

			} else if (e.keyCode === 37){ //left

				game.left();
				socket.emit('left');

			} else if (e.keyCode === 32){// space 
				game.fall();
				socket.emit('fall');

			}
		}
	}


// move 

	var move = function(){
		timeFunc();
		if(!game.down()){
			game.fixed();
			socket.emit('fixed');
			var line = game.checkClear();
			if(line){
				game.addScore(line)
				socket.emit('line',line);
				if(line>1){
					var bottomLines = generateBottomLine(line);
					socket.emit('bottomLines',bottomLines);
				}
			}
			var gameOver = game.checkGameOver();
			if(gameOver){
				game.onGameover(false);
				document.getElementById('remote_gameover').innerHTML = 'You Win!!'
				socket.emit('lose')
				stop();
			} else {
				var t = generateType();				
				var d = generateDir();
				game.performNext(t,d);
				socket.emit('next',{type:t, dir: d})
			}
			
		} else {
			socket.emit('down')
		}
		
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
			socket.emit('time',time)
			
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
			gameDiv: document.getElementById('local_game'),
			nextDiv: document.getElementById('local_next'),
			timeDiv: document.getElementById('local_time'),
			scoreDiv:document.getElementById('local_score'),
			resultDiv:document.getElementById('local_gameover')
		}

		game = new Game();
		var type = generateType();
		var dir = generateDir();
		game.init(doms, type, dir);
		socket.emit('init',{type:type, dir:dir})

		bindKeyEvent();

		var t = generateType();				
		var d = generateDir();
		game.performNext(t,d);
		socket.emit('next',{type:t, dir: d})

		timer = setInterval(move, INTERVAL)

	}

	socket.on('start',function(){
		document.getElementById('waiting').innerHTML = '';
		start();

	});
	socket.on('lose', function(){
		game.onGameover(true);
		stop();
	});

	socket.on('leave', function(){
		document.getElementById('local_gameover').innerHTML = 'the other player is offline';
		document.getElementById('remote_gameover').innerHTML = 'you are offline now';
		stop();
	});
	socket.on('bottomLines', function(data){
		game.addTailLines(data);
		socket.emit('addTailLines',data)
	})		

}