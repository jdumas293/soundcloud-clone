import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkLoadComments } from "../../../store/comment";
import { thunkLoadSingleTrack, thunkLoadTracks } from "../../../store/track";
import CommentCard from "../../CommentComponents/CommentCard";
import CreateComment from "../../CommentComponents/CreateComment/CreateComment";
import "./SingleTrackPage.css"

const SingleTrackPage = () => {
    const dispatch = useDispatch();
    const { trackId } = useParams();

    const track = useSelector(state => state.tracks.singleTrack);
    const comments = Object.values(useSelector(state => state.comments.allComments));
    // console.log("TRACK ===>", track);
    // console.log("COMMENTS ===>", comments);

    const numComments = (comments) => {
        let count = 0;
        comments.forEach(comment => {
            count += 1;
        });
        return count;
    };

    useEffect(() => {
        dispatch(thunkLoadSingleTrack(trackId));
        // dispatch(thunkLoadTracks());
    }, [dispatch, trackId]);

    useEffect(() => {
        dispatch(thunkLoadComments(trackId))
    }, [dispatch, trackId]);


    return (
        <>
            <div className="singletrack-container">
                <div className="singletrack-info-container">
                    <div className="singletrack-title">
                        <h1>{track.title}</h1>
                    </div>
                    <div className="singletrack-description">
                        {track.description}
                    </div>
                    <div className="singletrack-genre">
                        Genre: {track.genre}
                    </div>
                </div>
                <div className="singletrack-img-container">
                    <img src={track.imageUrl} alt="" />
                </div>
            </div>
            <div className="singletrack-comments-container">
                <div className="create-comment-btn">
                    <CreateComment />
                </div>
                <div className="num-comments-display">
                    {numComments(comments)} comments
                </div>
                {comments.map(comment => <CommentCard comment={comment} key={comment.id} />)}
            </div>
        </>
    )
}

export default SingleTrackPage;