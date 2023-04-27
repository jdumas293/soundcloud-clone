import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeleteTrack } from "../../store/track";
import OpenModalButton from "../OpenModalButton";
import EditTrack from "../TrackComponents/EditTrack/EditTrack";
import SelectTrackButton from "../TrackComponents/AudioPlayerV2/SelectTrackButton";
import { yearMonthDay } from "../../store/utils";
import "./ProfilePage.css";

const ProfileTrack = ({ track }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showSelectButton, setShowSelectButton] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        
        dispatch(thunkDeleteTrack(track.id));
        history.push('/');
    };

    const handleClick = () => {
        history.push(`/tracks/${track.id}`)
    };

    const handleMouseEnter = () => {
        setShowSelectButton(true);
    };

    const handleMouseLeave = () => {
        setShowSelectButton(false);
    };

    return (
        <div className="profiletrack-container">
            <div className="profiletrack-info-container">
                <div className="profiletrack-title" onClick={handleClick}>
                    {track.title}
                </div>
                <div className="profile-track-description">
                    {track.description}
                </div>
                <div className="profile-track-date">
                    Posted on: {yearMonthDay(track.createdAt)}
                </div>
                <div className="profiletrack-btns-container">
                    <OpenModalButton 
                        buttonText="EDIT"
                        modalComponent={<EditTrack track={track} />}
                    />
                    <button onClick={handleDelete} className="delete-track-btn">DELETE</button>
                </div>
            </div>
            <div 
                className="profiletrack-img-container" 
                // onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={track.imageUrl} />
                {showSelectButton && <SelectTrackButton track={track} />}
            </div>
        </div>
    )
}

export default ProfileTrack;