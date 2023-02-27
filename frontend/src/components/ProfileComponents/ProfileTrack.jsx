import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeleteTrack } from "../../store/track";
import OpenModalButton from "../OpenModalButton";
import EditTrack from "../TrackComponents/EditTrack/EditTrack";
import "./ProfilePage.css";

const ProfileTrack = ({ track }) => {
    const dispatch = useDispatch();
    const history = useHistory();


    const handleDelete = (e) => {
        e.preventDefault();
        
        dispatch(thunkDeleteTrack(track.id));
        history.push('/');
    };

    return (
        <div className="profiletrack-container">
            <div className="profiletrack-info-container">
                <div className="profiletrack-title">
                    {track.title}
                </div>
                <div className="profiletrack-description">
                    {track.description}
                </div>
                <div className="profiletrack-btns-container">
                    {/* <button className="edit-track-btn">EDIT</button> */}
                    <OpenModalButton 
                        buttonText="EDIT"
                        modalComponent={<EditTrack track={track} />}
                    />
                    <button onClick={handleDelete} className="delete-track-btn">DELETE</button>
                </div>
            </div>
            <div className="profiletrack-img-container">
                <img src={track.imageUrl} />
            </div>
        </div>
    )
}

export default ProfileTrack;