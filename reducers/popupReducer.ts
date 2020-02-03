const VISIBLE = 'popup/VISIBLE' as const
const HIDDEN = 'popup/HIDDEN' as const

export const visible = () => ({ type: VISIBLE })
export const hidden = () => ({ type: HIDDEN })

type PopupAction =
  | ReturnType<typeof visible>
  | ReturnType<typeof hidden>

type PopupState = {
  isVisible: boolean
}

const initialState: PopupState = {
  isVisible: false
};

const popupReducer = (state = initialState, action: PopupAction) => {
  switch (action.type) {
    case VISIBLE:
      return { isVisible: true };
    case HIDDEN:
      return { isVisible: false };
    default:
      return state;
  }
}

export default popupReducer