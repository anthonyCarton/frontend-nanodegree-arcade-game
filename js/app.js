class Enemy {
  constructor() {
    this.sprite = 'images/enemy-bug.png'; // TODO: random enemy f()
    this.x = -75;
    this.y = initialLocation();
    // Set entity size for collision detection
    this.width = 50;
    this.height = 50;
    this.speed = 40;  // TODO: Set VARIABLE enemy speed
    this.gameSpeed = 1;

    // Boolean Values for object states?
    this.isMoving = true;
    this.isAlive = true;
    this.isCollided = false;

  };
  update(dt){
    if (this.isMoving === true) { this.x += dt * this.speed; }
    if (this.x >= 300) { this.isMoving = false }

    // Handle collision with the Player
    // Uses Axis-Aligned Bounding Box method
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if ( this.isMoving === true
      && this.x < player.x + player.width
      && this.x + this.width > player.x
      && this.y < player.y + player.height
      && this.height + this.y > player.y) {
       console.log('collision detected');
       this.isMoving = false;
       gameEnd('lose');
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
    // Set entity size for collision detection
    this.width = 50;
    this.height = 50;
    // Set this.sprite to appropriate image
    this.sprite = 'images/char-boy.png';

    // Boolean Values for object states?
    this.isPlaying = true;
  }

  // Methods: This class requires an update(), render() and a handleInput() method.
  update(dt) {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyInput) {
    const moveDef = {
      left: function() {
        if (player.x > 0) { return player.moveH(-1) }
      },
      right: function() {
        if (player.x < 400 ){ return player.moveH(1) }
      },
      up: function() {
        if (player.y > 0) { return player.moveV(-1) };
      },
      down: function() {
        if (player.y < 390) { return player.moveV(1)}
      }
    }
    if (this.isPlaying === true) { moveDef[keyInput](); };
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
  } else {
    // lose game >:(
    console.log('lose game');
  }
}

// Now instantiate objects.

// Place the player object in a variable called player
let player = new Player();
let allEnemies = [];


function gameStart(){
  // Create new Enemies
  newEnemy();  // for now
}

// TODO: Create Enemies
function newEnemy() {
  allEnemies.push(new Enemy());
}
function killEnemy(x) {
  allEnemies.splice(x, 1)
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
