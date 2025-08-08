import type {
  ActivityEvaluateResult,
  ActivityResult,
  MyActivityListResult,
  RecommendListResult,
} from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  RecommendActivity: '/get-recommend-list',
  AllActivity: '/get-all-activity',
  ActivityEvaluate: '/get-activity-evaluate',
  MyActivity: '/get-my-activity-list',
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

export function getMyActivityList(params: object = { page: 1 }) {
  return request.get<MyActivityListResult>({
    url: Api.MyActivity,
    params,
  });
}
