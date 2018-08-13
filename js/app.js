
class Enemy {
  constructor() {
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -75;
    // Make initialLocation and getRandomInt IIFEs
    this.y = (function initialLocation(){
      let rand = (function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      })(3);
      /* Replaced switch statement with Object Literal and then access obj properties by index.
        https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
        */
      const laneDef = {
        0 : 60,
        1 : 145,
        2 : 225
      }
      return laneDef[rand];
    })();
  }
  update(dt){
    // TODO: multiply any movement by the dt parameter to ensure the game runs at the same speed for all computers
    // TODO: Set variable enemy speed
    let movement = dt*100;
    let newX = this.x + movement;
    // TODO: Update the Enemy location
    this.x = newX;

    // TODO: Handle collision with the Player

    // Kill bug after it leaves screen
    if (this.x > 600) {
      killBug();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
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
  // Place the player object in a variable called player
  newEnemy();
}

// TODO: Create Enemies
function newEnemy(){
  let anEnemy = new Enemy();

  // Place all enemy objects in an array called allEnemies
  allEnemies.push(anEnemy);
}

function killBug() {
  allEnemies.splice(this, 1);
  console.log('bug is dead');
  // when a bug dies, a new one starts
  newEnemy();
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
