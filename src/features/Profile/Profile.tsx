import styled from 'styled-components';
import { Button } from '../../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWindows } from '../../contexts/WindowsContext';
import { profile } from '../../data/profile';
import { cosmetic } from '../../theme/tokens';
import profileAvatar from '../../assets/profile-avatar.jpg';

const Top = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['3']}px;
  align-items: flex-start;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border: ${({ theme }) => theme.border.thin};
  flex-shrink: 0;
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.xl};
  letter-spacing: -0.3px;
  margin: 0;
`;

const Meta = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 2px;
`;

const Credential = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: ${({ theme }) => theme.space['3']}px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  line-height: 1.3;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme }) => theme.shadow.btc};
  background: ${({ theme }) => theme.colors.inkPaper};
`;

const Bio = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.45;
  margin: ${({ theme }) => theme.space['3']}px 0 0 0;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']}px;
  margin-top: ${({ theme }) => theme.space['4']}px;
`;

const Socials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']}px;
  margin-top: ${({ theme }) => theme.space['4']}px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${({ theme }) => theme.colors.inkPaper};
  text-decoration: none;
  cursor: crosshair;
`;

const Section = styled.section`
  margin-top: ${({ theme }) => theme.space['5']}px;
`;

const SectionHeading = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink};
  padding-bottom: ${({ theme }) => theme.space['1']}px;
  margin: 0 0 ${({ theme }) => theme.space['2']}px 0;
  font-weight: 700;
`;

const Prose = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.55;
  white-space: pre-line;
`;

export const Profile = () => {
  const { t, language } = useLanguage();
  const { open } = useWindows();
  return (
    <>
      <Top>
        <Avatar src={profileAvatar} alt={profile.name} />
        <div>
          <Name>{profile.name}</Name>
          <Meta>{cosmetic.pseudoAddress} · {profile.city}</Meta>
        </div>
      </Top>
      <Credential>⬢ {profile.credential[language]}</Credential>
      {profile.bio[language] && <Bio>{profile.bio[language]}</Bio>}
      <Actions>
        <Button $variant="primary" onClick={() => open('contact', '/contact')}>
          {t('profile.hireMe')}
        </Button>
        {profile.cvPath && (
          <Button as="a" href={profile.cvPath} download $variant="ghost">
            {t('profile.downloadCv')}
          </Button>
        )}
      </Actions>
      <Socials>
        {profile.socials.map((s) => (
          <SocialLink key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</SocialLink>
        ))}
      </Socials>
      {profile.intro[language] && (
        <Section>
          <SectionHeading>{t('profile.about')}</SectionHeading>
          <Prose>{profile.intro[language]}</Prose>
        </Section>
      )}
      {profile.career[language] && (
        <Section>
          <SectionHeading>{t('profile.career')}</SectionHeading>
          <Prose>{profile.career[language]}</Prose>
        </Section>
      )}
    </>
  );
};
