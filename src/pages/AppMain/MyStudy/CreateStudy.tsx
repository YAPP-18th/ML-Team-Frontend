import React, { useEffect, useState } from 'react';
import { MainLayout } from '@components/templates/MainLayout';
import {
  LabelRequiredCircle,
  StyledBoxWrapper,
  StyledRestrictedArea,
} from '@shared/styled/Common';
import { css } from '@emotion/react';
import { Button, Col, Form, Input, Radio, Row } from 'antd';
import { StdTypoBody1, StdTypoBody2 } from '@shared/styled/Typography';
import 'twin.macro';
import TextArea from 'antd/es/input/TextArea';
import { StudyCardSelectable } from '@components/atoms/StudyCardSelectable';
import { useLocalStorage } from '@rehooks/local-storage';
import { ICreateStudyRequest, StudyCardStyle } from '@shared/interface';
import useUser from '../../../hooks/useUser';
import createStudyRoom from '../../../hooks/apis/createStudyRoom';
import { STUDY_ROOM_END_POINT } from '../../../hooks/useStudyRoom';
import { MY_STUDY_ROOM_END_POINT } from '../../../hooks/useMyStudyRoom';
import { useHistory } from 'react-router';
import { mutate } from 'swr';

interface IStudyCardSelectableControlProps {
  value?: StudyCardStyle;
  onChange?: (value: StudyCardStyle) => void;
}

const CreateStudy: React.FC = () => {
  const [form] = Form.useForm<Partial<ICreateStudyRequest>>();
  const [formValues, setFormValues] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [accessToken] = useLocalStorage('accessToken');
  const history = useHistory();
  const user = useUser();

  const onSubmit = (request: Partial<ICreateStudyRequest>) => {
    setBtnLoading(true);
    const userId = user.data?.id;
    if (userId) {
      createStudyRoom(userId, request, accessToken).then(async () => {
        await mutate(STUDY_ROOM_END_POINT);
        await mutate(`${MY_STUDY_ROOM_END_POINT}${user.data?.id}`);
        setBtnLoading(false);
        history.replace('/app/mystudy');
      });
    } else {
      // 오류
    }
  };

  return (
    <MainLayout>
      <StyledRestrictedArea maxWidth={840}>
        <StyledBoxWrapper
          css={css`
            margin-top: 60px;
          `}
        >
          <Form
            form={form}
            onFinish={(v) => onSubmit({ ...v, ownerId: user?.data?.id })}
            onChange={(values) => setFormValues(values)}
          >
            <div
              css={css`
                > * + * {
                  margin-top: 40px;
                }
              `}
            >
              <Row gutter={10}>
                <Col span={20} push={4}>
                  <Form.Item
                    name="style"
                    rules={[{ required: true, message: '필수 값입니다.' }]}
                    noStyle={true}
                  >
                    <StudyCardSelectableControl />
                  </Form.Item>
                </Col>
                <Col span={4} pull={20}>
                  <StdTypoBody1 tw="font-bold mt-2">
                    공부방 이미지
                    <LabelRequiredCircle />
                  </StdTypoBody1>
                </Col>
              </Row>
              <Row gutter={10} align="middle">
                <Col span={20} push={4}>
                  <Form.Item
                    name="title"
                    rules={[{ required: true }]}
                    noStyle={true}
                  >
                    <Input placeholder="어떤 공부를 할지 적어주세요" />
                  </Form.Item>
                </Col>
                <Col span={4} pull={20}>
                  <StdTypoBody1 tw="font-bold">
                    공부방 이름
                    <LabelRequiredCircle />
                  </StdTypoBody1>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={20} push={4}>
                  <Form.Item name="description" noStyle={true}>
                    <TextArea
                      placeholder="공부방에 대한 설명을 적어주세요"
                      rows={3}
                      tw="resize-none"
                    />
                  </Form.Item>
                </Col>
                <Col span={4} pull={20}>
                  <StdTypoBody1 tw="font-bold mt-2">공부방 설명</StdTypoBody1>
                </Col>
              </Row>
              <div
                css={css`
                  .ant-col {
                    display: flex;
                  }
                  .ant-radio-group {
                    align-items: center;
                  }
                `}
              >
                <Row gutter={10} align="middle">
                  <Col span={20} push={4} flex={1}>
                    <Form.Item
                      name="isPublic"
                      rules={[{ required: true }]}
                      noStyle={true}
                    >
                      <Radio.Group>
                        <Radio value={true}>공개</Radio>
                        <Radio value={false}>비공개</Radio>
                      </Radio.Group>
                    </Form.Item>
                    {form.isFieldTouched('isPublic') && (
                      <StdTypoBody2 tw="absolute text-gray-6 top-10">
                        {form.getFieldValue('isPublic')
                          ? '모르는 사람이 공부방에 함께 참여할 수 있어요'
                          : '초대한 사람만 들어올 수 있어요'}
                      </StdTypoBody2>
                    )}
                  </Col>
                  <Col span={4} pull={20}>
                    <StdTypoBody1 tw="font-bold">
                      방 공개
                      <LabelRequiredCircle />
                    </StdTypoBody1>
                  </Col>
                </Row>
              </div>

              {form.isFieldTouched('isPublic') &&
                !form.getFieldValue('isPublic') && (
                  <div tw="pt-6">
                    <Row gutter={10}>
                      <Col span={20} push={4}>
                        <Form.Item
                          name="password"
                          rules={[{ required: true }]}
                          noStyle={true}
                        >
                          <Input
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            disabled={form.getFieldValue('isPublic')}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} pull={20}>
                        <StdTypoBody1 tw="font-bold mt-2">
                          비밀번호
                          <LabelRequiredCircle />
                        </StdTypoBody1>
                      </Col>
                    </Row>
                  </div>
                )}
              <Form.Item shouldUpdate noStyle={true}>
                {() => (
                  <Button
                    type="primary"
                    size="large"
                    tw="w-full mt-20"
                    htmlType="submit"
                    disabled={
                      (btnLoading && !form.isFieldTouched('style')) ||
                      !form.isFieldTouched('title') ||
                      !form.isFieldTouched('isPublic') ||
                      (!form.getFieldValue('isPublic') &&
                        !form.isFieldTouched('password')) ||
                      form
                        .getFieldsError()
                        .filter(({ errors }) => errors?.length).length > 0
                    }
                    loading={btnLoading}
                  >
                    공부방 만들기
                  </Button>
                )}
              </Form.Item>
              {!form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors?.length)
                  .length > 0}
            </div>
          </Form>
        </StyledBoxWrapper>
      </StyledRestrictedArea>
    </MainLayout>
  );
};

const StudyCardSelectableControl: React.FC<IStudyCardSelectableControlProps> = ({
  value,
  onChange,
}) => {
  const [cardType, setCardType] = useState<StudyCardStyle>();

  const triggerChange = (changedValue: StudyCardStyle) => {
    onChange?.(changedValue);
  };

  const onClickCard = (newValue: StudyCardStyle) => {
    setCardType(newValue);
    triggerChange(newValue);
  };

  useEffect(() => {
    setCardType(value);
  }, []);

  return (
    <div tw="flex space-x-3.5">
      {(['style_1', 'style_2', 'style_3', 'style_4'] as StudyCardStyle[]).map(
        (type) => (
          <StudyCardSelectable
            key={type}
            style={type}
            focused={cardType === type}
            onClick={() => {
              onClickCard(type);
            }}
          />
        ),
      )}
    </div>
  );
};

export default CreateStudy;
