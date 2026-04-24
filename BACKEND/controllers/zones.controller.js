import zonedata from "../gamedata/zonedata.json" with { type: "json" };

export async function getZoneAll(req, res) {
    try {
        console.log(req);
        res.json({ zonedata: zonedata });
    } catch (err) {
        console.log(err);
    }
}

// export async function getZonebyID(req, res) {

// }
