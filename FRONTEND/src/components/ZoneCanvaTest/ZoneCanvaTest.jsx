import { useState, useEffect, useRef } from "react";
import useGameData from "../../hooks/useGameData";
import zoneimg from "../../assets/images/zones/zonetest.png";

export default function ZoneCanvaTest() {

    const { zonedata, getzones } = useGameData();

    // const [zonestate, setZonestate] = useState({});
    const [zonetilesarray, setZonetilesarray] = useState([]);


    let save = true;
    useEffect(() => {
        if (save) {
            saveinState();
        }
        save = false;
    }, [])

    async function saveinState() {
        getzones();
    }

    //getzones();
    console.log("zonedata:", zonedata);

    return (
        <canvas></canvas>
    )

}