import { useState } from "react";

export default function AddEnergy({ currentenergy, getfunc }) {
    if (currentenergy == null || currentenergy == undefined) {
        currentenergy = 0;
    }

    function increaseEnergy() {
        if (getfunc) {
            getfunc(currentenergy + 1);
        }
    }

    return (
        <div>
            <div>Energy: {currentenergy}</div>
            <button onClick={increaseEnergy}>Give energy</button>
        </div>
    )
}