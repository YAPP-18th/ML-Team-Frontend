import React, { useState, useCallback, useEffect } from 'react';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import { ajax, AjaxError } from 'rxjs/ajax';
import { take } from 'rxjs/operators';
import { useCookies } from 'react-cookie';

// typographys
import {
  StdTypoH3,
  StdTypoCaption1,
  StdTypoBody2,
} from '@shared/styled/Typography';

// colors
import { GRAY_1, GRAY_6, GRAY_7, GRAY_9 } from '@shared/styles/colors';

// components
import { Button, message } from 'antd';
import { OnBoardingContainer } from '@shared/styled/OnBoarding';
import { useHistory } from 'react-router-dom';
import { API_END_POINT } from '@shared/common';

export const OnBoardingStepTwo: React.FC = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [nickname, setNickname] = useState('');
  const [over, setOver] = useState(false);
  const history = useHistory();

  const sendNickname = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      ajax({
        url: `${API_END_POINT}/api/user/signup`,
        method: 'POST',
        body: JSON.stringify({
          provider: 'google',
          nickname,
        }),
        headers: {
          authorization: `${cookies.accessToken}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).subscribe({
        next: (res) => console.log(res),
        error: (err: AjaxError) => {
          if (err.status === 404) {
            console.log(err);
            message.error({
              content: '닉네임 생성에 실패했습니다!',
              style: { ErrMsgStyle },
            });
          }
        },
      });
    },
    [cookies, nickname],
  );

  return (
    <OnBoardingContainer tw="flex flex-col items-center">
      <StdTypoH3>닉네임 설정</StdTypoH3>
      <StdTypoBody2
        css={css`
          color: ${GRAY_6};
          margin-top: 15px;
          margin-bottom: 130px;
        `}
      >
        이름 대신 사용할 닉네임을 설정해주세요.
      </StdTypoBody2>
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        css={inputStyle}
        maxLength={8}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <StdTypoCaption1 tw="mt-2.5 mb-20 text-gray-6">
        8글자 이내로 입력해주세요
      </StdTypoCaption1>
      <Button
        type="primary"
        size="large"
        disabled={nickname === '' || nickname.length >= 8}
        onClick={(e) => {
          sendNickname(e);
          history.push('/app/mystudy');
        }}
      >
        완료
      </Button>
    </OnBoardingContainer>
  );
};

const inputStyle = css`
  display: block;
  color: ${GRAY_7};
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  background-color: ${GRAY_9};
  width: 460px;
  height: 60px;
  text-align: center;
  border-radius: 5px;
`;

export const ErrMsgStyle = css`
  margin-top: 20vh;
  background-color: ${GRAY_9};
  color: ${GRAY_1};
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
`;
