import { useDispatch } from "react-redux";
import { thunkDeleteComment } from "../../../store/comment";
import "./DeleteComment.css";

const DeleteComment = ({ comment }) => {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteComment(comment.id));
    };

    return (
        <div className="delete-comment-btn">
            <i class="fa-solid fa-trash-can" onClick={handleDelete}></i>
        </div>
    )
}

export default DeleteComment;