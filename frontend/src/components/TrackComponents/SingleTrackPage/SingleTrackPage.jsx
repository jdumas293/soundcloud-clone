import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkLoadComments } from "../../../store/comment";
import { thunkLoadSingleTrack } from "../../../store/track";
// import { thunkLoadTracks } from "../../../store/track";
import CommentCard from "../../CommentComponents/CommentCard";
import CreateComment from "../../CommentComponents/CreateComment/CreateComment";
import "./SingleTrackPage.css"

const SingleTrackPage = () => {
    const dispatch = useDispatch();
    const { trackId } = useParams();

    const track = useSelector(state => state.tracks.singleTrack);
    // console.log("TRACK ===>", track);
    const comments = Object.values(useSelector(state => state.comments.allComments));
    // console.log("COMMENTS ===>", comments);

    // useEffect(() => {
    //     dispatch(thunkLoadTracks());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(thunkLoadSingleTrack(trackId));
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
                {comments.map(comment => <CommentCard comment={comment} key={comment.id} />)}
            </div>
        </>
    )
}

export default SingleTrackPage;