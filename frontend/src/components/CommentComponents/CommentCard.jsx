import DeleteComment from "./DeleteComment/DeleteComment";
import EditComment from "./EditComment/EditComment";
import OpenModalButton from "../OpenModalButton";
import { useDispatch, useSelector } from "react-redux";
import { yearMonthDay } from "../../store/utils";
import "./CommentCard.css";

const CommentCard = ({ comment }) => {
    const userId = useSelector(state => state.session.user.id);

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
                <div className="profile-image">
                    <i className="fa-solid fa-circle-user fa-2xl"></i>
                </div>
                <div className="comment-info-container">
                    {/* <div>
                        {comment?.User?.username}
                    </div> */}
                    <div className="comment-created-at">
                        {yearMonthDay(comment.createdAt)}
                    </div>
                    <div>
                        {comment.commentBody}
                    </div>
                </div>
                <div className="comment-btns-container">
                    <div>
                        {showDelete()}
                    </div>
                    <div className="edit-comment-btn-container">
                        {showEdit()}
                    </div>
                </div>
            </div>
        </>

    );
};

export default CommentCard;