import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrSagaAsync } from '../saga/saga';
import styles from './Counter.module.css';
import { decrement, increment, incrementByAmount, selectCount, incrementIfOdd } from './sagaCounterSlice';

export function SagaCounter() {
    const count = useSelector(selectCount);
    const state = useSelector((state) => {
        console.log(state);
        return state
    })
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span className={styles.value}>{count}</span>

                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
                {state.sagaCounter.status}

            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={() => dispatch(incrSagaAsync(incrementValue))}
                >
                    Add Async
                </button>

                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementIfOdd(incrementValue))}
                >
                    Add If Odd
                </button>
            </div>
        </div>
    );
}
