import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reducers/rootReducer';
import { visible, hidden, setcontents, ContentsType } from '@reducers/popupReducer';

export default function useUser() {
  const isVisible = useSelector((state: RootState) => state.popupReducer.isVisible)
  const contents = useSelector((state: RootState) => state.popupReducer.contents)
  const dispatch = useDispatch()

  const onVisible = useCallback(() => dispatch(visible()), [dispatch])
  const onHidden = useCallback(() => dispatch(hidden()), [dispatch])
  const handleContents = useCallback((contents: ContentsType) => dispatch(setcontents(contents)), [dispatch])

  return {
    isVisible,
    contents,
    onVisible,
    onHidden,
    handleContents
  }
}