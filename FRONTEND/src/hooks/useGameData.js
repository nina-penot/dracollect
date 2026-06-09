import { useState, useEffect } from "react";
import { gameService } from "../services/api";

export default function useGameData() {

    const [zonedata, setZonedata] = useState({});

    async function getzones() {
        const data = await gameService.getZoneAll();
        setZonedata(data);
        return data;
    }

    let dataget = false;
    useEffect(() => {
        if (!dataget) {
            setZonedata(getzones());
            dataget = true;
        }
    }, [])

    return { zonedata, getzones }
}