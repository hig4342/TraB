export type Board = {
  id: number;
  UserId: number;
  title: string;
  content: string;
  board_state: number;
  banner_image: string;
  main_image: string;
  ad_deadline: Date;
  ad_link: string;
  ad_region: number;
  visible: boolean;
  hit: number;
  BoardReplies: BoardReply[];
  createdAt: Date;
  User: User;
}

export type BoardReply = {
  id: number;
  content: string;
  createdAt: Date;
  User: User;
}

export type City = {
  id: number;
  city_name: string;
  Country: Country;
}

export type Country = {
  id: number;
  country_name: string;
  Cities: City[];
}

export type Theme = {
  id: number;
  name: string;
}

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
  Boards: Board[];
  BoardReplies: BoardReply[];
  Replies: Reply[];
  Planners: Planner[];
}

export type Planner = {
  id: number;
  title: string;
  thumbnail: string;
  contents: string;
  themes_id: number[];
  blog_name: string;
  blog_link: string;
  upload_state: number;
  payment_state: number;
  hit: number;
  createdAt: Date;
  City: City;
  Country: Country;
  Replies: Reply[];
  Rates: RateType[];
  Favorites: Favorite[];
  User: User;
}

export type Reply = {
  id: number;
  content: string;
  createdAt: Date;
  User: User;
}

export type RateType = {
  id: number;
  PlannerId: number;
  UserId: number;
  rate: number;
}

export type Favorite = {
  id: number;
  PlannerId: number;
  UserId: number;
  favorite: boolean;
  Planner: Planner;
}

export type Count = {
  count: string;
}