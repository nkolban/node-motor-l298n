/**
 * Sample for motor-l298n.js.
 * 
 * In this test we run wheel forwards and the other backwards for 2 seconds and then
 * change direction and repeat.
 */

var speed      = 100; // Percentage
var in1Pin     = 17;
var in2Pin     = 27;
var enable1Pin = 12;
var in3Pin     = 5;
var in4Pin     = 6;
var enable2Pin = 13;
var direction  = 0;

console.log("Starting motor-l298n - test_alternate");

function changeDirection() {
  direction = 1 - direction;
  if (direction == 1) {
    console.log("Direction = FORWARD");
    l298n.forward(l298nModule.LEFT);
    l298n.forward(l298nModule.RIGHT);
  } else {
    console.log("Direction = BACKWARD");
    l298n.backward(l298nModule.LEFT);
    l298n.backward(l298nModule.RIGHT);
  }
};

var l298nModule = require("../src/motor-l298n");
var l298n = l298nModule.setup(in1Pin, in2Pin, enable1Pin, in3Pin, in4Pin, enable2Pin);
console.log("Globals: LEFT=%d, RIGHT=%d", l298nModule.LEFT, l298nModule.RIGHT);

l298n.setSpeed(speed);
changeDirection();
setInterval(changeDirection, 2*1000);


// End of file