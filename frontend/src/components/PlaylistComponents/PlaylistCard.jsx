import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { thunkDeletePlaylist, thunkGetPlaylists, thunkGetSinglePlaylist } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import AddPlaylistTrack from "./AddPlaylistTrack";
import DeletePlaylistTrackButton from "./DeletePlaylistTrackButton";
import './PlaylistCard.css';

const PlaylistCard = ({ playlist }) => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const deletePlaylist = (e) => {
        e.preventDefault();
        dispatch(thunkDeletePlaylist(playlist?.id))
    };

    // console.log("PLAYLIST!!!", playlist)

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
                        <div className="delete-playlist-button" onClick={deletePlaylist}>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
                <div className="playlist-description">
                    {playlist.description}
                </div>
                <div>
                    {playlist.PlaylistTracks ? playlist?.PlaylistTracks.map(pt =>
                        <div className="playlist-track-container">
                            <div>
                                {pt.Track.title}
                            </div>
                            <div className="delete-pt-button-pl-track-image">
                                <div className="playlist-track-image">
                                    <img src={pt.Track.imageUrl} />   
                                </div>
                                <div>
                                    <DeletePlaylistTrackButton playlistId={playlist.id} track={pt.Track} />
                                </div>
                            </div>
                        </div>
                    ) : <div>Add tracks to your new playlist!</div>}
                </div>
            </div>
        </div>
    );
};

export default PlaylistCard;