import type {
  ActivityEvaluateResult,
  ActivityInterestedPeopleData,
  ActivityResult,
  MyActivityListResult,
  RecommendListResult,
  UserInfoResult,
} from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  RecommendActivity: '/get-recommend-list',
  AllActivity: '/get-all-activity',
  ActivityEvaluate: '/get-activity-evaluate',
  MyActivity: '/get-my-activity-list',
  UserInfo: '/get-user-info',
  ActivityInterestedPeople: '/get-activity-interested',
};

export function getRecommendList() {
  return request.get<RecommendListResult>({
    url: Api.RecommendActivity,
  });
}

export function getAllActivityList() {
  return request.get<ActivityResult>({
    url: Api.AllActivity,
  });
}

export function getActivityEvaluate() {
  return request.get<ActivityEvaluateResult>({
    url: Api.ActivityEvaluate,
  });
}

export function getMyActivityList(params: object) {
  return request.get<MyActivityListResult>({
    url: Api.MyActivity,
    params,
  });
}

export function getUserInfo() {
  return request.get<UserInfoResult>({
    url: Api.UserInfo,
  });
}

export function getActivityInterestedPeople() {
  return request.get<ActivityInterestedPeopleData>({
    url: Api.ActivityInterestedPeople,
  });
}
