import { useState, useEffect } from "react";
import { gameService } from "../services/api";

export default function useGameData() {

    const [zonedata, setZonedata] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function getzones() {
        try {
            setLoading(true);
            const data = await gameService.getZoneAll();
            setZonedata(data);
            return data;
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    let dataget = false;
    useEffect(() => {
        if (!dataget) {
            setZonedata(getzones());
            dataget = true;
        }
    }, [])

    return { zonedata, error, loading, getzones }
}