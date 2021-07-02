import { atom } from 'recoil';
import { IStudyRoom } from '@shared/interface';

export const studyRoomState = atom<IStudyRoom | null>({
  key: 'studyRoomState',
  default: null,
});
