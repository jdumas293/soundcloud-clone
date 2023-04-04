import { AudioPlayerContext } from "../../../context/AudioPlayerContext";
import { useContext } from "react";

const SelectTrackButton = ({ track }) => {
    const [currentTrack, setCurrentTrack] = useContext(AudioPlayerContext);

    const handleClick = () => {
        setCurrentTrack(track);
        console.log("TRACK SET", track)
        console.log("CURRENT TRACK SET", currentTrack);
    }

    // console.log("CURRENT TRACK", currentTrack)
    // console.log("TRACKKKK", track);

    return (
        <div>
            <div>
                <i onClick={handleClick} class="fa-solid fa-play"></i>
            </div>
        </div>
    )
}

export default SelectTrackButton;