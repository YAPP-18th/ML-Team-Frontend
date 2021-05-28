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

interface IReadyStatusProps {
  status: string;
}

interface IStudyReadyProps {
  currentStudy?: ICurrentStudy;
  isPublic: boolean;
}

export const StudyReady = ({ currentStudy, isPublic }: IStudyReadyProps) => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  //모델에서 손 인식한 후
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

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
        <div tw="mb-6">{timer}초 뒤 자동입장</div>
      </div>
      <div>
        <RTCVideo mediaStream={localStream} />
      </div>
    </StudyLayout>
  );
};

const StyledStudyReadyStatus = styled.div(({ status }: IReadyStatusProps) => ({
  width: '119px',
  height: '40px',
  marginTop: '30px',
  marginBottom: status == '준비중' ? '78px' : '20px',
  backgroundColor: status == '준비중' ? GRAY_8 : PRIMARY_8,
  color: status == '준비중' ? GRAY_6 : 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
}));
