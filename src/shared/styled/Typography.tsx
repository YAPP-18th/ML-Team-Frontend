import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const H1Style = css`
  font-weight: bold;
  font-size: 60px;
  line-height: 72px;
  letter-spacing: -0.8px;
`;

export const H2Style = css`
  font-weight: bold;
  font-size: 48px;
  line-height: 64px;
  letter-spacing: -0.6px;
`;

export const H3Style = css`
  font-weight: bold;
  font-size: 34px;
  line-height: 46px;
  letter-spacing: -0.48px;
`;

export const H4Style = css`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.36px;
`;

export const H5Style = css`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.24px;
`;

export const Subtitle1Style = css`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.18px;
`;

export const Body1Style = css`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.08px;
`;

export const Body2Style = css`
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0;
`;

export const Caption1Style = css`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.1px;
`;

export const Caption2Style = css`
  font-size: 11px;
  line-height: 13px;
  letter-spacing: -0.2px;
`;

export const StdTypoH1 = styled.h1`
  ${H1Style}
`;

export const StdTypoH2 = styled.h2`
  ${H2Style}
`;

export const StdTypoH3 = styled.h3`
  ${H3Style}
`;

export const StdTypoH4 = styled.h4`
  ${H4Style}
`;

export const StdTypoH5 = styled.h5`
  ${H5Style}
`;

export const StdTypoSubtitle1 = styled.h6`
  ${Subtitle1Style}
`;

export const StdTypoBody1 = styled.p`
  ${Body1Style}
`;

export const StdTypoBody2 = styled.p`
  ${Body2Style}
`;

export const StdTypoCaption1 = styled.span`
  ${Caption1Style}
`;

export const StdTypoCaption2 = styled.span`
  ${Caption2Style}
`;
