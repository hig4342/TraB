const LOGIN = 'user/LOGIN' as const
const LOGOUT = 'user/LOGOUT' as const

export const login = (user: UserState) => ({ type: LOGIN, payload: user })
export const logout = () => ({ type: LOGOUT })

type UserAction =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>

export type UserState = {
  user: {
    email: string
    password: string
  }
}

const initialState: UserState = {
  user: {
    email: '',
    password: ''
  }
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.payload.user };
    case LOGOUT:
      return { user: initialState.user };
    default:
      return state;
  }
}

export default userReducer