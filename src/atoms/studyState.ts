import { atom } from 'recoil';
import { IStudyRoom } from '@shared/interface';

export const studyState = atom<IStudyRoom | null>({
  key: 'studyState',
  default: null,
});
