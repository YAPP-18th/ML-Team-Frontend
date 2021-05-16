import React from 'react';
// import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'; //npm install react-router-dom
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import 'twin.macro';

// typography
import {
  StdTypoH1,
  StdTypoH3,
  StdTypoBody1,
  StdTypoH5,
} from '@shared/styled/Typography';

// colors
import { GRAY_8, GRAY_9, GRAY_11, PRIMARY_10 } from '@shared/styles/colors';

// images
import TimeImg from '@assets/images/time.svg';

interface IStudyInfoBarProps {
  isLarge: boolean;
  status?: string;
}

const StudyInfoBar = ({ isLarge, status }: IStudyInfoBarProps) => {
  return (
    <StyledStudyInfoBar isLarge={isLarge}>
      <div tw="flex items-center">
        <StyledStudyInfoSet isLarge={isLarge}>
          <img src={TimeImg} tw="mr-1" alt="공부세트" />
          <div>$ set</div>
        </StyledStudyInfoSet>
        {isLarge ? (
          <div tw="flex items-end">
            <StdTypoH1>$$:$$:$$</StdTypoH1>
            <StdTypoH5 tw="ml-4 text-gray-4">휴식시간까지 $$:$$:$$</StdTypoH5>
          </div>
        ) : (
          <div>
            <StdTypoH3>$$:$$:$$</StdTypoH3>
            <StdTypoBody1 tw="text-gray-4">휴식시간까지 $$:$$:$$</StdTypoBody1>
          </div>
        )}
      </div>
      <StyledStudyInfoStatus isLarge={isLarge}>
        <StdTypoH5>{status}</StdTypoH5>
      </StyledStudyInfoStatus>
    </StyledStudyInfoBar>
  );
};
export default StudyInfoBar;

const StyledStudyInfoBar = styled.div(({ isLarge }: IStudyInfoBarProps) => ({
  width: isLarge ? `60%` : '90%',
  height: '128px',
  position: 'absolute',
  color: 'white',
  display: 'flex',
  top: '75vh',
  backgroundColor: isLarge ? GRAY_8 : GRAY_11,
  opacity: 0.9,
  alignItems: 'center',
  borderRadius: '20px',
  padding: '0px 40px',
  justifyContent: 'space-between',
}));
const StyledStudyInfoStatus = styled.div(({ isLarge }: IStudyInfoBarProps) => ({
  backgroundColor: PRIMARY_10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  width: isLarge ? '175px' : '115px',
  height: '56px',
}));
const StyledStudyInfoSet = styled.div(({ isLarge }: IStudyInfoBarProps) => ({
  //   width: 'auto',
  backgroundColor: GRAY_9,
  display: 'flex',
  borderRadius: '8px',
  width: isLarge ? '97px' : '74px',
  height: isLarge ? '38px' : '30px',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '30px',
}));
// const StyledStudyReadyStatus = styled.div(({ status }: IReadyStatusProps) => ({
//   width: '96px',
//   height: '30px',
//   marginTop: '30px',
//   marginBottom: status == '준비중' ? '78px' : '20px',
//   backgroundColor: status == '준비중' ? GRAY_8 : PRIMARY_8,
//   color: status == '준비중' ? GRAY_6 : 'white',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: '5px',
// }));
