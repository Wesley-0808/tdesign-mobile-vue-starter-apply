export interface RecommendListResult {
  list: RecommendListModel[];
}
export interface RecommendListModel {
  id: number;
  img: string;
}

export interface ActivityResult {
  list: ActivityModel[];
}

export type ActivityType = 'lecture' | 'exhibition' | 'workshop';

export interface ActivityModel {
  id: number;
  img: string;
  name: string;
  field: string | string[];
  type: ActivityType;
  price: ActivityPrice[] | string;
  evaluate: number;
  interested: number;
  date: string[];
  place: string;
  introduce: string;
  guest: ActivityGuest[];
  venue: ActivityVenue[];
}

interface ActivityVenue {
  name: string;
  img: string;
}

interface ActivityGuest {
  name: string;
  img: string;
}

interface ActivityPrice {
  name: string;
  price: number;
  discount?: number;
}

export interface ActivityEvaluateResult {
  list: ActivityEvaluate[];
}
export interface ActivityEvaluate {
  id: number;
  user: string;
  content: string;
  avatar: string;
}

export interface MyActivityListResult {
  list: MyActivityList[];
  is_end: boolean;
}

export interface MyActivityList {
  id: number;
  img: string;
  name: string;
  date: string;
  status: 0 | 1;
}

export interface UserInfoResult {
  userid: number;
  avatar: string;
  username: string;
  age: number;
  reputation: string;
}
