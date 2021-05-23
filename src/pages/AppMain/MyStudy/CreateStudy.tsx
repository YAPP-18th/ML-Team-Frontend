import React, { useEffect } from 'react';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import { StyledBoxWrapper, StyledRestrictedArea } from '@shared/styled/Common';
import { css } from '@emotion/react';
import { Button, Col, Form, Input, Radio, Row, Space } from 'antd';
import { StdTypoBody1 } from '@shared/styled/Typography';
import 'twin.macro';
import TextArea from 'antd/es/input/TextArea';
import { Controller, useForm } from 'react-hook-form';
import StudyCard from '@components/MyStudy/StudyCard';
import { StudyCardSelectable } from '@components/MyStudy/StudyCardSelectable';

const CreateStudy: React.FC = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(form.getFieldsError());
  }, [form.getFieldsError()]);

  return (
    <MainLayout>
      <StyledRestrictedArea maxWidth={840}>
        <StyledBoxWrapper
          css={css`
            margin-top: 60px;
          `}
        >
          <Form form={form} onFinish={(v) => console.log(v)}>
            <div
              css={css`
                > * + * {
                  margin-top: 40px;
                }
              `}
            >
              <Row gutter={10}>
                <Col span={18} push={4} tw="flex gap-2">
                  <StudyCardSelectable style="style_1" focused={true} />
                  <StudyCardSelectable style="style_2" focused={true} />
                  <StudyCardSelectable style="style_3" focused={true} />
                  <StudyCardSelectable style="style_4" focused={true} />
                </Col>
                <Col span={4} pull={18}>
                  <StdTypoBody1 tw="font-bold mt-2">공부방 이미지</StdTypoBody1>
                </Col>
              </Row>
              <Row gutter={10} align="middle">
                <Col span={18} push={4}>
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
                <Col span={4} pull={18}>
                  <StdTypoBody1 tw="font-bold">공부방 이름</StdTypoBody1>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={18} push={4}>
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
                <Col span={4} pull={18}>
                  <StdTypoBody1 tw="font-bold mt-2">공부방 설명</StdTypoBody1>
                </Col>
              </Row>
              <Row gutter={10} align="middle">
                <Col span={18} push={4} tw="flex items-center">
                  <Form.Item
                    name="isPublic"
                    rules={[{ required: true }]}
                    noStyle={true}
                  >
                    <Radio.Group>
                      <Radio value={1}>YES</Radio>
                      <Radio value={2}>NO</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={4} pull={18}>
                  <StdTypoBody1 tw="font-bold">방 공개</StdTypoBody1>
                </Col>
              </Row>
              <Form.Item shouldUpdate noStyle={true}>
                {() => (
                  <Button
                    type="primary"
                    size="large"
                    tw="w-full mt-12"
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

export default CreateStudy;
