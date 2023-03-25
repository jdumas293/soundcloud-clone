import { useHistory } from 'react-router-dom';
import './LikeCard.css';

const LikeCard = ({ like }) => {
    const history = useHistory();

    // console.log("LIKE", like);

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     history.push(`/tracks/${trackId}`);
    // };

    return (
        <div className="profile-likes-container">
            <div className="profile-likes-img-container">
                <img src={like.Track.imageUrl} alt="track-image" />
            </div>
            <div className="profile-likes-info">
                <div className='profile-likes-title'>
                    {like.Track.title}
                </div>
            </div>
        </div>
    )
}

export default LikeCard;