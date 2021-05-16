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
  StdTypoH5,
} from '@shared/styled/Typography';

// colors
import { GRAY_8, GRAY_9, GRAY_12, PRIMARY_10 } from '@shared/styles/colors';

const ExitModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div
      tw="bg-gray-10 relative "
      css={css`
        width: 420px;
        height: 220px;
        border-radius: 20px;
      `}
    >
      <StdTypoH4
        tw="text-gray-2 flex flex-col items-center justify-center"
        css={css`
          height: 148px;
        `}
      >
        공부를 종료할까요?
      </StdTypoH4>
      <div tw="flex">
        <Button
          tw="w-1/2 absolute left-0 bottom-0 bg-gray-8 rounded-none"
          css={css`
            height: 74px;
            border-bottom-left-radius: 20px;
          `}
          key="keep"
          onClick={handleCancel}
        >
          <StdTypoSubtitle1>조금 더 해볼래요</StdTypoSubtitle1>
        </Button>
        <Button
          tw="w-1/2 absolute right-0 bottom-0 rounded-none"
          css={css`
            height: 74px;
            border-bottom-right-radius: 20px;
          `}
          key="quit"
          type="primary"
          onClick={handleOk}
        >
          <StdTypoSubtitle1>네, 그만할래요</StdTypoSubtitle1>
        </Button>
      </div>
    </div>
  );
};

export default ExitModal;
