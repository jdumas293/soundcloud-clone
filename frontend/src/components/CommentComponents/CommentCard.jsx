import DeleteComment from "./DeleteComment/DeleteComment";
import "./CommentCard.css";

const CommentCard = ({ comment }) => {
    return (
        <>
            <div className="comments-container">
                <div>
                    {comment.createdAt}
                </div>
                <div>
                    {comment.commentBody}
                </div>
                <div>
                    <DeleteComment comment={comment} />
                </div>
            </div>
        </>

    );
};

export default CommentCard;