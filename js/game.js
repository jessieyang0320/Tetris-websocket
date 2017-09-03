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
  }


}