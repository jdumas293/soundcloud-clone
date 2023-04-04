import { useHistory } from "react-router-dom";
import SelectTrackButton from "../AudioPlayerV2/SelectTrackButton";
import LikeButton from "../../Likes/LikeButton";
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
                        {/* <div className="track-genre">
                            Genre: {track.genre}
                        </div> */}
                    </div>
                    <div className="home-like-play">
                        <SelectTrackButton />
                        <LikeButton trackId={track?.id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackCard;