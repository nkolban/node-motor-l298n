# motor-l298n

Control an l298n motor from the Raspberry Pi.

## Install
The package can be installed using `npm`.

```
$ npm install motor-l298n
```

## Usage
The class controls two motors connected to an L298N.  The motors are known as LEFT and RIGHT.

We create an instance of an l298n with:

```
module.setup(in1Pin, in2Pin, enable1Pin, in3Pin, in4Pin, enable2Pin);
```

It has a number of core capabilities that are motor related.  First we have the
notion of the rotation speed.  This is measured in a percentage of maximum speed:

```
l298n.setSpeed(side, 60);
```

Setting the speed doesn't actually cause the motor to
turn.  We would then call one of the direction functions which are:

```
l298n.forward(side);
```

and

```
l298n.backward(side);
```

Calling either of these starts the motor turning at the currently set speed.  If we change the speed while the motor is
rotating, it will change the rate of rotation.

If we wish to stop a motor from turning, we can call:

```
l298n.stop(side);
```



In summary, the methods are:

| Method                                                       | Description                |
|--------------------------------------------------------------|----------------------------|
| `setup(in1, in2, enable1, in3, in4, enable2)`                | Setup the L298N            |
| `setSpeed(side, speed)`                                      | Set the speed of rotation  |
| `forward(side)`                                              | Start rotating forwards    |
| `backward(side)`                                             | Start rotating backwards   |
| `stop(side)`                                                 | Stop rotating              |

## Dependencies
This package depends upon:

* [Wiring-Pi](https://github.com/eugeneware/wiring-pi) - Node.js binding to wiringPi


## Design Notes

