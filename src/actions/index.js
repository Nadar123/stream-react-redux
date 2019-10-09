import { 
    SING_IN, 
    SING_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS, 
    FETCH_STREAM, 
    EDIT_STREAM, 
    DELETE_STREAM } from './types';
import api from '../apis/api'
import history from '../history';

export const signIn = (uerId) => {
    return {
        type: SING_IN,
        payload: uerId
    }
}

export const signOut = () => {
    return {
        type: SING_OUT
    }
}

export const createStream = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const response = await api.post('/streams', {...formValues, userId})

    dispatch ({type: CREATE_STREAM, payload: response.data});
    // programmtic navigation 
    // get the user back to the root route
    history.push('/');
}

export const fetchStreams = () => async (dispatch) => {
    const response = await api.get('/streams')

    dispatch({type: FETCH_STREAMS, payload: response.data})
}

export const fetchStream = (id) => async (dispatch) => {
    const response = await api.get(`/streams/${id}`);

    dispatch({type: FETCH_STREAM, payload: response.data})
}

export const editStream = (id, formValues) => async (dispatch) => {
    const response = await api.patch(`/streams/${id}`, formValues);

    dispatch ({type: EDIT_STREAM, payload: response.data});
    history.push('/');
}

export const deleteStream = (id) => async (dispatch) => {
    await api.delete(`/streams/${id}`);

    dispatch ({type: DELETE_STREAM, payload: id})
    history.push('/');

}