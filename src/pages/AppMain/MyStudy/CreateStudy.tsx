import React, { useEffect, useState } from 'react';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import {
  LabelRequiredCircle,
  StyledBoxWrapper,
  StyledRestrictedArea,
} from '@shared/styled/Common';
import { css } from '@emotion/react';
import { Button, Col, Form, Input, Radio, Row, Space } from 'antd';
import { StdTypoBody1, StdTypoBody2 } from '@shared/styled/Typography';
import 'twin.macro';
import TextArea from 'antd/es/input/TextArea';
import { Controller, useForm } from 'react-hook-form';
import StudyCard, { StudyCardStyle } from '@components/MyStudy/StudyCard';
import { StudyCardSelectable } from '@components/MyStudy/StudyCardSelectable';

interface IStudyCardSelectableControlProps {
  value?: StudyCardStyle;
  onChange?: (value: StudyCardStyle) => void;
}

const CreateStudy: React.FC = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

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
            onFinish={(v) => console.log(v)}
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
                    name="cardType"
                    rules={[{ required: true }]}
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
                    <Input
                      placeholder="어떤 공부를 할지 적어주세요"
                      bordered={false}
                    />
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
                  <Form.Item
                    name="description"
                    rules={[{ required: true }]}
                    noStyle={true}
                  >
                    <TextArea
                      placeholder="공부방에 대한 설명을 적어주세요"
                      bordered={false}
                      rows={3}
                      tw="resize-none"
                    />
                  </Form.Item>
                </Col>
                <Col span={4} pull={20}>
                  <StdTypoBody1 tw="font-bold mt-2">공부방 설명</StdTypoBody1>
                </Col>
              </Row>
              <Row gutter={10} align="middle">
                <Col span={20} push={4}>
                  <div tw="relative flex items-center">
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
                  </div>
                  {form.getFieldValue('isPublic') && (
                    <StdTypoBody2 tw="absolute text-gray-6 top-10">
                      모르는 사람이 공부방에 함께 참여할 수 있어요
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
              <Form.Item shouldUpdate noStyle={true}>
                {() => (
                  <Button
                    type="primary"
                    size="large"
                    tw="w-full mt-16"
                    htmlType="submit"
                    disabled={
                      !form.isFieldsTouched(true) ||
                      form
                        .getFieldsError()
                        .filter(({ errors }) => errors?.length).length > 0
                    }
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
