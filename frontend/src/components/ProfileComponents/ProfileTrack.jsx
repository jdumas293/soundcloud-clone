import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeleteTrack } from "../../store/track";
import OpenModalButton from "../OpenModalButton";
import EditTrack from "../TrackComponents/EditTrack/EditTrack";
import SelectTrackButton from "../TrackComponents/AudioPlayerV2/SelectTrackButton";
import "./ProfilePage.css";

const ProfileTrack = ({ track }) => {
    const dispatch = useDispatch();
    const history = useHistory();


    const handleDelete = (e) => {
        e.preventDefault();
        
        dispatch(thunkDeleteTrack(track.id));
        history.push('/');
    };

    const handleClick = () => {
        history.push(`/tracks/${track.id}`)
    };

    return (
        <div className="profiletrack-container">
            <div className="profiletrack-info-container">
                <div className="profiletrack-title" onClick={handleClick}>
                    {track.title}
                </div>
                <div className="profiletrack-description">
                    {track.description}
                    <SelectTrackButton track={track} />
                </div>
                <div className="profiletrack-btns-container">
                    <OpenModalButton 
                        buttonText="EDIT"
                        modalComponent={<EditTrack track={track} />}
                    />
                    <button onClick={handleDelete} className="delete-track-btn">DELETE</button>
                </div>
            </div>
            <div className="profiletrack-img-container" onClick={handleClick}>
                <img src={track.imageUrl} />
            </div>
        </div>
    )
}

export default ProfileTrack;