import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comments/loadComments';
const CREATE_COMMENT = 'comments/createComment';
const EDIT_COMMENT = 'comments/editComment';
const DELETE_COMMENT = 'comments/deleteComment';

// ACTION CREATORS
export const actionLoadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        payload: comments
    };
};

export const actionCreateComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        payload: comment
    };
};

export const actionEditComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        payload: comment
    };
};

export const actionDeleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: commentId
    };
};

// THUNK ACTION CREATORS
export const thunkLoadComments = (trackId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tracks/${trackId}/comments`);

    if (res.ok) {
        const comments = await res.json();
        dispatch(actionLoadComments(comments.Comments));
        return comments;
    };
};

export const thunkCreateComment = (comment, trackId, user) => async (dispatch) => {
    const res = await csrfFetch(`/api/tracks/${trackId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const comment = await res.json();
        comment.User = user;
        dispatch(actionCreateComment(comment));
        return comment;
    };
};

export const thunkEditComment = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(actionEditComment(comment));
        return comment;
    };
};

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(actionDeleteComment(commentId));
    };
};

// REDUCER
const initialState = { allComments: {} };

const commentsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_COMMENTS: {
            newState = {allComments: {}};
            action.payload.forEach(comment => {
                newState.allComments[comment.id] = comment;
            });
            return newState;
        };
        case CREATE_COMMENT: {
            newState = { ...state, allComments: {...state.allComments} };
            newState.allComments[action.payload.id] = action.payload;
            return newState;
        };
        case EDIT_COMMENT: {
            newState = { ...state, allComments: {...state.allComments} };
            newState.allComments[action.payload.id] = {...action.payload};
            return newState;
        };
        case DELETE_COMMENT: {
            newState = { ...state, allComments: {...state.allComments} };
            delete newState.allComments[action.payload];
            return newState;
        };
        default:
            return state;
    };
};

export default commentsReducer;