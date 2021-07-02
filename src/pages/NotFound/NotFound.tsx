import React, { useEffect } from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { StdTypoSubtitle1 } from '@shared/styled/Typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import 'twin.macro';
import { MainLayout } from '@components/templates/MainLayout';

import { Button } from 'antd';
import { useHistory } from 'react-router';
import ErrorImg from '@assets/images/error.svg';

export const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <StyledRestrictedArea
        tw="flex flex-col justify-center items-center"
        css={css`
          height: 60vh;
        `}
      >
        <img src={ErrorImg} />
        <StdTypoSubtitle1 tw="text-gray-6 font-normal mt-5 mb-8">
          찾으시는 페이지가 없네요!
        </StdTypoSubtitle1>
        <Button
          type="primary"
          css={css`
            width: 140px;
            height: 44px;
          `}
          onClick={() => {
            history.push('/app/mystudy');
          }}
        >
          메인페이지로
        </Button>
      </StyledRestrictedArea>
    </MainLayout>
  );
};
