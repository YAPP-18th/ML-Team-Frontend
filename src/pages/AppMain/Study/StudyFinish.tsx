import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';
// components
import { Button } from 'antd';

// typography
import {
  StdTypoH3,
  StdTypoH5,
  StdTypoSubtitle1,
} from '@shared/styled/Typography';

// colors
import { GRAY_10 } from '@shared/styles/colors';
import { useHistory } from 'react-router';
import { IMyStudy, IStudyRoom } from '@shared/interface';

interface IStudyFinishProps {
  studyRoom: IStudyRoom;
  myStudy: IMyStudy;
}

export const StudyFinish = ({ studyRoom, myStudy }: IStudyFinishProps) => {
  const history = useHistory();
  console.log(myStudy);

  return (
    <div tw="flex h-full flex-col items-center justify-center">
      <div tw="flex flex-col justify-center items-center">
        <StdTypoH3 tw="text-gray-2 mb-2">학습 결과</StdTypoH3>
        <StdTypoSubtitle1>
          학습을 성공적으로 마쳤습니다! 레포트를 통해 나의 공부습관을
          진단해보세요.
        </StdTypoSubtitle1>
      </div>
      <StyledResult>
        <div
          tw="bg-gray-9 flex items-center justify-center"
          css={css`
            width: 708px;
            height: 60px;
            margin-bottom: 47px;
            border-radius: 10px;
          `}
        >
          <StdTypoH5 tw="text-gray-4">{studyRoom.title}</StdTypoH5>
        </div>
        <div tw="flex">
          <StyledResultContent>
            <StdTypoSubtitle1 tw="text-gray-4">
              누적 순공부시간
            </StdTypoSubtitle1>
            <StdTypoH3 tw="text-gray-2">
              {myStudy?.totalTime
                ? new Date(myStudy.totalTime * 1000).toISOString().substr(11, 8)
                : '계산 불가'}
            </StdTypoH3>
          </StyledResultContent>
          <StyledResultContent>
            <StdTypoSubtitle1 tw="text-gray-4">
              지금까지 공부한 세트
            </StdTypoSubtitle1>
            <StdTypoH3 tw="text-gray-2">
              {myStudy?.totalTime
                ? `${Math.floor(myStudy.totalTime / 1800)}세트`
                : '계산 불가'}
            </StdTypoH3>
          </StyledResultContent>
        </div>
      </StyledResult>
      <div tw="flex">
        <Button
          css={ResultButtonStyle}
          tw="text-gray-6"
          onClick={() => {
            history.push('/app/mystudy');
            window.location.reload();
          }}
        >
          내 학습으로 돌아가기
        </Button>
        <Button
          css={ResultButtonStyle}
          tw="text-gray-1"
          type="primary"
          onClick={() => {
            history.replace('/app/report');
            window.location.reload();
          }}
        >
          학습 레포트 보기
        </Button>
      </div>
    </div>
  );
};

const StyledResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${GRAY_10};
  width: 788px;
  height: 290px;
  padding: 40px;
  margin: 60px 0;
  border-radius: 10px;
`;
const StyledResultContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 65px;
`;
const ResultButtonStyle = css`
  width: 279px;
  margin: 0 12.5px;
`;
