import { atom } from 'recoil';
import { IStudyingUser, IStudyRoom } from '@shared/interface';

export const studyRoomState = atom<IStudyRoom | null>({
  key: 'studyRoomState',
  default: null,
});

export const studyingUsersState = atom<IStudyingUser[] | null>({
  key: 'studyingUsersState',
  default: null,
});
