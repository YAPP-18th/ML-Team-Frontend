import React, { useCallback, useMemo, useState } from 'react';
import { Button, Dropdown, Form, Input, Menu, message, Modal } from 'antd';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mutate } from 'swr';
import 'twin.macro';

import UserIcon from '@assets/icons/user.svg';
import EnterIcon from '@assets/icons/enter.svg';
import MoreIcon from '@assets/icons/more.svg';
import DeleteIcon from '@assets/icons/delete.svg';

import { GRAY_10 } from '@shared/styles/colors';
import { StdTypoBody2, StdTypoSubtitle1 } from '@shared/styled/Typography';
import { IStudyRoom, studyCardStyleList } from '@shared/interface';
import deleteStudyRoom from '../../hooks/apis/deleteStudyRoom';
import useAccessToken from '../../hooks/useAccessToken';
import { STUDY_ROOM_END_POINT } from '../../hooks/useStudyRoom';
import { MY_STUDY_ROOM_END_POINT } from '../../hooks/useMyStudyRoom';
import useUser from '../../hooks/useUser';
import joinStudyRoom from '../../hooks/apis/joinStudyRoom';

const StudyCard: React.FC<IStudyRoom> = ({
  id,
  style,
  title,
  description,
  is_public,
  owner_id,
}) => {
  const [passwordForm] = Form.useForm<{ password?: string }>();
  const [formValues, setFormValues] = useState({});

  const [accessToken] = useAccessToken();
  const user = useUser();

  const [isEnterModalVisible, setIsEnterModalVisible] = useState(false);

  const isMine = useMemo(() => {
    return user.data?.id === owner_id;
  }, [user]);

  const onClickEnter = useCallback(() => {
    if (!is_public) {
      setIsEnterModalVisible(true);
    } else {
      enterStudyRoom(id);
    }
  }, [id]);

  const enterStudyRoom = (id: number, password?: string) => {
    joinStudyRoom(id, accessToken, password)
      .then((r) => {
        message.success('공부방에 입장했습니다.');
      })
      .catch((err) => {
        message.error(
          '비밀번호가 틀렸거나, 서버 오류로 공부방 입장에 실패했습니다.',
        );
      });
  };

  function onClickDelete(_id: number) {
    deleteStudyRoom(_id, accessToken).then(async (r) => {
      await mutate(STUDY_ROOM_END_POINT);
      await mutate(`${MY_STUDY_ROOM_END_POINT}${user.data?.id}`);
    });
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => onClickDelete(id)}>
        <div tw="flex items-center space-x-1">
          <img src={DeleteIcon} alt="삭제하기 아이콘" />
          <StdTypoBody2
            css={css`
              color: #d6686e;
            `}
          >
            삭제하기
          </StdTypoBody2>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <StudyCardWrapper>
        <StudyCardInnerWrapper css={studyCardStyleList[style]}>
          <StdTypoSubtitle1>{title}</StdTypoSubtitle1>
          <StdTypoBody2>{description}</StdTypoBody2>
          <div tw="flex items-center space-x-1.5">
            <img src={UserIcon} alt="User" />
            <StdTypoBody2>1/6</StdTypoBody2>
          </div>
        </StudyCardInnerWrapper>
        <StudyCardHover className="study-card-hover" onClick={onClickEnter}>
          <EnterButton>
            <img src={EnterIcon} alt="enter icon" />
            <StdTypoSubtitle1>입장하기</StdTypoSubtitle1>
          </EnterButton>
        </StudyCardHover>
        {isMine && (
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
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
          onFinish={(v) => enterStudyRoom(id, v.password)}
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
