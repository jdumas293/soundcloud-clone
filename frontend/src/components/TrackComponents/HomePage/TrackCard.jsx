import { useHistory } from "react-router-dom";
import SelectTrackButton from "../AudioPlayerV2/SelectTrackButton";
import "./HomePage.css";


const TrackCard = ({ track }) => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/tracks/${track.id}`);
    };

    return (
        <>
            <div className="trackdetails-container">
                <div className="track-image" onClick={handleClick}>
                    <img src={track.imageUrl}></img>
                </div>
                <div className="track-info">
                    <div>
                        <div className="track-title">
                            {track.title}
                        </div>
                        <div>
                            {track.artist}
                        </div>
                    </div>
                    <div className="home-play">
                        <SelectTrackButton track={track} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackCard;