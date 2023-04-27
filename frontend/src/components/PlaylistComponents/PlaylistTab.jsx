import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetPlaylists, thunkGetSinglePlaylist } from "../../store/playlist";
import PlaylistCard from "./PlaylistCard";
import CreatePlaylist from "./CreatePlaylist";
import OpenModalButton from "../OpenModalButton";
import './PlaylistTab.css';

const PlaylistTab = () => {
    const dispatch = useDispatch();
    const playlists = Object.values(useSelector(state => state?.playlists?.allPlaylists));

    useEffect(() => {
        dispatch(thunkGetPlaylists())
    }, [dispatch]);

    return (
        <div className="playlist-tab-container">
            <div className="create-playlist-btn-container">
                    <OpenModalButton
                        buttonText="New Playlist"
                        modalComponent={<CreatePlaylist />}
                    />
            </div>
            <div className="playlist-card-container">
                {playlists.map(playlist => <PlaylistCard playlist={playlist} key={playlist.id} />)}
            </div>
        </div>
    )
};

export default PlaylistTab;