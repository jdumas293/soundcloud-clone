import { useDispatch } from "react-redux";
import { thunkDeletePlaylist } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import AddPlaylistTrack from "./AddPlaylistTrack";
import PlaylistTrackCard from "./PlaylistTrackCard";
import './PlaylistCard.css';

const PlaylistCard = ({ playlist }) => {
    const dispatch = useDispatch();

    const deletePlaylist = (e) => {
        e.preventDefault();
        dispatch(thunkDeletePlaylist(playlist?.id))
    };

    return (
            <div className="playlist-info-container">
                <div className="playlist-info">
                    <div>
                        <div className="playlist-name">
                            {playlist.name}
                        </div>
                        <div className="playlist-description">
                            {playlist.description}
                        </div>
                    </div>
                    <div className="delete-playlist-button">
                        <i class="fa-solid fa-trash" onClick={deletePlaylist}></i>
                    </div>
                </div>


                <div className="playlist-track-container">
                    {playlist?.PlaylistTracks.map(pt => <PlaylistTrackCard track={pt.Track} playlist={playlist} /> )}
                    <div className="add-playlist-track-button">
                        <OpenModalButton 
                            buttonText={<i class="fa-solid fa-plus fa-xl"></i>}
                            modalComponent={<AddPlaylistTrack playlist={playlist} />}
                        />
                    </div>
                </div>
            </div>
    );
};

export default PlaylistCard;