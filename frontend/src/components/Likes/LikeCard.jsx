import { useHistory } from 'react-router-dom';
import SelectTrackButton from "../TrackComponents/AudioPlayerV2/SelectTrackButton";
import './LikeCard.css';

const LikeCard = ({ like }) => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/tracks/${like.Track.id}`);
    };

    return (
        <div className="profile-likes-container">
            <div className="profile-likes-img-container" onClick={handleClick}>
                <img src={like.Track.imageUrl} alt="track-image" />
            </div>
            <div className="profile-likes-info">
                <div className='profile-likes-title'>
                    {like.Track.title}
                </div>
                <SelectTrackButton track={like.Track} />
            </div>
            <div className='profile-likes-artist'>
                {like.Track.artist}
            </div>
        </div>
    )
}

export default LikeCard;