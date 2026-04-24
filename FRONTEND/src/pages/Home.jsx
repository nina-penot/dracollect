import GrowingParent from "../components/GrowingElement/GrowingParent";
import ZoneTest from "../components/ZoneTest/ZoneTest";
import { default as test } from "../assets/images/newtest.svg";

export default function Home() {
    return (

        <div>
            <div>Welcome home</div>
            {/* <GrowingParent></GrowingParent> */}
            <ZoneTest></ZoneTest>
            <img src={test}></img>
        </div>
    )
}