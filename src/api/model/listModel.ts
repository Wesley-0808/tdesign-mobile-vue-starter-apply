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

export interface ActivityModel {
  id: number;
  img: string;
  name: string;
  price: string[];
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

export interface ActivityEvaluateResult {
  list: ActivityEvaluate[];
}
export interface ActivityEvaluate {
  id: number;
  user: string;
  content: string;
  avatar: string;
}
