import styled from 'styled-components';
import { useState } from 'react';
import { experiences, type Experience } from '../../data/experiences';
import { useLanguage } from '../../contexts/LanguageContext';

const Item = styled.article<{ $expanded: boolean }>`
  background: ${({ theme }) => theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme, $expanded }) => $expanded ? theme.shadow.btc : theme.shadow.base};
  padding: ${({ theme }) => theme.space['3']}px;
  margin-bottom: ${({ theme }) => theme.space['3']}px;
`;

const Period = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink};
  padding-bottom: ${({ theme }) => theme.space['1']}px;
  margin-bottom: ${({ theme }) => theme.space['2']}px;
`;

const Header = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  cursor: crosshair;
`;

const Company = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-weight: 900;
  font-size: ${({ theme }) => theme.fontSize.lg};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Affordance = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
  &::before { content: '['; }
  &::after  { content: ']'; }
`;

const Role = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: 2px;
`;

const Detail = styled.div`
  margin-top: ${({ theme }) => theme.space['3']}px;
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.45;
`;

const Techs = styled.div`
  margin-top: ${({ theme }) => theme.space['3']}px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const Empty = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

const ExperienceCard = ({ exp, isOpen, onToggle, lang, openLabel, closeLabel }: {
  exp: Experience; isOpen: boolean; onToggle: () => void;
  lang: 'en' | 'es'; openLabel: string; closeLabel: string;
}) => (
  <Item $expanded={isOpen}>
    <Period>{exp.period[lang]}</Period>
    <Header onClick={onToggle} aria-expanded={isOpen}>
      <span>
        <Company>▮ {exp.company}</Company>
        <Role>{exp.title[lang]}</Role>
      </span>
      <Affordance>{isOpen ? closeLabel : openLabel}</Affordance>
    </Header>
    {isOpen && (
      <>
        <Detail>{exp.abstract[lang]}</Detail>
        <Techs>stack: {exp.technologies.join(' · ')}</Techs>
      </>
    )}
  </Item>
);

export const ExperienceList = () => {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);
  if (experiences.length === 0) {
    return <Empty>{t('experience.empty')}</Empty>;
  }
  return (
    <div>
      {experiences.map((e) => (
        <ExperienceCard
          key={e.id}
          exp={e}
          isOpen={openId === e.id}
          onToggle={() => setOpenId(openId === e.id ? null : e.id)}
          lang={language}
          openLabel={t('experience.open')}
          closeLabel={t('experience.close')}
        />
      ))}
    </div>
  );
};
