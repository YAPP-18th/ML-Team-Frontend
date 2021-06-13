import styled from '@emotion/styled';
import { GRAY_11, PRIMARY_8 } from '@shared/styles/colors';

export const StyledRestrictedArea = styled.section<{ maxWidth?: number }>`
  max-width: ${(props) => props.maxWidth || 1194}px;
  width: 100%;
  margin: 0 auto;
  box-sizing: content-box;
`;

export const StyledEmptyCardWrapper = styled.div`
  width: 100%;
  background: ${GRAY_11};
  border-radius: 5px;
`;

export const StyledBoxWrapper = styled.section`
  width: 100%;
  background: ${GRAY_11};
  padding: 40px 46px;
  border-radius: 10px;
`;

export const LabelRequiredCircle = styled.span`
  display: inline-block;
  vertical-align: text-top;
  margin-left: 4px;
  width: 6px;
  height: 6px;
  background: ${PRIMARY_8};
  border-radius: 50%;
`;
