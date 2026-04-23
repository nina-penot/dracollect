import GrowingParent from "../components/GrowingElement/GrowingParent";
import { default as test } from "../assets/images/newtest.svg";

export default function Home() {
    return (

        <div>
            <div>Welcome home</div>
            <GrowingParent></GrowingParent>
            <img src={test}></img>
        </div>
    )
}