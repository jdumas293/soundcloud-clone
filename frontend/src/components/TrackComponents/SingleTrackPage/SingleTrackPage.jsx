import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkLoadComments } from "../../../store/comment";
import { thunkLoadSingleTrack } from "../../../store/track";
import CommentCard from "../../CommentComponents/CommentCard";
import CreateComment from "../../CommentComponents/CreateComment/CreateComment";
import LikeButton from "../../Likes/LikeButton";
import SelectTrackButton from "../AudioPlayerV2/SelectTrackButton";
import Waveform from "../AudioPlayerV2/Waveform";
import "./SingleTrackPage.css"

const SingleTrackPage = () => {
    const dispatch = useDispatch();
    const { trackId } = useParams();
    const track = useSelector(state => state?.tracks?.singleTrack);
    const comments = Object.values(useSelector(state => state?.comments?.allComments));

    const numComments = (comments) => {
        let count = 0;
        comments.forEach(comment => {
            count += 1;
        });
        if (count === 1) {
            return `${count} comment`;
        }
        else return `${count} comments`;
    };

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
                        <LikeButton trackId={trackId} />
                        <SelectTrackButton track={track} />
                    </div>
                    {/* <div>
                        <Waveform track={track} />
                    </div> */}
                    <div className="singletrack-description">
                        {track.description}
                    </div>
                    <div>
                        {track.artist}
                    </div>
                    <div className="singletrack-genre">
                        {track.genre}
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
                    {numComments(comments)}
                </div>
                {/* <div id="waveform" ref={audioRef}></div> */}
                {comments.map(comment => <CommentCard comment={comment} key={comment.id} />)}
            </div>
        </>
    )
}

export default SingleTrackPage;