import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCurrUserTracks } from "../../store/track";
import ProfileTrack from "./ProfileTrack";
import "./ProfilePage.css";


const ProfilePage = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const tracks = Object.values(useSelector(state => state.tracks.allTracks)).filter(track => track.userId === user.id);
    // const validTracks = tracks.filter(track => track.userId === user.id);
    console.log("TRACKS ==>", tracks);

    const numTracks = (tracks) => {
        let count = 0;
        tracks.forEach(track => {
            count += 1;
        });
        return count;
    };

    useEffect(() => {
        dispatch(thunkLoadCurrUserTracks(tracks));
    }, [dispatch]);

    return (
        <div className="profilepage-container">
            <div className="profile-header">
                <div className="profile-image">
                    <i className="fa-solid fa-circle-user fa-2xl"></i>
                </div>
                <br />
                <div className="profile-username">
                    <h3>{user.username}</h3>
                </div>
                <br />
                <div className="num-tracks-display">
                    {numTracks(tracks)} tracks
                </div>
            </div>
            <div>
                {tracks.map(track => <ProfileTrack track={track} />)}
            </div>
        </div>
    )
}

export default ProfilePage;