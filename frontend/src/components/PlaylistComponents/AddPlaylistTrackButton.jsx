import { useDispatch } from "react-redux"
import { thunkCreateTrackPlaylist } from "../../store/playlist";
import { useModal } from "../../context/Modal";
import "./AddPlaylistTrackButton.css";

const AddPlaylistTrackButton = ({ track, playlistId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleAdd = async () => {
        await dispatch(thunkCreateTrackPlaylist(track, playlistId))
        .then(closeModal)
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