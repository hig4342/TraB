const VISIBLE = 'popup/VISIBLE' as const
const HIDDEN = 'popup/HIDDEN' as const
const SETCONTENTS = 'popup/SETCONTENTS' as const

export const visible = () => ({ type: VISIBLE })
export const hidden = () => ({ type: HIDDEN })
export const setcontents = (diff: ContentsType) => ({ type: SETCONTENTS, payload: diff})

type PopupAction =
  | ReturnType<typeof visible>
  | ReturnType<typeof hidden>
  | ReturnType<typeof setcontents>

export type ContentsType = 'register' | 'signup' | 'success' | 'complete'

type PopupState = {
  isVisible: boolean
  contents: ContentsType
}

const initialState: PopupState = {
  isVisible: false,
  contents: 'signup'
};

const popupReducer = (state = initialState, action: PopupAction) => {
  switch (action.type) {
    case VISIBLE:
      return { ...state, isVisible: true };
    case HIDDEN:
      return { ...state, isVisible: false };
    case SETCONTENTS:
      return { ...state, contents: action.payload}
    default:
      return state;
  }
}

export default popupReducer