import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCurrUserTracks } from "../../store/track";
import { useHistory } from "react-router-dom";
import ProfileTrack from "./ProfileTrack";
import FavoritesTab from "../Likes/FavoritesTab";
import "./ProfilePage.css";
import PlaylistTab from "../PlaylistComponents/PlaylistTab";

const ProfilePage = ({ tabOverride }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const tracks = Object.values(useSelector(state => state.tracks.allTracks)).filter(track => track.userId === user.id);
    // console.log("TRACKS ==>", tracks);

    const [ selectedTab, setSelectedTab ] = useState(tabOverride ? tabOverride : 'ProfilePage');

    const numTracks = (tracks) => {
        let count = 0;
        tracks.forEach(track => {
            count += 1;
        });
        return count;
    };

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    useEffect(() => {

        if (selectedTab === 'ProfileTrack') {
            history.push(`/profile`)
        }

        if (selectedTab === 'FavoritesTab') {
            history.push(`/favorites/${user.id}`)
        }

        if (selectedTab === 'PlaylistTab') {
            history.push(`/playlists/${user.id}`)
        }

        dispatch(thunkLoadCurrUserTracks(tracks));

    }, [dispatch, user, selectedTab, history, tracks]);

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
            <div className="profile-tab-container">
                <div 
                    className={`profile-tracks-tab ${selectedTab === 'ProfileTrack' ? 'selected' : ''}`}
                    onClick={() => handleTabClick('ProfileTrack')}
                    >
                    Your Tracks
                </div>
                <div
                    className={`profile-favorites-tab ${selectedTab === 'FavoritesTab' ? 'selected' : ''}`}
                    onClick={() => handleTabClick('FavoritesTab')}
                >
                    Your Likes
                </div>
                <div
                    className={`profile-favorites-tab ${selectedTab === 'PlaylistTab' ? 'selected' : ''}`}
                    onClick={() => handleTabClick('PlaylistTab')}
                >
                    Your Playlists
                </div>
            </div>
            <div>
                {selectedTab === 'ProfileTrack' && tracks.map(track => <ProfileTrack track={track} />)}
                {selectedTab === 'FavoritesTab' && <FavoritesTab />}
                {selectedTab === 'PlaylistTab' && <PlaylistTab />}
            </div>
        </div>
    )
}

export default ProfilePage;