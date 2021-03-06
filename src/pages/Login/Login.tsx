import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { API_END_POINT } from '@shared/common';
import { setAccessToken } from '../../hooks/useAccessToken';
import 'twin.macro';
import { useHistory } from 'react-router-dom';
import {
  GoogleLoginResponse,
  useGoogleLogin,
  UseGoogleLoginProps,
} from 'react-google-login';
import axios, { AxiosError, AxiosResponse } from 'axios';

// components
import { Button } from 'antd';
import PrivacyModal from '@components/organisms/PrivacyModal';
import ServiceModal from '@components/organisms/ServiceModal';

// typography
import { StdTypoCaption1, StdTypoH3 } from '@shared/styled/Typography';

// colors
import { GRAY_10, GRAY_12 } from '@shared/styles/colors';

// images
import LogoImg from '@assets/images/logo.svg';
import GoogleImg from '@assets/images/google.svg';
import FacebookImg from '@assets/images/facebook.svg';

const Login = () => {
  const location = useLocation<{ redirectUrl: string }>();
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
  const history = useHistory();
  const onSuccessGoogleLogin = (res: GoogleLoginResponse) => {
    axios
      .get(`${API_END_POINT}/api/user/signin`, {
        headers: {
          authorization: `Bearer ${res.accessToken}`,
        },
      })
      .then(({ headers: { authorization } }: AxiosResponse) => {
        setAccessToken(authorization);
      })
      .catch(({ response }: AxiosError) => {
        if (response?.status === 404) {
          const accessToken = response.headers?.authorization;
          setAccessToken(accessToken);
        }
      });
  };

  const { signIn } = useGoogleLogin({
    clientId:
      '424037183060-ddflsa6cg27bg58goel3p0qpt034mobc.apps.googleusercontent.com',
    onSuccess: onSuccessGoogleLogin as UseGoogleLoginProps['onSuccess'],
    onFailure: (err) => {
      console.log(err, 'err');
    },
  });

  const customRedirectUrl = useMemo(() => {
    return location?.state?.redirectUrl;
  }, [location]);

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
        <Link to="/landing">
          <img
            src={LogoImg}
            tw="hover:opacity-75 transition-opacity"
            alt="logo"
          />
        </Link>
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
            {/* hover 시 마우스 포인터 바꾸기 */}
            <span
              tw="underline cursor-pointer"
              onClick={() => setIsServiceModalVisible(true)}
            >
              서비스 이용약관
            </span>
            <span
              tw="underline cursor-pointer"
              onClick={() => setIsPrivacyModalVisible(true)}
            >
              , 개인정보 처리방침
            </span>
            에 동의하는 것으로 간주합니다.
          </StdTypoCaption1>
          <ServiceModal
            isModalVisible={isServiceModalVisible}
            setIsModalVisible={setIsServiceModalVisible}
          />
          <PrivacyModal
            isModalVisible={isPrivacyModalVisible}
            setIsModalVisible={setIsPrivacyModalVisible}
          />
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
