import { AudioPlayerContext } from "../../../context/AudioPlayerContext";
import { useContext } from "react";
import "./SelectTrackButton.css";

const SelectTrackButton = ({ track }) => {
    const [currentTrack, setCurrentTrack] = useContext(AudioPlayerContext);

    const handleClick = () => {
        setCurrentTrack(track);
    }

    return (
        <div>
            <div className="select-track-btn">
                <i onClick={handleClick} class="fa-solid fa-play fa-xl"></i>
            </div>
        </div>
    )
}

export default SelectTrackButton;