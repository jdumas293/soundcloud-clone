import AudioPlayer from "../AudioPlayer/AudioPlayer";
import "./HomePage.css";

const TrackCard = ({ track }) => {
    return (
        <>
            <div className="trackdetails-container">
                <div className="track-image">
                    <img src={track.imageUrl}></img>
                </div>
                <button className="button" onClick={() => console.log("CLICKED")}>
                    PLAY ME!
                </button>
                {/* <div id="track-audiofile">
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