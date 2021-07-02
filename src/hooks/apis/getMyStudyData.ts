import axios from 'axios';
import { API_END_POINT } from '@shared/common';
import { getResponseObj } from '@shared/utils';
import { IMyStudy } from '@shared/interface';

export default async function getMyStudyData(
  myStudyId: number,
  accessToken: string | null,
) {
  return axios
    .get(`${API_END_POINT}/api/my-studies/${myStudyId}`, {
      headers: {
        authorization: accessToken,
      },
    })
    .then((r) => {
      return getResponseObj(r.data?.data) as IMyStudy;
    });
}
