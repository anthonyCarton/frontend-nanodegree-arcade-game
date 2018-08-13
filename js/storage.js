// Enemies our player must avoid
/* var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
/* Enemy.prototype.update = function(dt) {
    // TODO: multiply any movement by the dt parameter to ensure the game runs at the same speed for all computers
    let movement = dt*100;
    let newX = this.x + movement;
    // TODO: Update the Enemy location
    this.x = newX;

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
}*/


/* This works to change player position too.
const hSpeed = 50, vSpeed = 42;
const moveDef = {
  left: [-hSpeed, true],
  right: [hSpeed, true],
  up: [-vSpeed, false],
  down: [vSpeed, false]
}
if (moveDef[keyInput][1] === true) {
  // console.log(`left || right ${moveDef[keyInput][0]}`);
  this.x = this.x + moveDef[keyInput][0];
} else {
  // console.log(`up || down ${moveDef[keyInput][0]}`);
  this.y = this.y + moveDef[keyInput][0];
}*/
// moveDef[keyInput](this.x);
