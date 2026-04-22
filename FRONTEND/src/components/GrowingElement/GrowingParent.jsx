import { useState, useEffect } from "react";

import AddEnergy from "./AddEnergy";

const growthtime = 10;
const maxage = 2;

function getdateHour(num) {
    return (num * 60 * 60 * 1000);
}

function getdateMinute(num) {
    return (num * 60 * 1000)
}

function getdateSecond(num) {
    return (num * 1000)
}

let targetdate1 = new Date("2026-04-22T16:52:00");
targetdate1 = new Date(targetdate1.setMinutes(targetdate1.getMinutes() + 1));
let targetdate2 = new Date(targetdate1);
targetdate2 = new Date(targetdate2.setMinutes(targetdate2.getMinutes() + 1));

let default_age = null;
if (Date.now() > targetdate1) {
    default_age = 1;
}
if (Date.now() > targetdate2) {
    default_age = maxage;
}
if (default_age == null) {
    default_age = 0;
}

console.log(1, targetdate1, 2, targetdate2);

export default function GrowingParent() {

    const [age, setAge] = useState(default_age);
    const [energy, setEnergy] = useState(0);
    const [growthtimer, setGrowthtimer] = useState(growthtime);

    function gettimeleft() {
        let usedate;
        if (age == 0) {
            usedate = targetdate1;
        }
        if (age == 1) {
            usedate = targetdate2;
        }
        if (age == maxage) {
            return { h: 0, m: 0, s: 0 };
        }
        const totaltimeleft = usedate - new Date();

        const d = Math.floor(totaltimeleft / (1000 * 60 * 60 * 24));
        const h = Math.floor((totaltimeleft / (1000 * 60 * 60)) % 24);
        const m = Math.floor((totaltimeleft / (1000 * 60)) % 60);
        const s = Math.floor((totaltimeleft / 1000) % 60);
        return { h, m, s };
    }

    const [timeleft, setTimeleft] = useState(gettimeleft());

    let growth_mult = Math.floor(growthtimer * (1 - (energy / 10)));

    console.log(timeleft);

    function isTimeDone({ h, m, s }) {
        if (h == 0 && m == 0 & s == 0) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {

        //console.log("checking growthtimer", growthtimer);

        if (!isTimeDone({ h: timeleft.h, m: timeleft.m, s: timeleft.s })) {
            const t = setInterval(() => {

                //setGrowthtimer(growth_mult - 1);
                setTimeleft(gettimeleft());
                //console.log(growthtimer)

            }, 1000);

            return () => {
                //console.log("clearing interval...")
                clearInterval(t);
            }

        } else {
            if (age < maxage) {
                setAge(age + 1);
                if (age < maxage - 1) {
                    //setGrowthtimer(growthtime);
                    setTimeleft(gettimeleft());
                }

            }
        }

    }, [timeleft])

    function getDragon() {

        switch (age) {
            case 0:
                return (<div className="growage0"></div>);
            case 1:
                return (<div className="growage1"></div>);
            case 2:
                return (<div className="growage2"></div>);
            default:
                return (<div className="growage0"></div>);
        }
    }

    function increaseEnergy(en) {
        setEnergy(en);
    }

    function decreaseTimer() {
        setGrowthtimer(growthtimer - 1)
    }

    return (
        <div>
            <div>{getDragon()}</div>
            {age < maxage && <div>Will grow in: {timeleft.h}h {timeleft.m}m {timeleft.s}s </div>}
            <AddEnergy currentenergy={energy} getfunc={increaseEnergy}></AddEnergy>
        </div>)


}