import { all } from 'redux-saga/effects';

// * == generator function : return multiple values
export default function* rootSaga() {
    yield all([]);
}