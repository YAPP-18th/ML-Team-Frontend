import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Button, Tooltip } from 'antd';
import 'twin.macro';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from 'react-google-login';

// typography
import { StdTypoCaption1, StdTypoH3 } from '@shared/styled/Typography';

// colors
import { GRAY_10, GRAY_12 } from '@shared/styles/colors';

// images
import LogoImg from '@assets/images/logo.svg';
import GoogleImg from '@assets/images/google.svg';
import FacebookImg from '@assets/images/facebook.svg';
import { css, Global } from '@emotion/react';
import { ajax, AjaxError } from 'rxjs/ajax';
import { take } from 'rxjs/operators';
import { useCookies } from 'react-cookie';

const Login = () => {
  // const [cookies, setCookie] = useCookies(['accessToken']);
  const onSuccessGoogleLogin = (res: any) => {
    ajax({
      url: '/api/user/signin',
      method: 'GET',
      headers: {
        authorization: `Bearer ${res.accessToken}`,
      },
    })
      .pipe(take(1))
      .subscribe({
        next: (i) => {
          alert('회원가입이 되어 있군 ㅋ');
        },
        error: (err: AjaxError) => {
          console.log(err);
          if (err.status === 404) {
            alert('회원가입이 필요하겠군 ㅋ');

            // get Response Header
            console.log(err.xhr.getResponseHeader('authorization'));
          }
        },
        complete: () => {
          console.log('complete');
        },
      });
  };
  const { signIn, loaded } = useGoogleLogin({
    clientId:
      '532567031933-13u39u6uup1t3f62mldba3u94ituljpn.apps.googleusercontent.com',
    onSuccess: onSuccessGoogleLogin,
    onFailure: (err) => {
      console.log(err, 'err');
    },
  });
  return (
    <section tw="h-full w-full flex justify-center items-center">
      <Global
        styles={css`
          body {
            background: ${GRAY_10};
          }
        `}
      />
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
              tw="w-full block bg-gray-1 hover:bg-gray-1 hover:opacity-75 text-gray-10 hover:text-gray-10 font-bold space-x-2.5 focus:bg-gray-6 focus:text-gray-10"
              type="text"
              onClick={signIn}
            >
              <img src={GoogleImg} alt="구글 로그인" tw="inline-block" />
              구글 로그인
            </Button>
            <Button
              tw="w-full block font-bold space-x-2.5"
              type="primary"
              disabled
            >
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
