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


Enemy.prototype.update = function(dt) {

    this.x = this.x + this.viteza * dt;
    if(this.x > this.XLimit) {
      this.init(-1, this.getRandomValueForRange(1, 4));
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(column = 2, row = 5) {

    this.init(column, row);

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

Player.prototype.checkCollisions = function() {
  for (i = 0; i < allEnemies.length; i++) {
    if ((this.y == allEnemies[i].y) && (Math.abs(this.x - allEnemies[i].x) <= 55)) {
      return true;
    }
  };
};


Player.prototype.update = function() {
  if (this.checkCollisions()) {
    this.init(2,5);
  } else if (this.y == this.getInitialYPosition(0)) {
    this.init(2,5);
    window.alert("Congratulations! You win!");
  };
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


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
};


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
