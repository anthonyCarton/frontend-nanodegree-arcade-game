class Enemy {
  constructor() {
    this.sprite = 'images/enemy-bug.png'; // TODO: random enemy f()
    this.x = -75;
    this.y = initialLocation();
  }
  update(dt){
    // TODO: Set VARIABLE enemy speed
    let speed = dt*200;
    let newX = this.x + speed;

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

let initialLocation = function (){
  const laneDef = { 0 : 60, 1 : 145, 2 : 225 };
  let rand = (function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  })(3);
  // Replaced switch statement with laneDef Object Literal. https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
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

    player.handleInput(allowedKeys[e.keyCode]);
});
