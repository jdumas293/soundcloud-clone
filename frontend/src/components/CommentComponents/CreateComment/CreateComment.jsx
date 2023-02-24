import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkCreateComment } from "../../../store/comment";
import "./CreateComment.css";

const CreateComment = () => {
    const dispatch = useDispatch();
    const [commentBody, setCommentBody] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user);
    const track = useSelector(state => state.tracks.singleTrack);
    // console.log(track);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const newComment = {
            commentBody
        };

        dispatch(thunkCreateComment(newComment, track.id, user))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <>
            <form
                className="createcomment-form"
                onSubmit={handleSubmit}
            >
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="createcomment-form-container">
                    <div className="commentbody-container">
                        <textarea 
                            name="create-comment"
                            placeholder="Your comment here"
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                            required
                        />
                    </div>
                    <button onSubmit={handleSubmit}>Create</button>
                </div>
            </form>
        </>
    )
}

export default CreateComment;