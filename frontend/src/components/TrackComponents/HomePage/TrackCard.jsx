import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SelectTrackButton from "../AudioPlayerV2/SelectTrackButton";
import LikeButton from "../../Likes/LikeButton";
import "./HomePage.css";


const TrackCard = ({ track }) => {
    const history = useHistory();
    const [showSelectButton, setShowSelectButton] = useState(false);

    const handleClick = () => {
        history.push(`/tracks/${track.id}`);
    };

    const handleMouseEnter = () => {
        setShowSelectButton(true);
    };

    const handleMouseLeave = () => {
        setShowSelectButton(false);
    };

    return (
        <>
            <div className="trackdetails-container">
                <div 
                    className="track-image"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img onClick={handleClick} src={track.imageUrl}></img>
                    {showSelectButton && <SelectTrackButton track={track} />}
                </div>
                <div className="track-info">
                    <div onClick={handleClick}>
                        <div className="track-title">
                            {track.title}
                        </div>
                        <div>
                            {track.artist}
                        </div>
                    </div>
                    <div>
                        <LikeButton trackId={track.id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackCard;