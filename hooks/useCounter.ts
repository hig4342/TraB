import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reducers/rootReducer';
import { increase, decrease, increaseBy } from '@reducers/counterReducer';
import { useCallback } from 'react';

export default function useCounter() {
  const count = useSelector((state: RootState) => state.counterReducer.count);
  const dispatch = useDispatch();

  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  const onIncreaseBy = useCallback(
    (diff: number) => dispatch(increaseBy(diff)),
    [dispatch]
  );

  return {
    count,
    onIncrease,
    onDecrease,
    onIncreaseBy
  };
}