import axios from 'axios';
import { API_END_POINT } from '@shared/common';
import { camel2Snake, getRequestObj } from '@shared/utils';
import { ICreateStudyRequest } from '@shared/interface';

export default async function createStudyRoom(
  id: number,
  request: Partial<ICreateStudyRequest>,
  accessToken: string | null,
) {
  const result = await axios.post(
    `${API_END_POINT}/api/study-rooms`,
    {
      ...getRequestObj(request),
      owner_id: id,
    },
    {
      headers: {
        authorization: accessToken,
      },
    },
  );

  return result;
}
