import { fetchCount } from "../counter/counterAPI";
import { increment, incrementSagaAsync } from "../counter/sagaCounterSlice"


import { all, takeEvery } from "redux-saga/effects";

function* helloSaga() {
    console.log('Hello Sagas!')
}

// CREATING AN ACTION for the UI to DISPATCH which is watched by the watchIncrementAsync and handed over to incremenentSagaAsync 
// generator function.
export const incrSagaAsync = (value) => {
    return {
        type: "SAGA_CALL",
        payload: {
            status: "started",
            value
        }
    }
};

function* watchIncrementAsync() {
    yield takeEvery("SAGA_CALL", incrementSagaAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
}