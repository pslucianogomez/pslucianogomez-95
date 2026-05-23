import styled from 'styled-components';

const base = `
  display: block;
  width: 100%;
  font-size: 15px;
  padding: 8px 12px;
  background: #fffdf7;
  border: 2px solid #0a0a0a;
  box-shadow: 4px 4px 0 #0a0a0a;
  outline: none;
  transition: all 80ms steps(4);
  &:focus { box-shadow: 4px 4px 0 #f7931a; }
`;

export const Input = styled.input`${base}`;
export const Textarea = styled.textarea`${base} resize: vertical; min-height: 80px;`;

export const Label = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.space['1']}px;
`;
