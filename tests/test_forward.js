/**
 * Sample for the motor-l298n.js.
 * 
 * In this test we run the motors forward at 100%.
 */

var speed      = 100; // Percentage
var in1Pin     = 17;
var in2Pin     = 27;
var enable1Pin = 12;
var in3Pin     = 5;
var in4Pin     = 6;
var enable2Pin = 13;

console.log("Starting motor-l298n - test_forward");

var l298nModule = require("../src/motor-l298n");
var l298n = l298nModule.setup(in1Pin, in2Pin, enable1Pin, in3Pin, in4Pin, enable2Pin);
//console.log("Globals: LEFT=%d, RIGHT=%d", l298nModule.LEFT, l298nModule.RIGHT);

l298n.forward(l298nModule.LEFT);
l298n.forward(l298nModule.RIGHT);
l298n.setSpeed(l298nModule.LEFT,speed);
l298n.setSpeed(l298nModule.RIGHT,speed);
console.log("Moving forward!!");

setTimeout(function() {
  l298n.stop(l298nModule.LEFT);
  l298n.stop(l298nModule.RIGHT);
  console.log("All done!");
}, 180*1000);

// End of file