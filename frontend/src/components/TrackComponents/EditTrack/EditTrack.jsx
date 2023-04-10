import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkEditTrack } from "../../../store/track";
import "./EditTrack.css";

const EditTrack = ({ track }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(track.title);
    const [file, setFile] = useState(track?.file);
    const [genre, setGenre] = useState(track.genre);
    const [description, setDescription] = useState(track.description);
    const [imageUrl, setImageUrl] = useState(track.imageUrl);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const editedTrack = {
            ...track,
            title,
            file,
            genre,
            description,
            imageUrl
        };

        await dispatch(thunkEditTrack(editedTrack))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
            history.push(`/tracks/${editedTrack.id}`)
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setFile(file);
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="edittrack-form-container">
                <div className="edittrack-file">
                    <input
                        type="file"
                        onChange={updateFile}
                        accept=".mp3,.wav"
                        required
                    />
                </div>
            
                <div className="edittrack-title">
                    <input
                        type="text"
                        placeholder="Your title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="edittrack-genre">
                    <input 
                        type="text"
                        placeholder="Your genre"
                        name="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>
                <div className="edittrack-description">
                    <textarea 
                        placeholder="Your description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="edittrack-trackimage">
                    <input 
                        type="url"
                        name="imageUrl"
                        placeholder="Your track image"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button onSubmit={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default EditTrack;