import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LikeButton from "../Likes/LikeButton";
import SelectTrackButton from "../TrackComponents/AudioPlayerV2/SelectTrackButton";
import './LikeCard.css';

const LikeCard = ({ like }) => {
    const history = useHistory();
    const [showSelectButton, setShowSelectButton] = useState(false);

    const handleClick = () => {
        history.push(`/tracks/${like.Track.id}`);
    };

    const handleMouseEnter = () => {
        setShowSelectButton(true);
    };

    const handleMouseLeave = () => {
        setShowSelectButton(false);
    };

    return (
        <div className="profile-likes-container">
            <div 
                className="profile-likes-img-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img onClick={handleClick} src={like.Track.imageUrl} alt="track-image" />
                {showSelectButton && <SelectTrackButton track={like.Track} />}
            </div>
            <div className="profile-likes-info" onClick={handleClick}>
                <div className='profile-likes-title'>
                    {like.Track.title}
                    <LikeButton trackId={like.Track.id} />
                </div>
                {/* <SelectTrackButton track={like.Track} /> */}
                <div className='profile-likes-artist'>
                    {like.Track.artist}
                </div>
            </div>
        </div>
    )
}

export default LikeCard;