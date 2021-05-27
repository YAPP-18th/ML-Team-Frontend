import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import 'twin.macro';
import { RouteComponentProps } from 'react-router-dom'; //npm install react-router-dom

// components
import RTCVideo from '@components/Study/RTCVideo';

// typography
import { StdTypoH3 } from '@shared/styled/Typography';

// colors
import { GRAY_6, GRAY_8, PRIMARY_8 } from '@shared/styles/colors';
import { StudyLayout } from '@components/Layouts/study/StudyLayout';
import { ICurrentStudy } from '@pages/AppMain/Study/Study';
import { useHistory } from 'react-router';

interface IReadyStatusProps {
  status: string;
}

interface IStudyReadyProps {
  currentStudy?: ICurrentStudy;
  isPublic: boolean;
}

export const StudyReady = ({ currentStudy, isPublic }: IStudyReadyProps) => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);
  // 디자인 시스템 반영 보완
  return (
    <StudyLayout isPublic={isPublic} page="ready">
      <StdTypoH3 tw="from-gray-1 mt-16 font-medium">
        정확한 집중도 분석을 위해
      </StdTypoH3>
      <StdTypoH3 tw="from-gray-1">화면에 두 손이 나오게 준비해주세요</StdTypoH3>
      {/* 현재 손의 준비 상태에 따라 둘 중에 하나 리턴 */}
      {/* <StyledStudyReadyStatus status="준비중">
            준비중
          </StyledStudyReadyStatus> */}
      <div>
        {/* 반영 보완 */}
        <StyledStudyReadyStatus status="준비완료">
          준비완료
        </StyledStudyReadyStatus>
        <div tw="mb-6">$초 뒤 자동입장</div>
      </div>
      <RTCVideo mediaStream={localStream} />
    </StudyLayout>
  );
};

const StyledStudyReadyStatus = styled.div(({ status }: IReadyStatusProps) => ({
  width: '96px',
  height: '30px',
  marginTop: '30px',
  marginBottom: status == '준비중' ? '78px' : '20px',
  backgroundColor: status == '준비중' ? GRAY_8 : PRIMARY_8,
  color: status == '준비중' ? GRAY_6 : 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
}));
