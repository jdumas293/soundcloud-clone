import "./CommentCard.css";
import DeleteComment from "./DeleteComment/DeleteComment";

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