// TODO: Check JS style guide

// Opt TODO: Add collectible items on screen
// Opt TODO: Multiple vehicle types
// Opt TODO: Timed games

/**
* @description Represents an Enemy
* @constructor          - Contains properties for speed, size, location and state
*   @param {num} lane   - the y coordinate of this.enemy's lane
*   @param {num} speed  - the speed of the this.enemy
* @update Updates board / handles collision detection using Circle Collision method
*   @param {num} dt     - multiply any movement by the dt parameter to ensure the game runs at the same speed for all computers
* @cleanUpDeadEnemies   - remove dead enemies from right side of board
* @render               - draws the enemy on the screen
*/
class Enemy {
  constructor(lane, speed) {
    this.sprite = 'images/enemy-bug.png'; // TODO: random enemy f()
    this.x = -100;
    this.y = lane;
    this.speed = speed;
    // Set entity size for collision detection
    this.radius = 43;
    this.isMoving = true;
    this.isAlive = true;
    this.isCollided = false;
  };
  update(dt){
    if (this.isMoving === true) { this.x += dt * this.speed; };
    if (this.x >= 500) { this.isAlive = false };
    // Using Circle Collision method
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    let dx = this.x - player.x;
    let dy = this.y - player.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if ( this.isMoving === true && distance < this.radius + player.radius) {
      this.isMoving = false;
      gameEnd('lose');
    };
  };
  cleanUpDeadEnemies() {
    allEnemies = allEnemies.filter(function(enemy) {
      return enemy.isAlive === true;
    });
  };
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.cleanUpDeadEnemies();
  };
};

/**
* @constructor        - Contains properties for speed, size, location and state
* @moveH              - Moves player horizontally
*   @param {num} sign - expects +1 / -1 for for left or right
* @moveV              - Moves player vertically
*   @param {num} sign - expects +1 / -1 for for up or down
* @up                 - increments player position on board
  @down               "
  @left               "
  @right              "
* @render             - draws the enemy on the screen
* @handleInput        - receives user interaction
*   @param {string} keyInput - expects 'left', 'right', 'up', 'down'
*/
class Player {
  constructor() {
    this.isPlaying = true;
    // TODO: user select from options
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 390;
    // Set entity size for collision detection
    this.radius = 25;
  };
  moveH(sign) {
    const H_SPEED = 50;
    this.x += (H_SPEED*sign);
  };
  moveV(sign) {
    const V_SPEED = 42;
    this.y += (V_SPEED*sign);
  };
  left() { if (this.x > 0) { return this.moveH(-1) }; };
  right() { if (this.x < 400 ) { return this.moveH(1) }; };
  up() { if (this.y > 0) { return this.moveV(-1) }; };
  down() { if (this.y < 390) { return this.moveV(1)}; };
  update(dt) {};
  render() { ctx.drawImage(Resources.get(this.sprite), this.x, this.y) };
  handleInput(keyInput) {
    if (this.isPlaying === true) { this[keyInput](); };
    if (player.y < 0) { return gameEnd('win') };
  };
};

let rand = max => Math.floor(Math.random() * Math.floor(max));

let gameEnd = arg => {
  // arg expects win or lose
  player.isPlaying = false;
  // stop all the enemies
  for (enemy of allEnemies) {
    enemy.isMoving = false;
  };
  if (arg === 'win') {
    // win game
    alert('You Win!!!');
  } else {
    // lose game >:(
    alert('You lose >:(');
  };
  gameStart();
};

// Instantiate objects
let player = new Player();
let allEnemies = [];

let newEnemy = () => {
  // Create Enemies passing in random speed and lane every 750ms
  const LANE_DEF = {0 : 60, 1 : 145, 2 : 225};
  const SPEED_DEF = {0 : 200, 1 : 250, 2 : 300};
  allEnemies.push(new Enemy(LANE_DEF[rand(3)], SPEED_DEF[rand(3)]));
};
let timer = setInterval(createEnemies, 750);
function createEnemies() {
  console.log('go');
  if (player.isPlaying) {
    newEnemy();
  }
}

let gameStart = () => {
  // Reset player and enemies
  allEnemies = [];
  player = new Player();
  allEnemies.push(new Enemy(225, 300));
}

window.addEventListener('load', function(event){
  // Opening index.html load game
  gameStart();
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  const ALLOWED_KEYS = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};
  if (Object.keys(ALLOWED_KEYS).includes(e.keyCode.toString()) == true) {
    player.handleInput(ALLOWED_KEYS[e.keyCode]);
  };
});
