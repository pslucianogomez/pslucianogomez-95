import React, { useState, useRef, useEffect } from 'react';
import {
    Window,
    WindowHeader,
    WindowContent,
    Button,
    TextInput,
    Frame,
    Hourglass,
    GroupBox,
    ScrollView,
} from 'react95';
import { useLanguage } from '../../contexts/LanguageContext';

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const formRef = useRef<HTMLFormElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación de campos requeridos
        if (!formData.name || !formData.email || !formData.message) {
            alert(t('contact.requiredFields'));
            return;
        }

        // Validación de formato de email
        if (!validateEmail(formData.email)) {
            alert(t('contact.invalidEmail'));
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Simular envío de email (delay de 1.5 segundos)
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSubmitStatus('success');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        // Limpiar el mensaje de éxito después de 5 segundos
        setTimeout(() => {
            setSubmitStatus('idle');
        }, 5000);

        setIsSubmitting(false);
    };

    const renderFormContent = () => (
        <>
            <GroupBox label={t('contact.yourInfo')}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '0.75rem' : '1rem',
                    padding: isMobile ? '0.75rem' : '1rem'
                }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                            {t('contact.name')} *
                        </label>
                        <TextInput
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t('contact.namePlaceholder')}
                            fullWidth
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                            {t('contact.email')} *
                        </label>
                        <TextInput
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('contact.emailPlaceholder')}
                            fullWidth
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                            {t('contact.subject')}
                        </label>
                        <TextInput
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder={t('contact.subjectPlaceholder')}
                            fullWidth
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            </GroupBox>

            <GroupBox label={t('contact.message')}>
                <div style={{ padding: isMobile ? '0.75rem' : '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        {t('contact.yourMessage')} *
                    </label>
                    <Frame
                        variant='field'
                        style={{
                            padding: '0.5rem',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    >
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={t('contact.messagePlaceholder')}
                            disabled={isSubmitting}
                            rows={isMobile ? 6 : 8}
                            style={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                fontFamily: 'ms_sans_serif',
                                fontSize: isMobile ? '13px' : '14px',
                                resize: 'vertical',
                                backgroundColor: 'white',
                                color: 'black',
                                minHeight: isMobile ? '120px' : '160px'
                            }}
                        />
                    </Frame>
                </div>
            </GroupBox>

            {/* Estado del envío */}
            {submitStatus === 'success' && (
                <Frame
                    variant='outside'
                    style={{
                        padding: '1rem',
                        backgroundColor: '#c3f0c3',
                        border: '2px solid green'
                    }}
                >
                    <strong>{t('contact.successTitle')}</strong>
                    <br />
                    {t('contact.successMessage')}
                </Frame>
            )}

            {submitStatus === 'error' && (
                <Frame
                    variant='outside'
                    style={{
                        padding: '1rem',
                        backgroundColor: '#f0c3c3',
                        border: '2px solid red'
                    }}
                >
                    <strong>{t('contact.errorTitle')}</strong>
                    <br />
                    {t('contact.errorMessage')}
                </Frame>
            )}

            {/* Botones */}
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '0.5rem',
                justifyContent: 'flex-end',
                paddingTop: isMobile ? '0.75rem' : '1rem',
                borderTop: '1px solid #868686'
            }}>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    primary
                    style={{ 
                        minWidth: isMobile ? '100%' : '120px',
                        width: isMobile ? '100%' : 'auto'
                    }}
                >
                    {isSubmitting ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Hourglass size={16} />
                            {t('contact.sending')}
                        </span>
                    ) : (
                        t('contact.send')
                    )}
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        setFormData({
                            name: '',
                            email: '',
                            subject: '',
                            message: ''
                        });
                    }}
                    disabled={isSubmitting}
                    style={{ 
                        width: isMobile ? '100%' : 'auto'
                    }}
                >
                    {t('contact.clear')}
                </Button>
            </div>

            <div style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#666',
                marginTop: '0.5rem',
                fontStyle: 'italic',
                textAlign: isMobile ? 'center' : 'left'
            }}>
                {t('contact.requiredFields')}
            </div>
        </>
    );

    // Calculate content height
    const headerHeight = 32;
    const paddingHeight = isMobile ? 16 : 32;
    const contentHeight = isMobile 
        ? windowHeight - (headerHeight + paddingHeight)
        : 'auto';

    return (
        <div style={{
            height: isMobile ? '100vh' : 'auto',
            maxHeight: isMobile ? '100vh' : 'none',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            width: isMobile ? '100%' : '1000px'
        }}>
            <Window style={{
                width: '100%',
                height: isMobile ? '100%' : 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <WindowHeader className='window-title'>
                    <span>📧 {t('contact.title')}</span>
                    <Button onClick={() => window.location.href = '/'}>
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>×</span>
                    </Button>
                </WindowHeader>
                <WindowContent style={{ 
                    flex: isMobile ? 1 : 'unset',
                    padding: isMobile ? '0.5rem' : '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    height: isMobile ? `calc(100vh - ${headerHeight}px)` : 'auto',
                    overflow: isMobile ? 'hidden' : 'visible'
                }}>
                    {isMobile ? (
                        <ScrollView style={{ 
                            width: '100%',
                            height: contentHeight,
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        }}>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    padding: '0.5rem'
                                }}>
                            {renderFormContent()}
                                </div>
                            </form>
                        </ScrollView>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                padding: '1rem'
                            }}>
                            {renderFormContent()}
                            </div>
                        </form>
                    )}
                </WindowContent>
            </Window>
        </div>
    );
};


