export type Board = {
  id: number;
  title: string;
  content: string;
  board_state: number;
  banner_image: string;
  ad_link: string;
  hit: number;
  BoardReplies: BoardReply[];
  User: User;
}

export type BoardReply = {
  id: number;
  content: string;
  createAt: Date;
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
  contents_image: string[];
  contents_text: string[];
  themes_id: number[];
  thumbnail: number;
  blog_name?: string;
  blog_link?: string;
  upload_state: number;
  payment_state: number;
  hit: number;
  City: City;
  Country: Country;
  Replies: Reply[];
  User: User;
}

export type Reply = {
  id: number;
  content: string;
  rate: number;
  createAt: Date;
  User: User;
}

export type Count = {
  count: string;
}