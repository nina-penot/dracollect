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

let now = new Date(Date.now());

let targetdate1 = new Date(now.getTime() + getdateMinute(1));
//targetdate1 = new Date(targetdate1.setMinutes(targetdate1.getMinutes() + 1));
let targetdate2 = new Date(now.getTime() + getdateMinute(2));

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

console.log("now", now, 1, targetdate1, 2, targetdate2);

export default function GrowingParent() {

    const [age, setAge] = useState(default_age);
    const [energy, setEnergy] = useState(0);
    const [growthtimer, setGrowthtimer] = useState(growthtime);

    function gettimeleft(usedate) {

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

    const [phase1, setPhase1] = useState(targetdate1);
    const [phase2, setPhase2] = useState(targetdate2);
    const [timeleft, setTimeleft] = useState(gettimeleft(targetdate1));

    function applyEnergyMult() {
        let mult = 0 + (energy / 100);
        if (mult >= 0.5) {
            mult = 0.5;
        }

        let phase1_time = targetdate1.getTime();
        let timediff1 = phase1_time - now.getTime();
        let age1bonus = phase1_time - (timediff1 * mult);

        let phase2_time = targetdate2.getTime();
        let timediff2 = phase2_time - now.getTime();
        let age2bonus = phase2_time - (timediff2 * mult);
        console.log(timediff1, timediff2)
        setPhase1(new Date(age1bonus))
        setPhase2(new Date(age2bonus))
    }

    //let growth_mult = Math.floor(growthtimer * (1 - (energy / 10)));

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
                if (age == 0) {
                    setTimeleft(gettimeleft(phase1));
                }
                if (age == 1) {
                    setTimeleft(gettimeleft(phase2));
                }

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
                    setTimeleft(gettimeleft(phase2));
                }

            }
        }

    }, [timeleft])

    useEffect(() => {
        console.log("phase1:", phase1);
        console.log("phase2:", phase2);
    }, [phase1, phase2])

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
        applyEnergyMult();
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