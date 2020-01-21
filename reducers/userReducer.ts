const LOGIN = 'user/LOGIN' as const
const LOGOUT = 'user/LOGOUT' as const

export const login = (user: User) => ({ type: LOGIN, payload: user })
export const logout = () => ({ type: LOGOUT })

type UserAction =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>

export type User = {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  birth: Date;
  sex: number;
  address_zonecode: string;
  address_fulladdress: string;
  address_detailaddress: string;
  profile_image?: string;
  profile?: string;
  account_bank?: string;
  account_num?: string;
  state_id: number;
}

type UserState = {
  user: User
  isLogin: boolean
}

const initialState: UserState = {
  user: {
    id: 0,
    email: '',
    name: '',
    nickname: '',
    phone: '',
    birth: new Date(0),
    sex: 0,
    address_zonecode:  '',
    address_fulladdress:  '',
    address_detailaddress:  '',
    state_id: 0
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