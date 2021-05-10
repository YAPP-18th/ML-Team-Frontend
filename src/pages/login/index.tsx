import React from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import 'twin.macro';

// typography
import { StdTypoCaption1, StdTypoH3 } from '@shared/styled/Typography';

// colors
import { GRAY_12 } from '@shared/styles/colors';

// images
import LogoImg from '@assets/images/logo.svg';
import GoogleImg from '@assets/images/google.svg';
import FacebookImg from '@assets/images/facebook.svg';

const Login = () => {
  return (
    <section tw="h-full flex justify-center items-center">
      <StyledLoginWrapper>
        <img src={LogoImg} alt="logo" />
        <StyledLoginContent>
          <StdTypoH3 tw="text-gray-1">
            내 꿈을 향해
            <br />
            몰입하는 시간, 스터딥
          </StdTypoH3>
          <div tw="mt-14 space-y-2.5">
            <Button
              tw="w-full block bg-gray-1 hover:bg-gray-1 hover:opacity-75 text-gray-10 hover:text-gray-8 font-bold space-x-2.5"
              type="text"
            >
              <img src={GoogleImg} alt="구글 로그인" tw="inline-block" />
              구글 로그인
            </Button>
            <Button tw="w-full block font-bold space-x-2.5" type="primary">
              <img src={FacebookImg} alt="페이스북 로그인" tw="inline-block" />
              페이스북으로 시작하기
            </Button>
          </div>
          <StdTypoCaption1 tw="block text-center mt-5">
            <a href="#" tw="underline">
              서비스 이용약관, 개인정보 처리방침
            </a>
            에 동의하는 것으로 간주합니다.
          </StdTypoCaption1>
        </StyledLoginContent>
      </StyledLoginWrapper>
    </section>
  );
};

const StyledLoginWrapper = styled.div`
  width: 532px;
  height: 778px;
  padding: 80px 50px;
  background: ${GRAY_12};
  border-radius: 20px;
`;

const StyledLoginContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Login;
