import axios from 'axios';
import { API_END_POINT } from '@shared/common';
import { camel2Snake } from '@shared/utils';
import { ICreateStudyRequest } from '@shared/interface';

export default async function joinStudyRoom(
  id: string,
  accessToken: string | null,
  password?: string,
) {
  const result = await axios.post(
    `${API_END_POINT}/api/study-rooms/${id}/join-check`,
    {
      password,
    },
    {
      headers: {
        authorization: accessToken,
      },
    },
  );

  return result;
}
