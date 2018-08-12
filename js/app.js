// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 200;
    let initLoc = function(){
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      let rand = getRandomInt(3);
      console.log(rand);
      switch (rand) {
        case 0: // highLane
          return 60;
          break;
        case 1: // medLane
          return 145;
          break;
        case 2: // lowLane
            return 225;
          break;
        default: // default to highLane
          return 60;
      }
    }

    this.y = initLoc();

    // this.y = initialLocation();
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
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let rand = getRandomInt(3);
  switch (rand) {
    case 0: // highLane
      return 60;
      break;
    case 1: // medLane
      return 145;
      break;
    case 2: // lowLane
        return 225;
      break;
    default: // default to highLane
      return 60;
  }
}

Enemy.prototype.speed = function() {
  // TODO: Set variable enemy speed
}

// Now write your own player class
class Player {
  constructor() {
    // Locate Player on game board
    this.x = 200;
    this.y = 400;

    // Set this.sprite to appropriate image
    this.sprite = 'images/char-boy.png';
  }
  // Methods: This class requires an update(), render() and a handleInput() method.
  update() {

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // TODO, could this just also use the above?
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
