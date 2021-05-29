import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'; //npm install react-router-dom
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import 'twin.macro';

// components
import { Modal, Button, Layout } from 'antd';

// typography
import {
  StdTypoSubtitle1,
  StdTypoH1,
  StdTypoH4,
  StdTypoBody1,
  StdTypoH5,
} from '@shared/styled/Typography';

// colors
import { GRAY_8, GRAY_9, GRAY_12, PRIMARY_10 } from '@shared/styles/colors';

// images
import NowSleepImg from '@assets/images/sleeping_modal.svg';
import NowPhoneImg from '@assets/images/smartphone_modal.svg';
import NowLeftImg from '@assets/images/left.svg';

interface IStatusModalProps {
  // status: StudyStatusType;
  status: string;
}

type StudyStatusType = '공부중' | '조는중' | '스마트폰' | '자리비움';

const StatusTable: {
  [key: string]: { image: string; title: string; body: string };
} = {
  조는중: {
    image: NowSleepImg,
    title: '혹시 졸고 계신가요?',
    body: '5분동안 움직임이 없어서 공부가 중단됐어요.',
  },
  스마트폰: {
    image: NowPhoneImg,
    title: '혹시 스마트폰을 사용하시나요?',
    body: '화면에 스마트폰이 보여서 공부가 중단됐어요. ',
  },
  자리비움: {
    image: NowLeftImg,
    title: '혹시 자리를 비우셨나요?',
    body: '화면에 두 손이 보이지 않아 공부가 중단됐어요. ',
  },
};

const StatusModal = ({ status }: IStatusModalProps) => {
  console.log(status);
  return (
    <div
      tw="bg-gray-10 flex flex-col items-center justify-center"
      css={css`
        width: 620px;
        height: 439px;
        border-radius: 20px;
      `}
    >
      {/* status에 따라 */}
      <img
        css={css`
          margin-bottom: 15px;
          width: 160px;
          height: 160px;
        `}
        src={StatusTable[status].image}
      />
      <StdTypoH4
        tw="text-gray-2"
        css={css`
          margin: 15px 0;
        `}
      >
        {StatusTable[status].title}
      </StdTypoH4>
      <div tw="text-gray-4">
        <StdTypoBody1
          css={css`
            white-space: pre-wrap;
          `}
        >
          {StatusTable[status].body}
        </StdTypoBody1>
        <StdTypoBody1>
          공부중이라고 알려주면 다시 공부가 시작돼요.{' '}
        </StdTypoBody1>
      </div>
      <Button
        css={css`
          width: 146px;
          height: 44px;
          margin-top: 40px;
        `}
        type="primary"
      >
        <StdTypoBody1>공부중이에요!</StdTypoBody1>
      </Button>
    </div>
  );
};

export default StatusModal;
