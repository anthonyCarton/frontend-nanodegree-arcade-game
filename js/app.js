// TODO: convert functions to arrow functions
// TODO: Update the Readme
// TODO: Comments are present and effectively explain longer code procedures. As a rule of thumb: describe what all custom functions and object methods do.
// TODO: Check JS style guide

// Opt TODO: Add collectible items on screen
// Opt TODO: Multiple vehicle types
// Opt TODO: Timed games

class Enemy {
  constructor() {
    this.sprite = 'images/enemy-bug.png'; // TODO: random enemy f()
    this.x = -75;
    this.y = initialLocation(); // TODO: if this was an enemy.method, would I be able to: this.y = this.initialLocation();?
    this.speed = 40;  // TODO: Set VARIABLE enemy speed

    // Set entity size for collision detection
    this.radius = 43;


    this.isMoving = true;
    this.isAlive = true;
    this.isCollided = false;
  };
  update(dt){
    if (this.isMoving === true) { this.x += dt * this.speed; }
    // stops enemy after they leave the board
    if (this.x >= 300) { this.isAlive = false }

    // Handle collision with the Player
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    // Using Circle Collision method
    let dx = this.x - player.x;
    let dy = this.y - player.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if ( this.isMoving === true && distance < this.radius + player.radius) {
      console.log('collision detected');
      this.isMoving = false;
      gameEnd('lose');
    }
  }
  cleanUpDeadEnemies() {
    allEnemies = allEnemies.filter(function(enemy) {
      return enemy.isAlive === true;
    });
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.cleanUpDeadEnemies();
  }
}

// Now write your own player class
class Player {
  constructor() {
    // Locate Player on game board
    this.x = 200;
    this.y = 390;
    // Set entity size for collision detection
    this.width = 10;
    this.height = 50;
    this.radius = 25;
    // Set this.sprite to appropriate image
    this.sprite = 'images/char-boy.png'; // TODO: user select from options?
    // Boolean Values for object states?
    this.isPlaying = true;

  }

  // Methods: This class requires an update(), render() and a handleInput() method.
  // Movement methods
  left() { if (this.x > 0) { return this.moveH(-1) } }
  right() { if (this.x < 400 ) { return this.moveH(1) } }
  up() { if (this.y > 0) { return this.moveV(-1) } }
  down() { if (this.y < 390) { return this.moveV(1)} }

  update(dt) {}
  render() { ctx.drawImage(Resources.get(this.sprite), this.x, this.y) }
  handleInput(keyInput) {
    if (this.isPlaying === true) { this[keyInput](); };
    if (player.y < 0) { return gameEnd('win') };

    // Where is the player?
    console.log(`x = ${this.x} & y = ${this.y}`);
  }

  moveH(sign) { // Move Horizontally
    const hSpeed = 50;
    this.x += (hSpeed*sign);
  }

  moveV(sign) { // Move Vertically
    const vSpeed = 42;
    this.y += (vSpeed*sign);
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

let gameEnd = function(arg) { // expects win or lose
  player.isPlaying = false;
  // stop all the enemies
  for (enemy of allEnemies) {
    enemy.isMoving = false;
  }
  if (arg === 'win') {
    // win game
    console.log('win game');
    // TODO: Something happens when player wins
  } else {
    // lose game >:(
    console.log('lose game');
  }
  gameStart();

}

// Now instantiate objects.

// Place the player object in a variable called player
let player = new Player();
let allEnemies = [];

// Create Enemies
function newEnemy() {
  // TODO: Vehicles cross the screen (more than one)
  allEnemies.push(new Enemy());
}

function gameStart(){
  // Reset player and enemies
  allEnemies = [];
  player = new Player();

  // Create new Enemies
  newEnemy();  // for now

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
