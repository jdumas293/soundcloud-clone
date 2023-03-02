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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newComment = {
            commentBody
        };

        await dispatch(thunkCreateComment(newComment, track.id, user))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
            setCommentBody('');
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
                <div className="create-comment-form-container">
                    <div className="commentbody-container">
                        <input
                            type="text" 
                            name="create-comment"
                            placeholder="Write a comment"
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