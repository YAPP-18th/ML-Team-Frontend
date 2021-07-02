import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import 'twin.macro';

// typography
import { StdTypoCaption1, StdTypoH3 } from '@shared/styled/Typography';

// colors
import { GRAY_12 } from '@shared/styles/colors';
import Modal from 'antd/lib/modal/Modal';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { css } from 'twin.macro';

interface IModalProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const PrivacyModal = ({ isModalVisible, setIsModalVisible }: IModalProps) => {
  return (
    <Modal
      title="개인정보처리방침"
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
      <div tw="font-bold">개인정보 수집 및 이용</div>
      <p tw="pb-3">
        스터딥(이하 &quot;스터딥&quot;는)은 회원님(이하 &quot;이용자&quot;)의
        개인정보를 중요시하며, &apos;정보통신망 이용촉진 및 정보보호에 관한
        법률&apos;, &apos;개인정보보호법&apos; 등을 준수하고 있습니다.
        &quot;스터딥&quot;은 개인정보취급방침을 통하여 &quot;이용자&quot;님께서
        제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며,
        개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
      </p>
      <ol
        css={css`
          list-style: decimal inside none;
        `}
      >
        <li>
          개인정보 수집 및 이용목적
          <StyledUl>
            <li>
              스터딥은 수집한 개인정보를 다음의 목적을 위해 활용합니다. 이용
              목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의
              동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </li>
            <li>회원 가입 및 관리</li>
            <StyledCircleList>사용자 고유 아이디 생성 및 관리</StyledCircleList>
            <li>신규 서비스 개발 및 마케팅/광고에 활용</li>
            <StyledCircleList>
              신규서비스 개발 및 특화 서비스 제공, 통계학적 특성에 따른 서비스
              제공 및 광고 게재, 접속빈도 파악, 이벤트 정보 및 참여기회 제공,
              광고성 정보제공, 신규 상품 안내 - &quot;이용자&quot;의 서비스
              이용에 대한 통계 등
            </StyledCircleList>
            <li>법령 및 약관 등의 이행 및 준수</li>
            <StyledCircleList>
              법령 혹은 이용약관 등에 반하여 피해를 줄 수 있는 부분을 방지
            </StyledCircleList>
          </StyledUl>
        </li>
        <li>
          수집하는 개인정보 항목 및 수집 방법
          <StyledUl>
            <li>서비스 회원가입 시</li>
            <StyledCircleList>
              구글 로그인: (필수) 이름, 이메일 주소, 프로필 사진
            </StyledCircleList>
            <li>서비스 이용 시 수집 항목</li>
            <StyledCircleList>
              공부방에서의 사용자의 행동 (공부 중 여부, 공부 시간)
            </StyledCircleList>
          </StyledUl>
        </li>
        <li>
          수집한 개인정보의 위탁
          <StyledUl>
            <li>
              스터딥은 이용자의 동의 없이 개인정보 처리를 외부 업체에 제공하지
              않습니다.{' '}
            </li>
          </StyledUl>
        </li>
        <li>
          개인정보의 보유 기간 및 이용기간
          <StyledUl>
            <li>
              스터딥이 개인정보를 수집하는 경우 보유기간은 동의에 의한 회원가입
              후 회원탈퇴 시까지입니다. 또한 회원탈퇴시 해당 정보를 지체 없이
              파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간
              동안 보존합니다
            </li>
            <li>
              상법 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 법령에서
              규정한 보존기간 동안 거래내역과 최소한의 기본정보를 보유합니다. 이
              경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용합니다.
            </li>
            <StyledCircleList>
              계약 또는 청약철회 등에 관한 기록: 5년
            </StyledCircleList>
            <StyledCircleList>
              소비자의 불만 또는 분쟁처리에 관한 기록: 3년
            </StyledCircleList>
            <StyledCircleList>부정이용 등에 관한 기록: 5년</StyledCircleList>
            <StyledCircleList>
              웹사이트 방문기록(로그인 기록, 접속기록): 3개월
            </StyledCircleList>
          </StyledUl>
        </li>
        <li>
          개인정보의 파기절차 및 방법
          <StyledUl>
            <li>
              스터딥은 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당
              정보를 지체 없이 파기합니다. 파기절차 및 방법은 아래와 같습니다.
            </li>
            <ol tw="list-inside list-decimal pl-3">
              <li>
                파기절차: 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후
                내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및
                이용기간 참조) 일정 기간 저장된 후 파기됩니다.
              </li>
              <li>
                파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수
                없는 기술적 방법을 사용하여 삭제합니다.
              </li>
            </ol>
          </StyledUl>
        </li>
        <li>
          이용자의 권리와 행사 방법
          <StyledUl>
            <li>
              &quot;이용자&quot;는 언제든지 등록되어 있는 자신의 개인정보를
              조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
            </li>
            <li>
              &quot;스터딥&quot;은 &quot;이용자&quot;의 요청에 의해 해지 또는
              삭제된 개인정보는 &quot;개인정보의 보유 및 이용기간&quot;에 명시된
              바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록
              처리하고 있습니다.
            </li>
          </StyledUl>
        </li>
        <li>
          개인정보 보호책임자
          <StyledUl>
            <li>책임자 : 임유경</li>
            <li>contact : studeep2021@gmail.com</li>
            <li>
              이용자는 스터딥의 서비스를 이용 하시며 발생하는 모든 개인정보보호
              관련 민원을 개인정보관리책임자에게 신고할 수 있습니다.{' '}
            </li>
            <li>
              기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래
              기관에 문의하시기 바랍니다.
            </li>
            <StyledCircleList>
              개인정보침해신고센터 (www.118.or.kr / 118)
            </StyledCircleList>
            <StyledCircleList>
              정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)
            </StyledCircleList>
            <StyledCircleList>
              대검찰청 첨단범죄수사과 (www.spo.go.kr / 02-3480-2000)
            </StyledCircleList>
            <StyledCircleList>
              경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)
            </StyledCircleList>
          </StyledUl>
        </li>
        <li>
          개인정보 처리방침 및 변경에 관한 사항
          <StyledUl>
            <li>
              현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 시행일
              최소 7일전부터 이용자의 이메일 혹은 웹사이트를 통해 공고합니다.
            </li>
          </StyledUl>
        </li>
        <li tw="list-disc font-bold">
          해당 개인정보 처리방침은 2021.05.30부터 적용 됩니다.
        </li>
      </ol>
    </Modal>
  );
};

export default PrivacyModal;

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
