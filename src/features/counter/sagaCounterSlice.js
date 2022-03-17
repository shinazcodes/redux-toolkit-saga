import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import { fetchCount } from './counterAPI';

const initialState = {
    value: 0,
    status: 'idle',
};

export const SAGA_ACTION_TYPE_STARTED = "STARTED";
export const SAGA_ACTION_TYPE_SUCCESS = "SUCCESS";
export const SAGA_ACTION_TYPE_ERROR = "ERROR";

export const dispatchSagaAction = (type, value) => put({ type, payload: { value, status: type } })

// generator function to yield data from fetchCount Asynchronously and put/dispatched to the reducers which handle
// loading, success or error scenarios and updates the state accordingly
export function* incrementSagaAsync(action) {
    console.log(action)
    yield dispatchSagaAction(SAGA_ACTION_TYPE_STARTED)
    try {
        const response = yield fetchCount(action.payload.value);
        const { data } = response;
        yield dispatchSagaAction(SAGA_ACTION_TYPE_SUCCESS, data)
    } catch (err) {
        yield dispatchSagaAction(SAGA_ACTION_TYPE_ERROR)
    }
}

export const sagaCounterSlice = createSlice({
    name: 'sagaCounter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SAGA_ACTION_TYPE_SUCCESS, (state, action) => {
                console.log("adding:" + state.value + " + " + action.payload.value)
                state.status = 'SUCCESS';
                state.value += action.payload.value
            })
            .addCase(SAGA_ACTION_TYPE_ERROR, (state) => {
                state.status = 'ERROR';
            })
            .addCase(SAGA_ACTION_TYPE_STARTED, (state) => {
                state.status = 'loading';
            })
            ;
    },
});

export const { increment, decrement, incrementByAmount } = sagaCounterSlice.actions;

export const selectCount = (state) => state.sagaCounter.value;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
    }
};

export default sagaCounterSlice.reducer;
