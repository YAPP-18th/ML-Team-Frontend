import React from 'react';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import { StyledBoxWrapper, StyledRestrictedArea } from '@shared/styled/Common';
import { css } from '@emotion/react';
import { Button, Col, Input, Radio, Row, Space } from 'antd';
import { StdTypoBody1 } from '@shared/styled/Typography';
import 'twin.macro';
import TextArea from 'antd/es/input/TextArea';

const CreateStudy: React.FC = () => {
  return (
    <MainLayout>
      <StyledRestrictedArea maxWidth={840}>
        <StyledBoxWrapper
          css={css`
            margin-top: 60px;
          `}
        >
          <div
            css={css`
              > * + * {
                margin-top: 40px;
              }
            `}
          >
            <Row gutter={10} align="middle">
              <Col span={18} push={4}>
                ㅁㄴㅇ
              </Col>
              <Col span={4} pull={18}>
                <StdTypoBody1 tw="font-bold">공부방 이미지</StdTypoBody1>
              </Col>
            </Row>
            <Row gutter={10} align="middle">
              <Col span={18} push={4}>
                <Input
                  placeholder="어떤 공부를 할지 적어주세요"
                  bordered={false}
                />
              </Col>
              <Col span={4} pull={18}>
                <StdTypoBody1 tw="font-bold">공부방 이름</StdTypoBody1>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={18} push={4}>
                <TextArea
                  placeholder="공부방에 대한 설명을 적어주세요"
                  bordered={false}
                  rows={3}
                  tw="resize-none"
                />
              </Col>
              <Col span={4} pull={18}>
                <StdTypoBody1 tw="font-bold mt-2">공부방 설명</StdTypoBody1>
              </Col>
            </Row>
            <Row gutter={10} align="middle">
              <Col span={18} push={4} tw="flex items-center">
                <Radio.Group>
                  <Radio value={1}>YES</Radio>
                  <Radio value={2}>NO</Radio>
                </Radio.Group>
              </Col>
              <Col span={4} pull={18}>
                <StdTypoBody1 tw="font-bold">방 공개</StdTypoBody1>
              </Col>
            </Row>
          </div>
          <Button type="primary" size="large" tw="w-full mt-12">
            공부방 만들기
          </Button>
        </StyledBoxWrapper>
      </StyledRestrictedArea>
    </MainLayout>
  );
};

export default CreateStudy;
