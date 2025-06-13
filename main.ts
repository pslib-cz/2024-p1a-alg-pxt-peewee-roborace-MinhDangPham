type IRC = {
    l: DigitalPin,
    c: DigitalPin,
    r: DigitalPin
}
const IR: IRC = {
    l: DigitalPin.P14,
    c: DigitalPin.P13,
    r: DigitalPin.P12
}
pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);
basic.forever(function () {
    let left = pins.digitalReadPin(IR.l)
    let center = pins.digitalReadPin(IR.c)
    let right = pins.digitalReadPin(IR.r)
})
/*
radio.setGroup(61)
let rychlost: number = -100
radio.onReceivedValue(function(name: "speed", speed) {
    rychlost = speed
})
*/
function forward() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, -120)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -120)
}
function turnLeft() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, -100)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -50)
}
function turnRight() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, -50)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -100)
}
function stop() {
    PCAmotor.MotorStopAll()
}

basic.forever(function () {
    let left = pins.digitalReadPin(IR.l)
    let center = pins.digitalReadPin(IR.c)
    let right = pins.digitalReadPin(IR.r)

    if (center == 0 && left == 1 && right == 1) {
        forward()
    } else if (left == 0) {
        turnLeft()
    } else if (right == 0) {
        turnRight()
    } else {
        stop()
    }

    basic.pause(10)
})
