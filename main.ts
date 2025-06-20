radio.setGroup(61)

let start = false

radio.onReceivedString(function (received: string) {
    if (received === "start") {
        start = true
    } else if (received === "stop") {
        start = false
        stop()
    }
})

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

pins.setPull(IR.l, PinPullMode.PullNone)
pins.setPull(IR.c, PinPullMode.PullNone)
pins.setPull(IR.r, PinPullMode.PullNone)

function forward() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, -170)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -170)
}

function turnLeft() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, -100)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -40)
}

function turnRight() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, -40)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -100)
}

function stop() {
    PCAmotor.MotorStopAll()
}

basic.forever(function () {
    if (start) {
        let left = pins.digitalReadPin(IR.l)
        let center = pins.digitalReadPin(IR.c)
        let right = pins.digitalReadPin(IR.r)

        if ((center === 0 && left === 1 && right === 1) || (center === 1 && left === 1 && right === 1)) {
            forward()
        } else if (left === 0) {
            turnLeft()
        } else if (right === 0) {
            turnRight()
        } else {
            stop()
        }
    } else {
        stop()
    }

    basic.pause(10)
})
