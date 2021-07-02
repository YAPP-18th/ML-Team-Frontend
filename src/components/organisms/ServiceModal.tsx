import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import 'twin.macro';
import {
  GoogleLoginResponse,
  useGoogleLogin,
  UseGoogleLoginProps,
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
import { useLocation } from 'react-router-dom';
import { API_END_POINT } from '@shared/common';
import { setAccessToken } from '../../hooks/useAccessToken';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Modal from 'antd/lib/modal/Modal';
import { Dispatch, SetStateAction } from 'react';

interface IModalProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const ServiceModal = ({ isModalVisible, setIsModalVisible }: IModalProps) => {
  //   const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);

  return (
    <Modal
      title="서비스 이용약관"
      visible={isModalVisible}
      footer={null}
      onCancel={() => setIsModalVisible(false)}
      width={`80%`}
      bodyStyle={{
        height: '648px',
        overflow: 'auto',
        fontSize: `12px`,
      }}
    >
      <StyledChapter>제 1 장 총칙</StyledChapter>
      <StyledRule>제 1 조 (목적)</StyledRule>
      <p>
        스터딥(www.studeep.com) 서비스 약관 (이하 &quot;본 약관&quot;)은
        이용자가 전기통신사업법 및 동법 시행령에 의하여 스터딥 (이하
        &quot;스터딥&quot;)에서 제공하는 인터넷 관련 서비스(이하
        &quot;서비스&quot;라 한다)를 이용함에 있어 &apos;스터딥&apos;과 이용자의
        권리, 의무 및 책임사항 등 기본적인 사항을 규정함을 목적으로 합니다.
      </p>
      <StyledRule>제 2조 (용어정의)</StyledRule>
      <p>
        &quot;서비스&quot;: 스터딥 사이트 내의 공부방에서 카메라를 활용한
        캠스터디를 진행하며, 그 과정에서 발생한 데이터를 이용하여 발행하는 학습
        분석 레포트 등 제공되는 서비스 일체를 의미
      </p>
      <p>
        &quot;이용자&quot; : 본 약관에 따라 회사가 제공하는 서비스를 받는 자
      </p>
      <p>
        &quot;공부방&quot; : 최대 6명의 이용자가 모여서 함께 공부할 수 있으며,
        공부방의 영상 이미지에 머신러닝 기술이 적용돼 이용자의 행동 분석을 위한
        기록을 수집하는 기능
      </p>
      <p>
        &quot;학습레포트&quot; : 공부방에 머신러닝 기술이 적용돼 수집된 이용자
        행동에 대한 기록을 바탕으로 오늘의 공부에 대한 타임라인, 달성률, 집중도,
        집중 분산요인 등을 명시해주는 기능
      </p>
      <p>
        &quot;가입&quot; : 본 약관에 동의하여 서비스 이용 계약을 완료시키는 행위
      </p>
      <p>
        &quot;닉네임&quot; : 서비스 이용을 위하여 수집한 이용자의 닉네임(이름)
      </p>
      <p>
        &quot;이용계약&quot; : 서비스 이용과 관련하여 스터딥과 이용자 간에
        체결하는 계약
      </p>
      <p>&quot;탈퇴&quot; : 이용자가 서비스 이용 계약을 종료하는 의사표시</p>
      <StyledRule>제 3 조 (약관의 공시 및 효력과 변경)</StyledRule>
      <ol tw="list-decimal list-inside">
        <li>
          이 약관의 내용은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
          공지함으로써 효력이 발생합니다.{' '}
        </li>
        <li>
          스터딥은 이 규정을 변경할 수 있으며, 변경된 규정은 제1항과 같은
          방법으로 공지함으로써 효력을 발생합니다.
        </li>
      </ol>
      <StyledRule>제 4 조 (약관 외 준칙)</StyledRule>
      <p>
        이 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법 및 기타
        관련법령의 규정에 따릅니다.
      </p>
      <StyledChapter>제 2 장 이용계약</StyledChapter>
      <StyledRule>제 5 조 (이용 계약의 성립)</StyledRule>
      <p>
        이용자 가입 란을 작성 후 가입버튼을 누름과 동시에 이 약관에 동의하는
        것으로 간주됩니다.
      </p>
      <StyledRule>제 6 조 (서비스 가입 및 계정)</StyledRule>
      <ol tw="list-decimal list-inside">
        <li>
          이용자는 스터딥이 제공하는 방식을 통해 서비스에 가입할 수 있습니다.
        </li>
        <li>
          스터딥은 서비스에 가입한 이용자에게 닉네임, 이메일이 포함된 계정을
          제공합니다.
        </li>
      </ol>
      <StyledChapter>제 3 장 계약 당사자의 의무</StyledChapter>
      <StyledRule>제 7 조 (스터딥의 의무)</StyledRule>

      <ol tw="list-decimal list-inside">
        <li>
          스터딥은 계속적이고 안정적인 서비스의 제공을 위하여 최선의 노력을 다할
          의무가 있습니다.
        </li>
        <li>
          스터딥은 이용자가 제기한 의견이나 불만이 정당하다고 객관적으로 인정될
          경우에는 합리적인 기간 내에 신속하게 처리하기 위해 노력할 의무가
          있습니다.
        </li>
      </ol>
      <StyledRule>제 8 조 (이용자의 의무)</StyledRule>
      <ul tw="list-disc list-inside">
        <li>
          이용자는 서비스를 본래의 이용 목적 이외의 용도로 사용하거나 다음 각
          호에 해당하는 행위를 해서는 안되며, 아래의 항을 위반하는 것으로
          의심되는 이용자를 발견할 시 이메일을 통해 신고를 접수하여야 합니다.{' '}
        </li>
        <ol tw="list-decimal list-inside pl-3">
          <li>
            서비스 이용 중 허위 사실을 기재하여 서비스 운영을 방해하는 행위
          </li>
          <li>
            서비스를 이용하여 얻은 정보를 스터딥의 사전 승낙없이 복제, 유통하여
            상업적으로 이용하는 행위
          </li>
          <li>사기성, 음란성, 사행성, 혐오성 메시지를 게시하는 행위</li>
          <li>
            타인의 명예를 훼손하거나 사이버 불링, 폭력적인 행위를 하는 등
            이용자의 정상적인 서비스 이용을 방해하는 행위
          </li>
          <li>
            저작권을 포함한 지적재산권, 초상권 등 회사 및 제 3자의 기타 권리를
            침해하는 행위
          </li>
          <li>
            일반적이지 않은 방식으로 데이터를 조작하여 서비스 운영을 방해하는
            행위
          </li>
          <li>
            컴퓨터 소프트웨어, 하드웨어, 전기 통신 장비의 정상적인 가동을 방해,
            파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드,
            파일, 프로그램을 포함하고 있는 자료를 전송, 게시, 유포, 사용하는
            행위
          </li>
          <li>관계 법령, 서비스이용약관, 운영정책, 공지사항을 위배하는 행위</li>
          <li>
            기타 공공질서 및 미풍양속을 위반하거나 불법적, 부당한 방식의 행동을
            하는 행위
          </li>
        </ol>
      </ul>
      <StyledChapter>제 4 장 서비스 이용 및 제공 </StyledChapter>
      <StyledRule>제 9 조 (서비스 이용)</StyledRule>
      <ol tw="list-decimal list-inside">
        <li>
          이용자는 본 약관의 규정된 사항을 준수해 사이트를 이용해야합니다.
        </li>
        <li>
          본 약관에 명시되지 않은 서비스 이용에 관한 사항은 스터딥이 별도로
          공지하는 내용에 따라야 합니다.
        </li>
      </ol>
      <StyledRule>제 10조 (서비스 제공)</StyledRule>
      <p>스터딥이 이용자에게 제공하는 서비스는 다음과 같습니다. </p>
      <ol tw="list-decimal list-inside">
        <li>공부방 서비스</li>
        <li>학습레포트 서비스</li>
      </ol>
      <StyledRule>제 11 조 (정보의 제공)</StyledRule>
      <p>
        스터딥은 회원이 서비스 이용 중 필요하다고 인정되는 다양한 정보에 대하여
        이 메일이나 서신우편 등의 방법으로 회원에게 정보를 제공할 수 있습니다.{' '}
      </p>
      <StyledRule>제 12 조 (서비스의 요금)</StyledRule>
      <p>
        스터딥이 제공하는 서비스는 무료입니다. 일부 특수 목적의 서비스는 유료로
        제공할 수 있으며, 그 자세한 내용에 대하여는 이용자와 별도로 합의합니다.
      </p>
      <StyledRule>제 13 조 (서비스 이용의 제한)</StyledRule>
      <p>
        본 사이트 이용 및 행위가 다음 각 항에 해당하는 경우 스터딥은 해당
        이용자의 이용을 제한할 수 있습니다.
      </p>
      <ol tw="list-decimal list-inside">
        <li>서비스 이용 중 허위 사실을 기재하여 서비스 운영을 방해하는 행위</li>
        <li>
          서비스를 이용하여 얻은 정보를 스터딥의 사전 승낙없이 복제, 유통하여
          상업적으로 이용하는 행위
        </li>
        <li>사기성, 음란성, 사행성, 혐오성 메시지를 게시하는 행위</li>
        <li>
          타인의 명예를 훼손하거나 사이버 불링, 폭력적인 행위를 하는 등 이용자의
          정상적인 서비스 이용을 방해하는 행위
        </li>
        <li>
          저작권을 포함한 지적재산권, 초상권 등 회사 및 제 3자의 기타 권리를
          침해하는 행위
        </li>
        <li>
          일반적이지 않은 방식으로 데이터를 조작하여 서비스 운영을 방해하는 행위
        </li>
        <li>
          컴퓨터 소프트웨어, 하드웨어, 전기 통신 장비의 정상적인 가동을 방해,
          파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드,
          파일, 프로그램을 포함하고 있는 자료를 전송, 게시, 유포, 사용하는 행위
        </li>
        <li>관계 법령, 서비스이용약관, 운영정책, 공지사항을 위배하는 행위</li>
        <li>
          기타 공공질서 및 미풍양속을 위반하거나 불법적, 부당한 방식의 행동을
          하는 행위
        </li>
      </ol>
      <StyledRule>제 14 조 (이용자의 공부방)</StyledRule>
      <p>
        스터딥 운영진은 공부방을 임의대로 삭제하지 않습니다. 운영진은 해당하는
        공부방이 다음 각 호에 해당한다고 판단되는 경우에만 사전통지 없이 삭제할
        수 있습니다.
      </p>
      <ol tw="list-decimal list-inside">
        <li>
          다른 이용자 또는 제3자의 명예를 손상시키거나 불이익을 주는 행위를 한
          경우
        </li>
        <li>
          공부방이 기술적인 오류로 이용자의 정상적인 이용에 방해를 주는 경우
        </li>
        <li>특정 이용자를 비방, 음해하는 경우</li>
        <li>기타 스터딥의 운영 목적에 위배되는 경우</li>
      </ol>
      <StyledRule>제 15 조 (서비스 제공의 중지)</StyledRule>
      <p>
        스터딥은 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부의 제공을
        중지할 수 있습니다.
      </p>
      <ol tw="list-decimal list-inside">
        <li>
          스터딥은 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부의 제공을
          중지할 수 있습니다.
        </li>
        <li>정전으로 서비스 제공이 불가능할 경우</li>
        <li>설비의 이전, 보수 또는 공사로 인해 부득이한 경우</li>
        <li>
          서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스
          제공이 어려운 경우
        </li>
        <li>
          전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할
          우려가 있는 경우
        </li>
      </ol>
      <StyledChapter>제 5장 기타</StyledChapter>
      <StyledRule>제 16 조 (손해배상)</StyledRule>
      <p>
        스터딥은 무료로 제공되는 서비스와 관련하여 이용자에게 어떠한 손해가
        발생하더라도 동 손해가 스터딥의 중대한 과실에 의한 경우를 제외하고 이에
        대하여 책임을 부담하지 아니합니다.
      </p>
      <StyledRule>제 17조 (재판권 및 준거법)</StyledRule>
      <p>
        스터딥과 이용자간에 제기된 소송에는 대한민국 법을 적용합니다. 서비스
        이용과 관련하여 스터딥과 이용자간에 발생한 분쟁에 대해서는 민사소송법의
        주소지를 관할하는 법원을 관할 법원으로 합니다.
      </p>
      <div tw="mt-3">이 약관은 서비스 화면에 개제한 후 즉시 시행합니다. </div>
      <div>시행일 2021-05-30 </div>
    </Modal>
  );
};

export default ServiceModal;

const StyledUl = styled.ul`
  list-style: inside disc none;
  padding-left: 12px;
  padding-bottom: 12px;
`;
const StyledCircleList = styled.li`
  padding-left: 12px;
  list-style-type: circle;
  margin: 0;
`;

const StyledChapter = styled.div`
  font-weight: bold;
  font-size: 15px;
  margin-top: 12px;
`;
const StyledRule = styled.div`
  font-weight: bold;
  margin-top: 12px;
`;
