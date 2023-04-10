import { useDispatch } from "react-redux"
import { thunkDeleteTrackPlaylist } from "../../store/playlist";
import "./DeletePlaylistTrackButton.css";

const DeletePlaylistTrackButton = ({ playlistId, track }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(thunkDeleteTrackPlaylist(playlistId, track))
    }

    return (
        <div>
            <div className="delete-pt-button">
                <i onClick={handleDelete} class="fa-solid fa-trash fa-sm"></i>
            </div>
        </div>
    )
}

export default DeletePlaylistTrackButton;