import type { ActivityEvaluateResult, ActivityResult, RecommendListResult } from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  RecommendActivity: '/get-recommend-list',
  AllActivity: '/get-all-activity',
  ActivityEvaluate: '/get-activity-evaluate',
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
