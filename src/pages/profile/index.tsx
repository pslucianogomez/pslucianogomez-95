import React, { useState } from 'react';
import { Frame, Tab, TabBody, Tabs, WindowHeader, Separator } from 'react95';
import { career, intro, skills } from "../../constants";
import { useLanguage } from '../../contexts/LanguageContext';
import profileAvatar from '../../assets/profile-avatar.jpg';

export function Profile() {
    const { language, t } = useLanguage();
    const [state, setState] = useState({
        activeTab: 0
    });

    const handleChange = (
        value: number,
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setState({ activeTab: value });
    };

    const { activeTab } = state;
    const isEnglish = language === 'en';

    return (
        <Frame
            variant='outside'
            shadow
            style={{ padding: '0.5rem', lineHeight: '1.5', width: 1000 }}
        >
            <WindowHeader>{isEnglish ? 'My Profile' : 'Mi Perfil'}</WindowHeader>

            {/* SEO: Hidden h1 for screen readers and search engines */}
            <h1 style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0
            }}>
                Pedro S. Luciano Gomez - Senior .NET Full Stack Developer
            </h1>

            <div style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem'
            }}>
                {/* Columna izquierda - Info de contacto */}
                <div style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                    {/* Avatar */}
                    <Frame
                        variant='field'
                        style={{
                            height: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src={profileAvatar}
                            alt="Pedro S. Luciano Gomez - Senior .NET Full Stack Developer profile photo"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </Frame>

                    {/* Contact info - extends to fill remaining space */}
                    <Frame variant='field' style={{ flex: 1, marginTop: '0.5rem', padding: '0.5rem' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                {isEnglish ? 'Phone' : 'Teléfono'}
                            </div>
                            <div style={{ fontSize: '12px' }}>+54 (351) 341-3865</div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                {isEnglish ? 'Email' : 'Correo'}
                            </div>
                            <div style={{ fontSize: '12px', wordBreak: 'break-all' }}>pslucianogomez@gmail.com</div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                {isEnglish ? 'Location' : 'Ubicación'}
                            </div>
                            <div style={{ fontSize: '12px' }}>Córdoba, Argentina</div>
                        </div>

                        <div>
                            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                {isEnglish ? 'Age' : 'Edad'}
                            </div>
                            <div style={{ fontSize: '12px' }}>{isEnglish ? '41 years old' : '41 años'}</div>
                        </div>
                    </Frame>
                </div>

                {/* Columna derecha - Contenido con tabs */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Tabs value={activeTab} onChange={handleChange}>
                        <Tab value={0}>Intro</Tab>
                        <Tab value={1}>{isEnglish ? "Career" : "Carrera"}</Tab>
                        <Tab value={2}>{isEnglish ? "Skills" : "Aptitudes"}</Tab>
                    </Tabs>

                    <TabBody style={{ height: '320px', overflow: 'hidden' }}>
                        {activeTab === 0 && (
                            <Frame variant='field' style={{ height: '100%', overflow: 'auto' }}>
                                <p style={{ whiteSpace: 'pre-line', padding: '0.5rem', margin: 0 }}>
                                    {isEnglish ? intro.eng : intro.esp}
                                </p>
                            </Frame>
                        )}

                        {activeTab === 1 && (
                            <Frame variant='field' style={{ height: '100%', overflow: 'auto' }}>
                                <p style={{ whiteSpace: 'pre-line', padding: '0.5rem', margin: 0 }}>
                                    {isEnglish ? career.eng : career.esp}
                                </p>
                            </Frame>
                        )}

                        {activeTab === 2 && (
                            <Frame variant='field' style={{ height: '100%', overflow: 'auto' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: '0.5rem',
                                        gap: '1rem'
                                    }}>
                                        <div style={{ flex: 1, textAlign: 'center' }}>
                                            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                {isEnglish ? "Languages" : "Lenguajes"}
                                            </p>
                                            {skills.language.map((skill, index) =>
                                                <div key={index} style={{ fontSize: '12px', marginBottom: '0.25rem' }}>
                                                    {skill.name} ({skill.level})
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ flex: 1, textAlign: 'center' }}>
                                            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                {isEnglish ? "Databases" : "Bases de datos"}
                                            </p>
                                            {skills.database.map((skill, index) =>
                                                <div key={index} style={{ fontSize: '12px', marginBottom: '0.25rem' }}>
                                                    {skill.name} ({skill.level})
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ flex: 1, textAlign: 'center' }}>
                                            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                {isEnglish ? "Other" : "Otros"}
                                            </p>
                                            {skills.other.map((skill, index) =>
                                                <div key={index} style={{ fontSize: '12px', marginBottom: '0.25rem' }}>
                                                    {skill.name} ({skill.level})
                                                </div>
                                            )}
                                        </div>
                                    </div>
                            </Frame>
                        )}
                    </TabBody>
                </div>
            </div>
        </Frame>
    );
}
