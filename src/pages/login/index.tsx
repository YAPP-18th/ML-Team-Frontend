import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import 'antd/dist/antd.css';
import { jsx, css } from '@emotion/react';
import { Button } from 'antd';
// colors
import { GRAY_10 } from '@src/shared/styles/colors';

// images
import LogoImg from '@assets/images/logo.svg';
import GoogleImg from '@assets/images/google.svg';
import FacebookImg from '@assets/images/facebook.svg';

interface ILoginButtonProps {
  bgColor: string;
  txtColor: string;
  contents: string;
  img: string;
}

const Login = () => {
  return (
    <ContentWrapperStyled>
      <ContentContainerStyled>
        <img src={LogoImg} alt="logo" />
        <PhrasesStyled>
          내 꿈을 향해
          <br />
          몰입하는 시간, 스터딥
        </PhrasesStyled>
        <LoginButtonStyled
          bgColor="#F2F2F2"
          txtColor={GRAY_10}
          contents="구글로 시작하기"
          img={GoogleImg}
        ></LoginButtonStyled>
        <LoginButtonStyled
          bgColor="#5C79FF"
          txtColor="white"
          contents="페이스북으로 시작하기"
          img={FacebookImg}
        ></LoginButtonStyled>
        <InfoStyled>
          <a href="#" style={{ textDecoration: 'underline', color: 'white' }}>
            이용약관, 개인정보 수집 및 이용, 개인정보 제공 내용
          </a>
          에 동의하는 것으로 간주합니다.
        </InfoStyled>
      </ContentContainerStyled>
      <ContentRightStyled></ContentRightStyled>
      {/* <Link to="/onboarding">Onboarding</Link>
      <Link to="/mystudy">My Study 내 학습</Link> */}
    </ContentWrapperStyled>
  );
};

const ContentWrapperStyled = styled.div`
  width: 771px;
  height: 100vh;
  display: flex;
  align-items: 'center';
`;
const ContentContainerStyled = styled.div`
  width: 35vw;
  min-width: 540px;
  background-color: #141414;
  padding: 150px;
`;
const ContentRightStyled = styled.div`
  background-color: #262626;
`;
const PhrasesStyled = styled.p`
  font-size: 34px;
  font-weight: 700;
  color: white;
  line-height: 46px;
  margin-top: 193px;
  margin-bottom: 47px;
`;

const LoginImgStyled = styled.img`
  margin-right: 10px;
  width: 24px;
  height: 24px;
`;
const LoginButtonStyled = (props: ILoginButtonProps) => (
  <Button type="primary">
    <div style={{ display: 'flex' }}>
      <LoginImgStyled src={props.img} alt={props.img} />
      <div>{props.contents}</div>
    </div>
  </Button>
);
const InfoStyled = styled.div`
  display: flex;
  color: white;
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  margin-top: 20px;
  justify-content: center;
  flex-wrap: nowrap;
`;
export default Login;
