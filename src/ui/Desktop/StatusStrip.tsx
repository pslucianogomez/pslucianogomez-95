import styled from 'styled-components';
import { cosmetic } from '../../theme/tokens';
import { HexAddress } from '../HexAddress';

const Strip = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.space['3']}px;
  background: ${({ theme }) => theme.colors.paperSoft};
  border-bottom: ${({ theme }) => theme.border.thin};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const Left = styled.span` font-weight: 900; `;
const Right = styled.span` display: inline-flex; gap: ${({ theme }) => theme.space['3']}px; align-items: center; `;
const Status = styled.span`
  &::before {
    content: '●';
    color: ${({ theme }) => theme.colors.ok};
    margin-right: 4px;
  }
`;
const LangBtn = styled.button`
  background: transparent;
  border: none;
  font: inherit;
  letter-spacing: 1.5px;
  text-transform: none;
  cursor: crosshair;
`;

export interface StatusStripProps {
  language: 'es' | 'en';
  onToggleLanguage: () => void;
}

export const StatusStrip = ({ language, onToggleLanguage }: StatusStripProps) => (
  <Strip>
    <Left>pslucianogomez · {cosmetic.appVersion}</Left>
    <Right>
      <Status>online</Status>
      <HexAddress />
      <LangBtn onClick={onToggleLanguage} aria-label="toggle language">
        {language === 'es' ? 'ES / en' : 'es / EN'}
      </LangBtn>
    </Right>
  </Strip>
);
