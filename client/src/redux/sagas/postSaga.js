import axios from 'axios';
import {
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
} from '../types';
import { push } from 'connected-react-router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

// All Posts load

const loadPostAPI = () => {
  return axios.get('/api/post');
};

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    console.log(result, 'loadPosts');
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e,
    });
    yield push('/');
  }
}
function* watchLoadPosts() {
  yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

// Post Upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.post('/api/post', payload, config);
};

function* uploadPosts(action) {
  try {
    console.log(action, 'uploadPost function');
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, 'uploadPostAPI, action.payload');
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

// Post Detail
const loadPostDetailAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(result, 'post_detail_saga_data');
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchuploadPosts),
    fork(watchloadPostDetail),
  ]);
}
