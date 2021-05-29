import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';
import { Moment } from 'moment';
import locale from 'antd/es/date-picker/locale/ko_KR';

// typographys
import { StdTypoSubtitle1, StdTypoH2 } from '@shared/styled/Typography';

// images
import EmptyImg from '@assets/images/empty.svg';

export const NoReport = () => {
  return (
    <div tw="flex items-center justify-center mt-16 mb-44">
      <img src={EmptyImg} alt="noReport" />
      <StdTypoSubtitle1>이날에 공부한 기록이 없어요</StdTypoSubtitle1>
    </div>
  );
};
