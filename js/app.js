// Enemies our player must avoid
var Enemy = function() {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  // this.x = -101;
  // this.y = -25;
 
  var speed;    
}
Enemy.prototype.init = function(){
  //random number between 1 and 100
  this.speed = Math.floor((Math.random() * 100) + 1);
  console.log('enemy speed is ' + this.speed);   

  this.x = -101;

  //don't spawn an enemy in the bottom row
  //random number between 0 and 5
  var newX = Math.floor(Math.random() * 5);
  this.y = newX * YSIZE - 25;
  console.log('enemy y is ' + this.y);   
  console.log('enemy x is ' + this.x);
  console.log(YSIZE + " : " + XSIZE);
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //move across
    this.x += (this.speed * dt);

    //check bounds
    //enemies only move right
    if(this.x >= XMAX){
      //respawn
      this.x = -101;
      this.init();
    }    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
  this.move = "";

}
Player.prototype.init = function(){
    //start in the middle of a tile
  this.x = 2 * XSIZE
  this.y = -25 + (5 * YSIZE);    

  console.log('player y is ' + this.y);   
  console.log('player x is ' + this.x);
  console.log(YSIZE + " : " + XSIZE);
}
Player.prototype.update = function(){
  //only move if we got a key press
  if(this.move !== ""){
    if(this.move === "left"){
        this.x += -XSIZE;
        this.move = "";
    }if(this.move == "right"){
        this.x += XSIZE;
        this.move = "";
    }if(this.move == "up"){
        this.y += -YSIZE;
        this.move = "";
    }if(this.move == "down"){
        this.y += YSIZE;
        this.move = "";
    }

    //stop moving off the board
    if(this.x < XMIN){
      this.x = XMIN;
      console.log("bounding x to " + this.x);
    }
    if(this.x >= XMAX){
      this.x = XMAX - XSIZE;
      console.log("bounding x to " + this.x);
    }
    if(this.y < YMIN){
      this.y = YMIN;
      console.log("bounding y to " + this.y);
    }
    if(this.y >= YMAX){
      this.y = YMAX - YSIZE;
      console.log("bounding y to " + this.y);
    }
  }

    //check for collision
    /*
    allEnemies.forEach(function(enemy) {
        var xOverlap = Math.abs(enemy.x - player.x);
        var yOverlap = Math.abs(enemy.y - player.y);

        if((xOverlap < XSIZE) && (yOverlap < YSIZE)){
            console.log('!!!!!!! you died !!!!!!!');
            
        }
    }); 
    */ 

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    console.log(key);
    this.move = key;

}


// global constants
var XSIZE = 101;
var YSIZE = 83;
var XMIN = 0;
var XMAX = 5 * this.XSIZE;
var YMIN = -25;
var YMAX = (6 * this.YSIZE) - 25;  

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var e1 = new Enemy();
var e2 = new Enemy();
var e3 = new Enemy();
e1.init();
e2.init();
e3.init();
var allEnemies = [e1, e2, e3];
var player = new Player();
player.init();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
