import DeleteComment from "./DeleteComment/DeleteComment";
import EditComment from "./EditComment/EditComment";
import OpenModalButton from "../OpenModalButton";
import "./CommentCard.css";
import { useSelector } from "react-redux";

const CommentCard = ({ comment }) => {

    const userId = useSelector(state => state.session.user.id)

    const showDelete = () => {
        if (comment.userId === userId) {
            return <DeleteComment comment={comment} />
        };
    };

    const showEdit = () => {
        if (comment.userId === userId) {
            return <OpenModalButton
                        buttonText={<i class="fa-solid fa-pen"></i>}
                        modalComponent={<EditComment comment={comment} />}
                    />
        };
    };

    return (
        <>
            <div className="comments-container">
                <div className="comment-info-container">
                    <div>
                        {comment.createdAt}
                    </div>
                    <div>
                        {comment.commentBody}
                    </div>
                </div>
                <div className="comment-btns-container">
                    <div>
                        {/* <DeleteComment comment={comment} /> */}
                        {showDelete()}
                    </div>
                    <div className="edit-comment-btn-container">
                        {/* <OpenModalButton
                            buttonText={<i class="fa-solid fa-pen"></i>}
                            modalComponent={<EditComment comment={comment} />}
                        /> */}
                        {showEdit()}
                    </div>
                </div>
            </div>
        </>

    );
};

export default CommentCard;