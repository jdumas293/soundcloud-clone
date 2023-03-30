import { useDispatch } from "react-redux"
import { thunkCreateTrackPlaylist, thunkGetPlaylists } from "../../store/playlist";
import "./AddPlaylistTrackButton.css";

const AddPlaylistTrackButton = ({ track, playlistId }) => {
    const dispatch = useDispatch();

    // console.log("TRACK", track);
    // console.log("PLAYLIST ID", playlistId);

    const handleAdd = async () => {
        await dispatch(thunkCreateTrackPlaylist(track, playlistId))
    }
    
    return (
        <div>
            <div className="add-track-pl-button">
                <i onClick={handleAdd} class="fa-solid fa-plus"></i>
            </div>
        </div>
    )
}

export default AddPlaylistTrackButton;