import { useState, useEffect } from "react";
import { gameService } from "../services/api";

export default function useGameData() {

    const [zonedata, setZonedata] = useState({});
    const [error, setError] = useState("");

    async function getzones() {
        try {
            const data = await gameService.getZoneAll();
            setZonedata(data);
            return data;
        } catch (err) {
            console.log(err);
            setError(err);
        }

    }

    let dataget = false;
    useEffect(() => {
        if (!dataget) {
            setZonedata(getzones());
            dataget = true;
        }
    }, [])

    return { zonedata, error, getzones }
}