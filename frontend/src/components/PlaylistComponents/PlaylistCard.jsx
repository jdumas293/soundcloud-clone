import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkDeletePlaylist, thunkGetSinglePlaylist } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import AddPlaylistTrack from "./AddPlaylistTrack";
import './PlaylistCard.css';

const PlaylistCard = ({ playlist }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const otherPlaylist = useSelector(state => state.playlists.singlePlaylist);
    console.log(otherPlaylist);

    // console.log("PLAYLIST", playlist);

    const deletePlaylist = (e) => {
        e.preventDefault();
        dispatch(thunkDeletePlaylist(playlist?.id))
    };

    useEffect(() => {
        thunkGetSinglePlaylist(playlist.id);
    }, [dispatch]);

    return (
        <div>
            <div className="general-playlist-info-container">
                <div className="playlist-name-delete-container">
                    <div className="playlist-name">
                        {playlist.name}
                    </div>
                    <div className="playlist-plus-trash">
                        <OpenModalButton 
                            buttonText={<i class="fa-solid fa-plus"></i>}
                            modalComponent={<AddPlaylistTrack playlist={playlist} />}
                        />
                        <div onClick={deletePlaylist}>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
                <div className="playlist-description">
                    {playlist.description}
                </div>
            </div>
        </div>
    );
};

export default PlaylistCard;