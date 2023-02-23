import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { thunkLoadCurrUserTracks } from "../../store/track";
import "./ProfilePage.css";


const ProfilePage = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    // const tracks = Object.values(useSelector(state => state.tracks.allTracks));
    // console.log("TRACKS ==>", tracks);

    // useEffect(() => {
    //     dispatch(thunkLoadCurrUserTracks());
    // }, [dispatch]);

    return (
        <div>
            <div className="profilepage-container">
                {user.username}
            </div>
        </div>
    )
}

export default ProfilePage;