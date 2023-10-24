import { size, typography } from '@shipfast/webapp-core/theme';
import styled from 'styled-components';

export const Text = styled.p`
  ${typography.label};
  ${size.horizontalMargin(size.sizeUnits(2))};
  text-align: left;
`;
