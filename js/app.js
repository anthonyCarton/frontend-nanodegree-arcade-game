class Enemy {
  constructor() {
    this.sprite = 'images/enemy-bug.png'; // TODO: random enemy f()
    this.x = -75;
    this.y = initialLocation();
    this.speed = 400;  // TODO: Set VARIABLE enemy speed
  }

  update(dt){
    // Update the Enemy location
    this.x = this.x + (dt*this.speed);

    // TODO: Handle collision with the Player

    // Remove bug from array after it leaves screen
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
    this.y = 390;

    // Set this.sprite to appropriate image
    this.sprite = 'images/char-boy.png';
  }

  // Methods: This class requires an update(), render() and a handleInput() method.
  update(dt) {
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyInput) {
    const moveDef = {
      left: function() {return player.moveH(-1)},
      right: function() {return player.moveH(1)},
      up: function() {return player.moveV(-1)},
      down: function() {return player.moveV(1)}
    }
    moveDef[keyInput]();

    // Define Limits for the gameBoard
    console.log(`x = ${this.x} & y = ${this.y}`);
    const limits = {
      right: 400, // this.x
      left: 0,
      top: -30, // this.y
      bottom: 390
    }
    // if (player is at edge) {don't do anything}
  }

  moveH(sign) { // Move Horizontally
    const hSpeed = 50;
    this.x = this.x + (hSpeed*sign);
    }

  moveV(sign) { // Move Vertically
    const vSpeed = 42;
    this.y = this.y + (vSpeed*sign);
  }
}



let initialLocation = function (){
  // Replaced switch statement with laneDef Object Literal. https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
  const laneDef = { 0 : 60, 1 : 145, 2 : 225 };
  let rand = (function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  })(3);
  return laneDef[rand];
};

// Now instantiate objects.

// Place the player object in a variable called player
let player = new Player();
let allEnemies = [];


function gameStart(){
  // Create new Enemies
  newEnemy();  // for now
}

// TODO: Create Enemies
function newEnemy(){
  allEnemies.push(new Enemy());
}

function killBug() {
  allEnemies.splice(this, 1);
  console.log('bug is dead');
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
  if (Object.keys(allowedKeys).includes(e.keyCode.toString()) == true) {
    player.handleInput(allowedKeys[e.keyCode]);
  }
});
