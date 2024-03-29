import { SerializedStyles } from '@emotion/serialize';
import { css } from '@emotion/react';
import StudyRoomImg1 from '@assets/images/studyroom-1.svg';
import StudyRoomImg2 from '@assets/images/studyroom-2.svg';
import StudyRoomImg3 from '@assets/images/studyroom-3.svg';
import StudyRoomImg4 from '@assets/images/studyroom-4.svg';

export interface IUser {
  id: number;
  provider: 'google';
  socialId: string;
  nickname: string;
  goal: {
    MON: number;
    TUE: number;
    WED: number;
    THU: number;
    FRI: number;
    SAT: number;
    SUN: number;
  };
}

export interface IStudyRoom {
  title: string;
  style: StudyCardStyle;
  isPublic: boolean;
  createdAt: string;
  description: string;
  id: string;
  currentJoinCounts: number;
  ownerId: number;
}

export interface IMyStudy {
  id: number;
  date: string;
  totalTime: number;
}

export type StudyCardStyle = 'style_1' | 'style_2' | 'style_3' | 'style_4';

export const studyCardStyleList: {
  [key in StudyCardStyle]: SerializedStyles;
} = {
  style_1: css`
    background: url(${StudyRoomImg1}) center;
    background-size: cover;
  `,
  style_2: css`
    background: url(${StudyRoomImg2}) center;
    background-size: cover;
  `,
  style_3: css`
    background: url(${StudyRoomImg3}) center;
    background-size: cover;
  `,
  style_4: css`
    background: url(${StudyRoomImg4}) center;
    background-size: cover;
  `,
};

export interface ICreateStudyRequest {
  ownerId: number;
  style: StudyCardStyle;
  title: string;
  description?: string;
  isPublic: boolean;
}

export type StudyStatusType = 'study' | 'phone' | 'await' | 'sleep' | 'rest';

export interface IStudyingUser {
  myStudyId: number;
  reportId: number;
  roomId: string;
  status: StudyStatusType;
  userId: number;
  userNickname: string;
}

export type DisturbanceCause =
  | 'smartphone'
  | 'await'
  | 'sleep'
  | 'rest'
  | '스마트폰'
  | '자리비움'
  | '졸음'
  | '휴식';
export interface IDisturbance {
  name: DisturbanceCause;
  value: number;
  total_time: number;
}
export interface IReport {
  id: number;
  date: string;
  achievement: number;
  concentration: number;
  totalTime: number;
  totalStarCount: number;
  totalStatusTime: string;
  statuses: IDisturbance[];
  maxStatus: DisturbanceCause[];
}
export interface IStudyDisturbance {
  [x: string]: any;
  id: number;
  type: DisturbanceCause;
  count: number;
  time: number;
}
export interface IStudyLog {
  [x: string]: any;
  id: number;
  startedAt: string;
  endedAt: string;
  totalTime: number;
  studyRoomId: string;
  title: string;
  statuses: IStudyDisturbance;
}
