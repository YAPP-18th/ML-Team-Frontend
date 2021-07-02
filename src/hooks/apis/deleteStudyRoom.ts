import axios from 'axios';
import { API_END_POINT } from '@shared/common';
import useAccessToken from '../useAccessToken';

export default async function deleteStudyRoom(
  roomId: string,
  userId: number,
  accessToken: string | null,
) {
  const result = await axios.delete(
    `${API_END_POINT}/api/study-rooms/${roomId}?user_id=${userId}`,
    {
      headers: {
        authorization: accessToken,
      },
    },
  );
  return result;
}
