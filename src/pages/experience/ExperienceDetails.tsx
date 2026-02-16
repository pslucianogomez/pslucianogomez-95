import {
    Button,
    Frame,
    GroupBox,
    Window,
    WindowHeader
} from 'react95';
import { useLanguage } from '../../contexts/LanguageContext';

interface ExperienceDetailsProps {
    company: string;
    location: string;
    period: {
        en: string;
        es: string;
    };
    title: {
        en: string;
        es: string;
    };
    abstract: {
        en: string;
        es: string;
    };
    role: string;
    technologies: string;
    prevId?: string;
    nextId?: string;
}

export const ExperienceDetails = ({
    company,
    location,
    period,
    title,
    abstract,
    role,
    technologies,
    prevId,
    nextId
}: ExperienceDetailsProps) => {
    const { language, t } = useLanguage();

    return (
        <Window
            style={{ width: 1000 }}
        >
            <WindowHeader className='window-title'>
                <span>{company}, {location}</span>
                <Button onClick={() => window.location.href = '/experience'}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>×</span>
                </Button>
            </WindowHeader>
            <Frame
                variant='outside'
                shadow
                style={{
                    padding: '0.5rem',
                    lineHeight: '1.5'
                }}
            >

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                gap: '2rem',
                borderBottom: '2px solid #808080',
                marginBottom: '1rem'
            }}>
                <h2 style={{ 
                    fontWeight: 'bold',
                    fontSize: '18px',
                    margin: 0,
                    flex: 1
                }}>
                    {language === 'en' ? title.en : title.es}
                </h2>
                <div style={{ 
                    fontWeight: 'bold',
                    color: '#666',
                    fontSize: '14px',
                    whiteSpace: 'nowrap'
                }}>
                    {language === 'en' ? period.en : period.es}
                </div>
            </div>

            <GroupBox label={t('experience.abstract')}>
                <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                    {language === 'en' ? abstract.en : abstract.es}
                </p>
            </GroupBox>

            <br />

            <GroupBox label={t('experience.roleTech')}>
                <Frame
                    variant='well'
                    style={{ marginTop: '1rem', padding: '0.1rem 0.25rem', width: '100%' }}
                >
                    {role}
                    <p style={{ padding: '0.5rem' }}>
                        {technologies}
                    </p>
                </Frame>
            </GroupBox>

            <br />

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                padding: '10px',
            }}>
                <div style={{ fontWeight: 'bold' }}>
                    <Button
                        size='md'
                        onClick={() => window.location.href = '/experience'}
                    >
                        {t('experience.backToList')}
                    </Button>
                </div>
                <div>
                    {prevId && (
                        <Button
                            size='md'
                            onClick={() => window.location.href = `/experience/${prevId}`}
                        >{t('experience.prev')}</Button>
                    )}
                    {nextId && (
                        <Button
                            size='md'
                            onClick={() => window.location.href = `/experience/${nextId}`}
                        >{t('experience.next')}</Button>
                    )}
                </div>
            </div>
            </Frame>
        </Window>
    );
}; 