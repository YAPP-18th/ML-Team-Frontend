import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

// images
import logo from '../assets/logo.svg';
import google from '../assets/google.svg';
import facebook from '../assets/facebook.svg';

interface LoginButtonProps {
  bgColor: string;
  txtColor: string;
}

const Login = () => {
  return (
    <ContentWrapper>
      <ContentContainer>
        <img src={logo} />
        <Phrases>
          내 꿈을 향해
          <br />
          몰입하는 시간, 스터딥
        </Phrases>

        <LoginButton bgColor="#F2F2F2" txtColor="black">
          <div style={{ display: 'flex' }}>
            <LoginImg src={google} />
            <div>구글로 시작하기</div>
          </div>
        </LoginButton>
        <LoginButton bgColor="#5C79FF" txtColor="white">
          <div style={{ display: 'flex' }}>
            <LoginImg src={facebook} />
            <div>페이스북으로 시작하기</div>
          </div>
        </LoginButton>
        <Info>
          <a href="#" style={{ textDecoration: 'underline' }}>
            이용약관, 개인정보 수집 및 이용, 개인정보 제공 내용
          </a>
          에 동의하는 것으로 간주합니다.
        </Info>
      </ContentContainer>
      <Blank></Blank>
      {/* <Link to="/onboarding">Onboarding</Link>
      <Link to="/mystudy">My Study 내 학습</Link> */}
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  backgroundcolor: #141414;
  align-items: 'center';
`;
const ContentContainer = styled.div`
  width: 35vw;
  min-width: 540px;
  height: 100vh;
  background-color: #141414;
  padding: 6%;
`;
const Blank = styled.div`
  background-color: #262626;
  width: 65vw;
  height: 100vh;
`;
const Phrases = styled.p`
  font-size: 4.5vh;
  font-weight: 700;
  color: white;
  line-height: 5.5vh;
  margin-top: 20vh;
  margin-bottom: 5vh;
`;
const LoginButton = styled.button`
  width: 100%;
  height: 7vh;
  border-radius: 4px;
  font-weight: 700;
  font-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  background-color: ${(props: LoginButtonProps) => props.bgColor};
  color: ${(props: LoginButtonProps) => props.txtColor};
`;
const LoginImg = styled.img`
  margin-right: 0.1rem;
  width: 1.4rem;
`;
const Info = styled.div`
  display: flex;
  color: white;
  font-size: 0.1px;
  margin-top: 15;
  justify-content: center;
  flex-wrap: nowrap;
`;
export default Login;
