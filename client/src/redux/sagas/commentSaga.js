import axios from 'axios';
import { push } from 'connected-react-router';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_LOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
} from '../types';

// Load comments
const loadCommentsAPI = (payload) => {
  console.log(payload, 'loadCommentAPI ID');
  return axios.get(`/api/post/${payload}/comments`);
};

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);
    console.log(result);
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e,
    });
    yield push('/');
  }
}

function* watchloadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

// Upload Comment
const uploadCommentsAPI = (payload) => {
  console.log(payload.id, 'loadmmentAPI ID');
  return axios.post(`/api/post/${payload.id}/comments`, payload);
};

function* uploadComments(action) {
  try {
    const result = yield call(uploadCommentsAPI, action.payload);
    console.log(result, 'UploadComment');
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_UPLOADING_FAILURE,
      payload: e,
    });
    yield push('/');
  }
}

function* watchUpLoadComments() {
  yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComments);
}
export default function* commentSaga() {
  yield all([fork(watchloadComments), fork(watchUpLoadComments)]);
}