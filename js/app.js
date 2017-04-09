var columnPixelSize = 101;
var rowPixelSize = 83;
var rowPixelOffset = 20;
// Enemies our player must avoid
var Enemy = function(column = 0, row = 0) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.init(column, row);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.getInitialXPosition = function(column) {
  return column * columnPixelSize;
}

Enemy.prototype.getInitialYPosition = function(row) {
  return row * rowPixelSize - rowPixelOffset;
}

Enemy.prototype.getRandomValueForRange = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

Enemy.prototype.XLimit = 505;

Enemy.prototype.init = function(column, row) {
  this.x = this.getInitialXPosition(column);
  this.y = this.getInitialYPosition(row);
  this.viteza = this.getRandomValueForRange(80, 400);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    this.x = this.x + this.viteza * dt;
    if(this.x > this.XLimit) {
      this.init(-1, this.getRandomValueForRange(1, 4));
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(column = 2, row = 5) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.init(column, row);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.getInitialXPosition = function(column) {
  return column * columnPixelSize;
}

Player.prototype.getInitialYPosition = function(row) {
  return row * rowPixelSize - rowPixelOffset;
}

Player.prototype.init = function (column, row) {
  this.x = this.getInitialXPosition(column);
  this.y = this.getInitialYPosition(row);
}

Player.prototype.update = function() {

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
  console.log(pressedKey);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(-1,1), new Enemy(-1,2), new Enemy(-1,3)];

var player = new Player();
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
