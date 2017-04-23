var columnPixelSize = 101;
var rowPixelSize = 83;
var rowPixelOffset = 20;

var Enemy = function(column = 0, row = 0) {

    this.init(column, row);

    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.getInitialXPosition = function(column) {
  return column * columnPixelSize;
}
/*This function gets the enemy's initial X position between columns 0-4*/

Enemy.prototype.getInitialYPosition = function(row) {
  return row * rowPixelSize - rowPixelOffset;
}
/*This function gets the enemy's initial Y position between rows 0-5*/

Enemy.prototype.getRandomValueForRange = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
/*This function gets a random value within any set range*/

Enemy.prototype.XLimit = 505;

Enemy.prototype.init = function(column, row) {
  this.x = this.getInitialXPosition(column);
  this.y = this.getInitialYPosition(row);
  this.speed = this.getRandomValueForRange(80, 400);
}
/*This function initiates enemies of random speeds.*/

Enemy.prototype.update = function(dt) {

    this.x = this.x + this.speed * dt;
    if(this.x > this.XLimit) {
      this.init(-1, this.getRandomValueForRange(1, 4));
    }
}
/*This function updates enemies and reinitiates them after passing the
*maximum X value with random speeds and on random rows*/

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


var Player = function(column = 2, row = 5) {

    this.init(column, row);

    this.sprite = 'images/char-horn-girl.png';
}

Player.prototype.getInitialXPosition = function(column) {
  return column * columnPixelSize;
}
/*This function gets the player's initial X position between columns 0-4*/

Player.prototype.getInitialYPosition = function(row) {
  return row * rowPixelSize - rowPixelOffset;
}
/*This function gets the player's initial Y position between rows 0-5*/

Player.prototype.init = function (column, row) {
  this.x = this.getInitialXPosition(column);
  this.y = this.getInitialYPosition(row);
}
/*This function initiates a player on set X and Y positions.*/

Player.prototype.checkCollisions = function() {
  for (i = 0; i < allEnemies.length; i++) {
    if ((this.y == allEnemies[i].y) && (Math.abs(this.x - allEnemies[i].x) <= 55)) {
      return true;
    }
  };
}
/*This function checks if any collisions of player and enemy occur and
*returns a true or false value.*/


Player.prototype.update = function() {
  if (this.checkCollisions()) {
    this.init(2,5);
  } else if (this.y == this.getInitialYPosition(0)) {
    this.init(2,5);
    window.alert("Congratulations! You win!");
  };
}
/*This function reinitiates player from start position if a collision
*occurs and if it doesn't happen and player reaches row 0, creates a prompt
*message.*/


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.handleInput = function(pressedKey) {
  switch(pressedKey) {
    case 'left':
      if (this.x > this.getInitialXPosition(0)) {
        this.x = this.x - columnPixelSize;
      };
      break;

    case 'right':
      if (this.x < this.getInitialXPosition(4)) {
        this.x = this.x + columnPixelSize;
      };
      break;

    case 'up':
      if (this.y > this.getInitialYPosition(0)) {
        this.y = this.y - rowPixelSize;
      };
      break;

    case 'down':
    if (this.y < this.getInitialYPosition(5)) {
      this.y = this.y + rowPixelSize;
    };
    }
}
/*This function takes pressed keys into account and moves player accordingly
*while preventing player from overstepping set boundaires.*/


var allEnemies = [new Enemy(-1,1), new Enemy(-1,2), new Enemy(-1,3)];

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
