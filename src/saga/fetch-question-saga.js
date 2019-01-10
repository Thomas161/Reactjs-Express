import {takeEvery,put} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

export default function * () {
    yield takeEvery(`REQUEST_FETCH_QUESTION`, handleFetchQuestion);
}

export function * handleFetchQuestion({question_id}){
     const raw = yield fetch(`/api/questions/${question_id}`);
        const json = yield raw.json();
        const questions = json.items[0];
        console.log('Got Questions ' , questions);
        yield put({type: 'FETCHED_QUESTION',question})
}