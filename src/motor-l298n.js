/**
 * motor-l298n
 * 
 * Control an L298N dual H-Bridge DC motor controller.  The exposed functions are:
 * 
 * setup()
 * forward(side)
 * backward(side)
 * stop(side)
 * setSpeed(side, speed)
 * 
 * Neil Kolban <kolban1@kolban.com>
 * 2016-04-29
 */


var wpi = require('wiring-pi');

wpi.setup('gpio');

// Create definitions for the constants.
var FORWARD  = 1;
var BACKWARD = -1;

var LEFT  = 1;
var RIGHT = -1;

// Publish the constants.
exports.FORWARD  = FORWARD;
exports.BACKWARD = BACKWARD;
exports.LEFT     = LEFT;
exports.RIGHT    = RIGHT;

// A global used to identify L298N for debugging purposes.  The first L298N created
// will have index 1, the next will have index 2 and so on.
var l298nIndex=1;

/**
 * Setup the object for usage.
 */
exports.setup = function(in1Pin, in2Pin, enable1Pin, in3Pin, in4Pin, enable2Pin) {
  var context = {
    // Export the functions
    setSpeed: setSpeed, // Function
    forward:  forward, // Function
    backward: backward, // Function
    stop:     stop, // Function
    
    _l298nIndex: l298nIndex, // The index of the motor used for debugging purposes.
    _direction:  FORWARD, // Motor direction.
    
    _in1Pin:     in1Pin,
    _in2Pin:     in2Pin,
    _enable1Pin: enable1Pin,
    _in3Pin:     in3Pin,
    _in4Pin:     in4Pin,
    _enable2Pin: enable2Pin,
    _speedLeft:  0,
    _speedRight: 0
  }
  
  // Set the direction of the pins used to drive the L298N.
  
  wpi.pinMode(enable1Pin, wpi.PWM_OUTPUT);
  wpi.pinMode(enable2Pin, wpi.PWM_OUTPUT);
  wpi.pwmSetMode(wpi.PWM_MODE_MS);
  wpi.pwmSetClock(1920);
  wpi.pwmSetRange(100);
  wpi.pwmWrite(enable1Pin, 0);
  wpi.pwmWrite(enable2Pin, 0);
  wpi.pinMode(in1Pin, wpi.OUTPUT);
  wpi.pinMode(in2Pin, wpi.OUTPUT);
  wpi.pinMode(in3Pin, wpi.OUTPUT);
  wpi.pinMode(in4Pin, wpi.OUTPUT);

  
  // Set the initial values of the pins
  wpi.digitalWrite(in1Pin, 0);
  wpi.digitalWrite(in2Pin, 0);
  //wpi.digitalWrite(enable1Pin, 1);
  wpi.digitalWrite(in3Pin, 0);
  wpi.digitalWrite(in4Pin, 0);
  //wpi.digitalWrite(enable2Pin, 1);
  
  l298nIndex++; // Increment the global l298nIndex count (used for debugging).
  
  return context;
} // End of setup


/**
 * PUBLIC:
 * Sets the speed of a side as a percentage of maximum.
 * @param side Either LEFT or RIGHT.
 */
function setSpeed(side, speed)
{
  if (side == LEFT) {
    this._speedLeft = speed;
    wpi.pwmWrite(this._enable1Pin, speed);
  } else if (side == RIGHT) {
    this._speedRight = speed;
    wpi.pwmWrite(this._enable2Pin, speed);
  }
} // End of setSpeed


/**
 * PUBLIC:
 * Set the direction of rotation of the side to forward.
 * @param side Either LEFT or RIGHT.
 */
function forward(side) {
  if (side == LEFT) {
    wpi.digitalWrite(this._in1Pin, 1);
    wpi.digitalWrite(this._in2Pin, 0);
  } else if (side == RIGHT) {
    wpi.digitalWrite(this._in3Pin, 1);
    wpi.digitalWrite(this._in4Pin, 0);
  }
} // End of forward


/**
 * PUBLIC:
 * Set the direction of rotation of the side to backward.
 * @param side Either LEFT or RIGHT.
 */
function backward(side) {
  if (side == LEFT) {
    wpi.digitalWrite(this._in1Pin, 0);
    wpi.digitalWrite(this._in2Pin, 1);
  } else if (side == RIGHT) {
    wpi.digitalWrite(this._in3Pin, 0);
    wpi.digitalWrite(this._in4Pin, 1);
  }
} // End of backward



/**
 * PUBLIC
 * Stop the rotation of the side.
 * @param side Either LEFT or RIGHT.
 */
function stop(side) {
  if (side == LEFT) {
    wpi.digitalWrite(this._in1Pin, 0);
    wpi.digitalWrite(this._in2Pin, 0);
  } else if (side == RIGHT) {
    wpi.digitalWrite(this._in3Pin, 0);
    wpi.digitalWrite(this._in4Pin, 0);
  }
} // End of stop


// End of file
