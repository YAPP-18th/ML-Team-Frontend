import axios from 'axios';
import { API_END_POINT } from '@shared/common';
import { camel2Under } from '@shared/utils';
import { ICreateStudyRequest } from '@shared/interface';

export default async function createStudyRoom(
  id: number,
  request: Partial<ICreateStudyRequest>,
  accessToken: string | null,
) {
  const keys = Object.keys(request).map((i) => camel2Under(i));
  const values = Object.values(request);

  const body = keys.reduce((acc, cur, idx) => {
    return {
      ...acc,
      [cur]: values[idx],
    };
  }, {});

  const result = await axios.post(
    `${API_END_POINT}/api/study-rooms`,
    {
      ...body,
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
