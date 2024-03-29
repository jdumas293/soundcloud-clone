import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkLoadTracks, thunkUploadTrack } from "../../../store/track";
import "./UploadTrack.css";

const UploadTrack = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState(null);
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleUpload = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newTrack = {
            title,
            artist,
            file,
            genre,
            description,
            imageUrl
        };

        await dispatch(thunkUploadTrack(newTrack))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )
        
        dispatch(thunkLoadTracks());
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setFile(file);
    };

    return (
        <>
            <form
                className="uploadtrack-form"
                onSubmit={handleUpload}
            >
                <div className="upload-track-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div className="uploadtrack-form-container">
                    <div className="upload-file">
                        <input 
                            type="file"
                            onChange={updateFile}
                            accept=".mp3,.wav"
                            required
                        />
                    </div>
                    <div className="upload-title">
                        <input
                            type="text"
                            placeholder="Your title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-title">
                        <input
                            type="text"
                            placeholder="Your artist"
                            name="artist"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-genre">
                        <input 
                            type="text"
                            placeholder="Your genre"
                            name="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-description">
                        <textarea 
                            placeholder="Your description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-trackimage">
                        <input 
                            type="url"
                            name="imageUrl"
                            placeholder="Your track image"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="upload-track-button">
                        <button onSubmit={handleUpload}>Upload</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default UploadTrack;