import { csrfFetch } from './csrf';

const LOAD_TRACKS = 'tracks/loadTracks';
const LOAD_CURR_USER_TRACKS = 'tracks/loadCurrUserTracks';
const LOAD_SINGLE_TRACK = 'tracks/loadSingleTrack';
const UPLOAD_TRACK = 'tracks/uploadTrack';
const EDIT_TRACK = 'tracks/editTrack';
const DELETE_TRACK = 'tracks/deleteTrack';

// ACTION CREATORS
export const actionLoadTracks = (tracks) => {
    return {
        type: LOAD_TRACKS,
        payload: tracks
    };
};

export const actionLoadCurrUserTracks = (tracks) => {
    return {
        type: LOAD_CURR_USER_TRACKS,
        payload: tracks
    };
};

export const actionLoadSingleTrack = (track) => {
    return {
        type: LOAD_SINGLE_TRACK,
        payload: track
    };
};

export const actionUploadTrack = (track) => {
    return {
        type: UPLOAD_TRACK,
        payload: track
    };
};

export const actionEditTrack = (track) => {
    return {
        type: EDIT_TRACK,
        payload: track
    };
};

export const actionDeleteTrack = (trackId) => {
    return {
        type: DELETE_TRACK,
        payload: trackId
    };
};

// THUNK ACTION CREATORS
export const thunkLoadTracks = () => async (dispatch) => {
    const res = await csrfFetch('/api/tracks');

    if (res.ok) {
        const tracks = await res.json();
        dispatch(actionLoadTracks(tracks.Tracks));
        return tracks;
    };
};

export const thunkLoadCurrUserTracks = () => async (dispatch) => {
    const res = await csrfFetch('/api/tracks/current');

    if (res.ok) {
        const tracks = await res.json();
        dispatch(actionLoadCurrUserTracks(tracks));
        return tracks;
    };
};

export const thunkLoadSingleTrack = (trackId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tracks/${trackId}`);

    if (res.ok) {
        const track = await res.json();
        dispatch(actionLoadSingleTrack(track));
        return track;
    };
};

export const thunkUploadTrack = (track) => async (dispatch) => {
    const { title, file, genre, description, imageUrl } = track;
    const formData = new FormData();

    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);

    if (file) {
        formData.append("file", file);
    };

    const res = await csrfFetch('api/tracks', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    });

    if (res.ok) {
        const track = await res.json();
        dispatch(actionUploadTrack(track));
        return track;
    };
};

export const thunkEditTrack = (track) => async (dispatch) => {
    const { title, file, genre, description, imageUrl } = track;
    const formData = new FormData();

    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);

    if (file) {
        formData.append("file", file);
    };

    const res = await csrfFetch(`/api/tracks/${track.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    });

    if (res.ok) {
        const track = await res.json();
        dispatch(actionEditTrack(track));
        return track;
    };
};

export const thunkDeleteTrack = (trackId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tracks/${trackId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const track = await res.json();
        dispatch(actionDeleteTrack(trackId));
        return track;
    };
};

// REDUCER
const initialState = { allTracks: {}, singleTrack: {} };

const tracksReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_TRACKS: {
            newState = { allTracks: {}, singleTrack: {} };
            action.payload.forEach(track => {
                newState.allTracks[track.id] = track;
            });
            return newState;
        }
        // case LOAD_CURR_USER_TRACKS: {
        //     newState = { allTracks: {}, singleTrack: {} };
        //     action.payload.forEach(track => {
        //         newState.allTracks[track.id] = track;
        //     });
        //     return newState;
        // }
        case LOAD_SINGLE_TRACK: {
            newState = { allTracks: {}, singleTrack: {...action.payload} };
            return newState;
        }
        case UPLOAD_TRACK: {
            newState = { ...state, allTracks: {...state.allTracks}, singleTrack: {...state.singleTrack} };
            newState.singleTrack = action.payload;
            return newState;
        }
        case EDIT_TRACK: {
            newState = { ...state, allTracks: {...state.allTracks}, singleTrack: {...state.singleTrack} };
            newState.singleTrack = {...state.singleTrack, ...action.payload};
            return newState;
        }
        case DELETE_TRACK: {
            newState = { ...state, allTracks: {...state.allTracks}, singleTrack: {} };
            delete newState.allTracks[action.payload];
            return newState;
        }
        default:
            return state;
    }
}

export default tracksReducer;