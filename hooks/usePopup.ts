import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reducers/rootReducer';
import { visible, hidden } from '@reducers/popupReducer';

export default function useUser() {
  
  const dispatch = useDispatch()

  const isVisible = useSelector((state: RootState) => state.popupReducer.isVisible)
  const onVisible = useCallback(() => dispatch(visible()), [dispatch])
  const onHidden = useCallback(() => dispatch(hidden()), [dispatch])

  return {
    isVisible,
    onVisible,
    onHidden,
  }
}