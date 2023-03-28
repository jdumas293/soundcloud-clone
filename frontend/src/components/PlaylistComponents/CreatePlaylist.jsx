import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetPlaylists, thunkCreatePlaylist } from "../../store/playlist";
import './CreatePlaylist.css';

const CreatePlaylist = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleCreate = async (e) => {
        e.preventDefault();
        setErrors([]);

        const playlist = {
            name,
            description
        };

        await dispatch(thunkCreatePlaylist(playlist))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )
        
        dispatch(thunkGetPlaylists());
    }

    return (
        <>
            <form className="create-playlist-form" onSubmit={handleCreate}>
                <div className="create-playlist-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div className="create-playlist-form-container">
                    <div className="create-playlist-name">
                        <input
                            type="text"
                            placeholder="Your playlist name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="create-playlist-description">
                        <textarea
                            placeholder="Your description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button onSubmit={handleCreate}>Create</button>
                </div>
            </form>
        </>
    )
}

export default CreatePlaylist;