import type { RawRouteComponent, RouteRecordName, RouteRecordRaw } from 'vue-router';

export interface RouterItem extends RouteRecordRaw {
  path: string;
  name?: RouteRecordName;
  component?: RawRouteComponent;
  children?: RouterItem[];
  meta?: {
    title?: { zh_CN: string; en_US: string };
    navBgColor?: string;
    navFgColor?: string;
    tabbar?: TabbarItem;
  };
}

export interface TabbarItem {
  path: string;
  label: string;
  icon: string;
  index: number;
}

export interface UserInfo {
  id: number;
  name: string;
  birthday: string;
  phone: string;
  identityCard: string;
  email: string;
  occupation: string;
}

export interface NormalOption {
  value: any;
  label: string;
}

export interface City {
  value: string;
  label: string;
}

export interface CityGroup {
  [key: string]: City[];
}
