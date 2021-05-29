import React, { useState, useEffect, useRef } from 'react';
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
  const [sets, setSets] = useState(1);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [cycle, setCycle] = useState('휴식');
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      if (delay === null) {
        return;
      }
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  useInterval(() => {
    if (totalSeconds < 59) {
      setTotalSeconds(totalSeconds + 1);
    }
    if (totalSeconds === 59) {
      if (totalMinutes === 59) {
        setTotalHours(totalHours + 1);
        setTotalMinutes(0);
      } else {
        setTotalMinutes(totalMinutes + 1);
      }
      setTotalSeconds(0);
    }
  }, 1000);
  useInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        if ((totalMinutes + sets * totalHours + 5) % (sets * 25) <= 5) {
          setMinutes(4);
          setCycle('집중');
        } else {
          setSets(sets + 1);
          setMinutes(24);
          setCycle('휴식');
        }
      } else {
        setMinutes(minutes - 1);
      }
      setSeconds(59);
    }
  }, 1000);

  return (
    <StyledStudyInfoBar isLarge={isLarge}>
      <div tw="flex items-center">
        <StyledStudyInfoSet isLarge={isLarge}>
          <img src={TimeImg} tw="mr-1" alt="공부세트" />
          <div>{sets} set</div>
        </StyledStudyInfoSet>
        {isLarge ? (
          <div tw="flex items-end">
            <StdTypoH1>
              {totalHours < 10 ? `0${totalHours}` : totalHours}:
              {totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes}:
              {totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}
            </StdTypoH1>
            <StdTypoH5 tw="ml-4 text-gray-4">
              {cycle}시간까지 00:{minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </StdTypoH5>
          </div>
        ) : (
          <div>
            <StdTypoH3>
              {totalHours < 10 ? `0${totalHours}` : totalHours}:
              {totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes}:
              {totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}
            </StdTypoH3>
            <StdTypoBody1 tw="text-gray-4">
              {cycle}시간까지 00:{minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </StdTypoBody1>
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
