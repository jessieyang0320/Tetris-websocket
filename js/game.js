var Game = function(){
	// dom elements
	var gameDiv;
	var nextDiv;

	// game matrix

	var gameData = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
    ];

    // current square

    var cur;


    // next square 
    var next;

// divs 
	var nextDivs = [];
	var gameDivs = [];

//  build divs
var initDiv = function(container, data, divs){
	for(var i=0; i< data.length;i++){
		var div = [];
		for(var j=0;j<data[0].length;j++){
			var newNode = document.createElement('div');
			newNode.className= 'none';
			newNode.style.top = (i*20) + 'px';
			newNode.style.left = (j*20) + 'px';
			container.appendChild(newNode)
			div.push(newNode);
		}
		 divs.push(div);
	}
}

// refresh divs  
var refreshDiv = function(data,divs){
	for(var i=0; i<data.length;i++){
		for (var j=0;j<data[0].length;j++){
			if(data[i][j] === 0) {
				divs[i][j].className = 'none';
			} else if(data[i][j] === 1) {
				divs[i][j].className = 'done';
			} else if(data[i][j] === 2) {
				divs[i][j].className = 'current';
			} 
		}
	}
}
// check available spot 

var check = function(pos, x, y){

	if(pos.x + x < 0 ){
		return false;  
	} else if (pos.x + x >= gameData.length){
		return false 
	} else if (pos.y + y < 0 ) {
		return false; 
	} else if (pos.y + y >= gameData[0].length){
		return false; 
	} else if (gameData[pos.x + x][pos.y + y] === 1){
		return false; 

	} else {
		return true;
	}

} 

// check data (if the square touched border)

var isValid = function(pos, data) {
	for(var i=0; i< cur.data[0].length; i++){
		for(var j=0; j<cur.data[0].length; j++){
			if(data[i][j] != 0){
				if(!check(pos, i, j)){
					return false; 
				}
			}
		}
	}
	return true;
}

// clear data 

var clearData = function(){
	for(var i=0; i< cur.data[0].length; i++){
		for(var j=0; j<cur.data[0].length; j++){

			if( check(cur.origin, i, j)){

				gameData[cur.origin.x + i][cur.origin.y + j] = 0;
			}
			
		}
	}

}

// set data 

var setData = function(){

	for(var i=0; i< cur.data[0].length; i++){
		for(var j=0; j<cur.data[0].length; j++){

			if( check(cur.origin, i, j)){ 
			gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
		}
		}
	}

}
// rotate function 

var rotate = function () {
    if (cur.canRotate(isValid)) {
      clearData();
      cur.rotate();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }


//  down function 

var down = function(){
	if(cur.canDown(isValid)){
		clearData();
		cur.down();
		setData();
		refreshDiv(gameData,gameDivs);
		return true;

	} else {
		return false;
	}
}


//  left function

var left = function(){
	if(cur.canLeft(isValid)){
		clearData();
		cur.left();
		setData();
		refreshDiv(gameData,gameDivs);
	}	
}

//  right funciton 

var right = function(){
	if(cur.canRight(isValid)){
		clearData();
		cur.right();
		setData();
		refreshDiv(gameData,gameDivs);
	}	
}

// square fixed at the bottom when touched bottom

var fixed = function(){

	for(var i=0; i<cur.data.length; i++){
		for(var j=0; j<cur.data[0].length; j++){
			if(check(cur.origin, i , j)){
				if(gameData[cur.origin.x + i][cur.origin.y + j] ==2) {
					gameData[cur.origin.x + i][cur.origin.y + j] = 1;
				}
			}
		}
	}
	refreshDiv(gameData,gameDivs);
}

// clear line function

 var checkClear = function () {
    var line = 0;
    for (var i=gameData.length-1; i>=0; i--) { // 反过来遍历
      var clear = true;
      for (var j=0; j<gameData[0].length; j++) { // 判断一行是否可以清除
        if (gameData[i][j] != 1) {
          clear = false;
          break;
        }
      }
      if (clear) {
        line++;
        for (var m=i; m>0; m--) {
          for (var n=0; n<gameData[0].length; n++) {
            gameData[m][n] = gameData[m-1][n];
          }
        }
        for (var n=0; n<gameData[0].length; n++) {
          gameData[0][n] = 0;
        }
        i++;
      }
    }
    return line;
  }

// check if game is over 

var checkGameOver = function () {
    var gameOver = false;
    for (var i=0; i<gameData[0].length; i++) {
      if (gameData[1][i] == 1) {
        gameOver = true;
      }
    }
    return gameOver;
  }
// use next square function

	var performNext = function(type, dir){
		cur = next; 
		setData();
		next = SquareFactory.prototype.make(type, dir);
		refreshDiv(gameData, gameDivs);
		refreshDiv(next.data, nextDivs);
	}
// init

var init = function(doms){

	gameDiv = doms.gameDiv;
	nextDiv = doms.nextDiv;

	cur = SquareFactory.prototype.make(2, 2);
	next = SquareFactory.prototype.make(3, 3); 
	initDiv(gameDiv, gameData, gameDivs);
	initDiv(nextDiv, next.data, nextDivs);


	
	setData();


	refreshDiv(gameData,gameDivs);
	refreshDiv(next.data, nextDivs);

}

// API 

  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fall = function(){
  	while(down());
  };
  this.fixed = fixed;
  this.performNext = performNext;
  this.checkClear = checkClear;
  this.checkGameOver = checkGameOver;

}