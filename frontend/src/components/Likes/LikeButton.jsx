import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateLike, thunkDeleteLike, thunkGetLikes, thunkGetSingleLike } from '../../store/like';

const LikeButton = ({ trackId }) => {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const likes = useSelector(state => state?.likes?.allLikes);
    console.log("TRACK ID", trackId);
    console.log("LIKES", likes);

    const handleClick = async (e) => {
        e.preventDefault();
        
        if (isLiked) {
            await dispatch(thunkDeleteLike())
            .then(setIsLiked(false))
        } else {
            await dispatch(thunkCreateLike(trackId))
            .then(setIsLiked(true))
        }
        
        // console.log("LIKED", liked);
    };

    useEffect(() => {
        dispatch(thunkGetLikes());
    }, [dispatch]);

    return (
        <div onClick={handleClick}>
            {isLiked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
        </div>
    )
}

export default LikeButton;