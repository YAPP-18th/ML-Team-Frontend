import { AxiosError } from 'axios';
import { SerializedStyles } from '@emotion/serialize';
import { css } from '@emotion/react';
import StudyRoomImg1 from '@assets/images/studyroom-1.svg';
import StudyRoomImg2 from '@assets/images/studyroom-2.svg';
import StudyRoomImg3 from '@assets/images/studyroom-3.svg';
import StudyRoomImg4 from '@assets/images/studyroom-4.svg';
import { SWRResponse } from 'swr/dist/types';

export interface IUser {
  id: number;
  provider: 'google';
  social_id: string;
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
  is_public: boolean;
  created_at: string;
  description: string;
  id: number;
  current_join_counts: number;
  owner_id: number;
}

export interface IMyStudy {
  id: number;
  started_at: string;
  ended_at: string;
  total_time: number;
  study_room_id: string;
  title: string;
  disturbances: {
    id: number;
    type: string;
    count: number;
    time: number;
  }[];
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
  owner_id: number;
  style: StudyCardStyle;
  title: string;
  description?: string;
  isPublic: boolean;
}
