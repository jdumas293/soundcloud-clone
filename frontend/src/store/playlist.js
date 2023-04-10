import { csrfFetch } from "./csrf";

const GET_PLAYLISTS = 'playlists/getPlaylists';
const GET_SINGLE_PLAYLIST = 'playlists/getSinglePlaylist';
const CREATE_TRACK_PLAYLIST = 'playlists/uploadTrackPlaylist';
const DELETE_TRACK_PLAYLIST = 'playlists/deleteTrackPlaylist';
const CREATE_PLAYLIST = 'playlists/createPlaylist';
const DELETE_PLAYLIST = 'playlists/deletePlaylist';

// ACTION CREATORS
export const actionGetPlaylists = (playlists) => {
    return {
        type: GET_PLAYLISTS,
        payload: playlists
    };
};

export const actionGetSinglePlaylist = (tracks) => {
    return {
        type: GET_SINGLE_PLAYLIST,
        payload: tracks
    };
};

export const actionCreateTrackPlaylist = (track, playlistId) => {
    return {
        type: CREATE_TRACK_PLAYLIST,
        payload: track,
        playlistId
    };
};

export const actionDeleteTrackPlaylist = (track, playlistId) => {
    return {
        type: DELETE_TRACK_PLAYLIST,
        payload: track,
        playlistId
    };
};

export const actionCreatePlaylist = (playlist) => {
    return {
        type: CREATE_PLAYLIST,
        payload: playlist
    };
};

export const actionDeletePlaylist = (playlistId) => {
    return {
        type: DELETE_PLAYLIST,
        payload: playlistId
    };
};

// THUNK ACTION CREATORS
export const thunkGetPlaylists = () => async (dispatch) => {
    const res = await csrfFetch('/api/playlists');

    if (res.ok) {
        const playlists = await res.json();
        dispatch(actionGetPlaylists(playlists.Playlists));
        return playlists;
    };
};

export const thunkGetSinglePlaylist = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}`);

    if (res.ok) {
        const tracks = await res.json();
        dispatch(actionGetSinglePlaylist(tracks));
        return tracks;
    };
};

export const thunkCreateTrackPlaylist = (track, playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tracks/${track.id}/playlists/${playlistId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(track)
    });

    if (res.ok) {
        // debugger
        const playlistTrack = await res.json();
        dispatch(actionCreateTrackPlaylist(playlistTrack, playlistId));
        return playlistTrack;
    } else {
        console.error(`${track.title} was not able to be added.`)
    };
};

export const thunkDeleteTrackPlaylist = (playlistId, track) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/tracks/${track.id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(actionDeleteTrackPlaylist(track, playlistId))
    };
};

export const thunkCreatePlaylist = (playlist) => async (dispatch) => {
    const res = await csrfFetch('/api/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
    });

    if (res.ok) {
        const playlist = await res.json();
        dispatch(actionCreatePlaylist(playlist));
        return playlist;
    };
};

export const thunkDeletePlaylist = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(actionDeletePlaylist(playlistId));
    };
};

// REDUCER
const initialState = { allPlaylists: {}, singlePlaylist: {} };

const playlistsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_PLAYLISTS: {
            newState = { allPlaylists: {}, singlePlaylist: {} };
            action.payload.forEach(playlist => {
                newState.allPlaylists[playlist.id] = playlist;
            });
            return newState;
        }
        case GET_SINGLE_PLAYLIST: {
            newState = { allPlaylists: {}, singlePlaylist: {...state.singlePlaylist, ...action.payload} };
            return newState;
        }
        case CREATE_TRACK_PLAYLIST: {
            // debugger
            // NEED TO REFACTOR - ACTION.PAYLOAD SPREAD IN ALLPLAYLISTS IN APPROPRIATE PLAYLIST
            newState = { ...state, allPlaylists: {...state.allPlaylists}, singlePlaylist: {...state.singlePlaylist} };
            newState.allPlaylists[action.playlistId].PlaylistTracks.push(action.payload);
            return newState;
        }
        case DELETE_TRACK_PLAYLIST: {
            newState = { ...state, allPlaylists: {...state.allPlaylists}, singlePlaylist: {}}
            newState.allPlaylists[action.playlistId].PlaylistTracks = newState.allPlaylists[action.playlistId].PlaylistTracks.filter((tr) => tr.trackId !== action.payload.id);
            return newState;
        }
        case CREATE_PLAYLIST: {
            newState = { ...state, allPlaylists: {...state.allPlaylists} };
            newState.allPlaylists[action.payload.id] = action.payload;
            return newState;
        }
        case DELETE_PLAYLIST: {
            newState = { ...state, allPlaylists: {...state.allPlaylists} };
            delete newState.allPlaylists[action.payload];
            return newState;
        }
        default:
            return state;
    };
};

export default playlistsReducer;