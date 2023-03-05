import { useHistory } from "react-router-dom";
import "./HomePage.css";

const TrackCard = ({ track }) => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/tracks/${track.id}`);
    };

    return (
        <>
            <div className="trackdetails-container" onClick={handleClick}>
                <div className="track-image">
                    <img src={track.imageUrl}></img>
                </div>
                <div className="track-info">
                    <div className="track-title">
                        {track.title}
                    </div>
                    <div className="track-genre">
                        Genre: {track.genre}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackCard;