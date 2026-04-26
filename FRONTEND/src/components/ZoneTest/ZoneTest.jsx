import { useState, useEffect } from "react";
import useGameData from "../../hooks/useGameData";
import zoneimg from "../../assets/images/zones/zonetest.png";

export default function ZoneTest() {

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

    function saveinState() {
        getzones();
    }

    function getImageSize(e) {
        console.log(e.target.width, "*", e.target.height);
        const imgWidth = e.target.width;
        const imgHeight = e.target.height;

        const tile = 64;

        const tilesAmt_width = imgWidth / tile;
        const tilesAmt_height = imgHeight / tile;

        let tilearray = [];
        for (let h = 0; h < tilesAmt_height; h++) {
            tilearray.push([]);
            for (let w = 0; w < tilesAmt_width; w++) {
                tilearray[h].push(0);
            }
        }

        console.log(tilearray);
    }

    //getzones();
    console.log("zonedata:", zonedata);

    return (
        <img src={zonedata.zonedata && zonedata.zonedata[0].img} onLoad={getImageSize}></img>
    )

}