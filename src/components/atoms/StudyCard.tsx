import React, { useCallback, useState } from 'react';
import { Button, Dropdown, Form, Input, Menu, Modal } from 'antd';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import 'twin.macro';

import UserIcon from '@assets/icons/user.svg';
import EnterIcon from '@assets/icons/enter.svg';
import MoreIcon from '@assets/icons/more.svg';

import { GRAY_10 } from '@shared/styles/colors';
import { StdTypoBody2, StdTypoSubtitle1 } from '@shared/styled/Typography';
import { IStudyRoom, studyCardStyleList } from '@shared/interface';
import useAccessToken from '../../hooks/useAccessToken';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const StudyCard: React.FC<
  IStudyRoom & {
    myUserId?: number;
    onEnterRoom: (pw?: string) => void;
    dropdown?: ReactJSXElement;
  }
> = ({
  id,
  style,
  title,
  description,
  isPublic,
  currentJoinCounts,
  ownerId,
  myUserId,
  onEnterRoom,
  dropdown,
}) => {
  const [passwordForm] = Form.useForm<{ password?: string }>();
  const [formValues, setFormValues] = useState({});

  const [isEnterModalVisible, setIsEnterModalVisible] = useState(false);

  const isMine = myUserId === ownerId;

  const onClickEnter = useCallback(() => {
    if (!isPublic && !isMine) {
      setIsEnterModalVisible(true);
    } else {
      onEnterRoom();
    }
  }, [id]);

  return (
    <>
      <StudyCardWrapper>
        <StudyCardInnerWrapper css={studyCardStyleList[style]}>
          <StdTypoSubtitle1>{title}</StdTypoSubtitle1>
          <StdTypoBody2>{description}</StdTypoBody2>
          <div tw="flex items-center space-x-1.5">
            <img src={UserIcon} alt="User" />
            <StdTypoBody2>{currentJoinCounts}/6</StdTypoBody2>
          </div>
        </StudyCardInnerWrapper>
        <StudyCardHover className="study-card-hover" onClick={onClickEnter}>
          <EnterButton>
            <img src={EnterIcon} alt="enter icon" />
            <StdTypoSubtitle1>입장하기</StdTypoSubtitle1>
          </EnterButton>
        </StudyCardHover>
        {dropdown && (
          <Dropdown
            overlay={dropdown}
            trigger={['click']}
            placement="bottomRight"
          >
            <MoreButton src={MoreIcon} onClick={(e) => e.preventDefault()} />
          </Dropdown>
        )}
      </StudyCardWrapper>
      <Modal
        title="비밀번호를 입력해주세요."
        visible={isEnterModalVisible}
        footer={null}
        onCancel={() => setIsEnterModalVisible(false)}
      >
        <Form
          form={passwordForm}
          onChange={(values) => setFormValues(values)}
          onFinish={(v) => onEnterRoom(v.password)}
        >
          <Form.Item name="password" noStyle>
            <Input placeholder="비밀번호를 입력해주세요." type="password" />
          </Form.Item>
          <Form.Item shouldUpdate noStyle={true}>
            {() => (
              <div tw="flex justify-end">
                <Button
                  type="primary"
                  tw="mt-6"
                  htmlType="submit"
                  disabled={
                    !passwordForm.isFieldTouched('password') ||
                    !passwordForm.getFieldValue('password') ||
                    passwordForm
                      .getFieldsError()
                      .filter(({ errors }) => errors?.length).length > 0
                  }
                >
                  입장하기
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const StudyCardWrapper = styled.div`
  height: 180px;
  border-radius: 10px;
  position: relative;

  cursor: pointer;

  .study-card-hover {
    opacity: 0;
  }

  &:hover {
    .study-card-hover {
      opacity: 1;
    }
  }
`;

const StudyCardInnerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 18px;

  > * + * {
    margin-top: 6px;
  }
`;

const MoreButton = styled.img`
  position: absolute;
  top: 14px;
  right: 14px;
  transition: 0.2s ease background;
  border-radius: 50%;

  &:hover {
    background: ${GRAY_10}80;
  }
`;

const StudyCardHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${GRAY_10}80;
  border-radius: 10px;
`;

const EnterButton = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 58px;
  padding: 10px 26px;

  > * + * {
    margin-left: 6px;
  }
`;

export default StudyCard;
