import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateLike, thunkDeleteLike, thunkGetLikes } from '../../store/like';
import "./LikeButton.css";

const LikeButton = ({ trackId }) => {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState();
    const likes = Object.values(useSelector(state => state?.likes?.allLikes));
    const user = useSelector(state => state.session.user);

    const handleClick = async (e) => {
        e.preventDefault();
        
        if (isLiked) {
            await dispatch(thunkDeleteLike(likeId))
            .then(setIsLiked(false))
        } else {
            await dispatch(thunkCreateLike(trackId))
            .then(setIsLiked(true))
            .then(likes.forEach(like => {
                if (like.trackId === Number(trackId) && like.userId === user.id) {
                    setLikeId(like.id);
                }
            }))
        }
    };

    useEffect(() => {
        if (likes) {
            likes.forEach(like => {
                if (like.trackId === Number(trackId) && like.userId === user.id) {
                    setIsLiked(true);
                    setLikeId(like.id);
                }
            });
        }
    }, []);

    useEffect(() => {
        dispatch(thunkGetLikes());
    }, [dispatch]);

    return (
        <div className="like-button-heart" onClick={handleClick}>
            {isLiked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
        </div>
    )
}

export default LikeButton;