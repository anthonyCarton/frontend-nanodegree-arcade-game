// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // TODO: multiply any movement by the dt parameter to ensure the game runs at the same speed for all computers

    // TODO: Update the Enemy location

    // TODO: Handle collision with the Player
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.initialLocation = function() {
  // TODO: Set Enemy Initial Location
}

Enemy.prototype.speed = function() {
  // TODO: Set variable enemy speed
}

// Now write your own player class
class Player {
  constructor(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;

    // Set this.sprite to appropriate image
    this.sprite = 'images/char-boy.png';
  }
  // Methods: This class requires an update(), render() and a handleInput() method.
  update() {

  }
  render() {

  }
  handleInput() {

  }
}


// Now instantiate your objects.
let allEnemies = [];
let player = new Player();

function gameStart(){
  // Place all enemy objects in an array called allEnemies
  allEnemies.push(new Enemy());
  // Place the player object in a variable called player
}

// TODO: Opening index.html should load game
window.addEventListener('load', function(event){
  gameStart();
});



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
