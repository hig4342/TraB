const LOGIN = 'user/LOGIN' as const
const LOGOUT = 'user/LOGOUT' as const

export const login = (user: User) => ({ type: LOGIN, payload: user })
export const logout = () => ({ type: LOGOUT })

type UserAction =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>

export type User = {
  email: string
}

type UserState = {
  user: User
  isLogin: boolean
}

const initialState: UserState = {
  user: {
    email: ''
  },
  isLogin: false
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.payload, isLogin: true };
    case LOGOUT:
      return { user: initialState.user, isLogin: false };
    default:
      return state;
  }
}

export default userReducer