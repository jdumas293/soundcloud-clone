import { useHistory } from "react-router-dom";
import AudioControls from "../AudioPlayer/AudioControls";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import "./HomePage.css";

const TrackCard = ({ track }) => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/tracks/${track.id}`);
    }

    return (
        <>
            <div className="trackdetails-container" onClick={handleClick}>
                <div className="track-image">
                    <img src={track.imageUrl}></img>
                </div>
                {/* <button className="button" onClick={() => console.log("CLICKED")}>
                    PLAY ME!
                </button>
                <div id="track-audiofile">
                    <AudioPlayer track={track} />
                    <audio src={track.file}></audio>
                </div> */}
                <div className="track-info">
                    <div className="track-title">
                        {track.title}
                    </div>
                    <div className="track-genre">
                        {track.genre}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackCard;