import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkEditComment } from "../../../store/comment";
import "./EditComment.css";

const EditComment = ({ comment }) => {
    const dispatch = useDispatch();
    const [commentBody, setCommentBody] = useState(comment.commentBody);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const editedComment = {
            ...comment,
            commentBody
        };

        dispatch(thunkEditComment(editedComment))
            .then(closeModal)
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <form onSubmit={handleSubmit} className="edit-comment-form">
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="input-container">
                {/* <input
                    type="text"
                    name="edit-comment"
                    placeholder="Edit your comment"
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    required
                /> */}
                <textarea
                    placeholder="Edit your comment"
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    required
                />
            </div>
            <div className="actual-edit-comment-btn-container">
                <button className="edit-comment-btn" onSubmit={handleSubmit}>Edit</button>
            </div>
        </form>
    )   
}

export default EditComment;