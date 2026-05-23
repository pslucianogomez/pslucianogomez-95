import styled, { css } from 'styled-components';

type Variant = 'primary' | 'ghost' | 'danger';

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.btc};
    color: ${({ theme }) => theme.colors.ink};
  `,
  ghost: css`
    background: ${({ theme }) => theme.colors.inkPaper};
    color: ${({ theme }) => theme.colors.ink};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.warn};
    color: ${({ theme }) => theme.colors.inkPaper};
  `,
};

export const Button = styled.button<{ $variant?: Variant }>`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['2']}px ${({ theme }) => theme.space['3']}px;
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme }) => theme.shadow.base};
  cursor: crosshair;
  transition: ${({ theme }) => theme.transition};
  ${({ $variant = 'ghost' }) => variantStyles[$variant]};

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 ${({ theme }) => theme.colors.ink};
  }
  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 ${({ theme }) => theme.colors.ink};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
