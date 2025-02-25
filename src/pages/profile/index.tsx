import React, { useState } from 'react';
import { Button, Frame, ScrollView, Tab, TabBody, Tabs, WindowHeader } from 'react95';
import { career, intro, skills, } from "../../constants";

export function Profile() {

    const [isEnglish, setIsEnglish] = useState(true);
    const [state, setState] = useState({
        activeTab: 0
    });

    const handleChange = (
        value: number,
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        console.log({ value, event });
        setState({ activeTab: value });
    };

    const { activeTab } = state;


    return (
        <Frame
            variant='outside'
            shadow
            style={{ padding: '0.5rem', lineHeight: '1.5', width: 1000 }}
        >
            <WindowHeader>{isEnglish ? 'My profile' : 'Mi perfil'}</WindowHeader>

            <div style={{
                display: 'flex',
                justifyContent: 'end',
                padding: '10px',
            }}>
                <Button
                    size='sm'
                    active={isEnglish}
                    onClick={() => setIsEnglish(true)}
                >English</Button>
                <Button
                    size='sm'
                    active={!isEnglish}
                    onClick={() => setIsEnglish(false)}
                >Español</Button>
            </div>

            <Tabs value={activeTab} onChange={handleChange}>
                <Tab value={0}>Intro</Tab>
                <Tab value={1}>{isEnglish ? "Career" : "Carrera"}</Tab>
                <Tab value={2}>{isEnglish ? "Skills" : "Aptitudes"}</Tab>
            </Tabs>

            <TabBody style={{ minHeight: 245 }}>
                {activeTab === 0 && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>

                        <Frame
                            variant='field'
                            style={{
                                minHeight: 210,
                            }}
                        >
                            <ScrollView style={{ width: '100%', height: '100%' }}>
                                <div style={{
                                    display: 'flex',
                                }}>
                                    <p style={{ whiteSpace: 'pre-line' }}>
                                        {isEnglish ? intro.eng : intro.esp}
                                    </p>
                                </div>
                            </ScrollView>

                            {/* <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <img style={{
                                        padding: '1rem',
                                        width: '75%',
                                        height: '75%',
                                    }}
                                        src={img}
                                        alt='pslucianogomez'
                                    />
                                </div> */}
                        </Frame>
                    </div>
                )}

                {activeTab === 1 && (
                    <Frame
                        variant='field'
                        style={{
                            minHeight: 210,
                        }}
                    >
                        <ScrollView style={{ width: '100%', height: '100%' }}>
                            <p style={{ whiteSpace: 'pre-line' }}>
                                {isEnglish ? career.eng : career.esp}
                            </p>
                        </ScrollView>
                    </Frame>
                )}

                {activeTab === 2 && (
                    <Frame
                        variant='field'
                        style={{
                            minHeight: 210,
                            maxHeight: 285,
                            width: "100%"
                        }}
                    >
                        <ScrollView style={{
                            width: '100%',
                            //height: '100%'
                            minHeight: 215,
                            maxHeight: 285
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                minHeight: 215,
                                maxHeight: 270
                            }}>
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontWeight: 'bold' }}>
                                            {isEnglish ? "Programming languages:" : "Lenguajes de programación:"}
                                        </p>
                                        <div>
                                            {skills.language.map((skill, index) =>
                                                <div key={index} style={{ textAlign: 'center' }}>
                                                    {`${skill.name} - (${skill.level})`}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </p>

                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontWeight: 'bold' }}>
                                            {isEnglish ? "Databases:" : "Bases de datos:"}
                                        </p>
                                        <div>
                                            {skills.database.map((skill, index) =>
                                                <div key={index} style={{ textAlign: 'center' }}>
                                                    {`${skill.name} - (${skill.level})`}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </p>

                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontWeight: 'bold' }}>
                                            {isEnglish ? "Misc:" : "Varios:"}
                                        </p>
                                        <div>
                                            {skills.other.map((skill, index) =>
                                                <div key={index} style={{ textAlign: 'center' }}>
                                                    {`${skill.name} - (${skill.level})`}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </ScrollView>
                    </Frame>
                )}
            </TabBody>

            <Frame
                variant='well'
                style={{ marginTop: '1rem', padding: '0.1rem 0.25rem', width: '100%' }}
            >
                <p style={{ padding: '0.5rem' }}>
                    {isEnglish ? "• Age: 41 years old • Cell phone: +54 (351) - 341 3865 • E-mail address: pslucianogomez@gmail.com • Address: Dr. Facundo Zuviría 921, Juniors, Córdoba, Córdoba, Argentina. (X5004BCF)" :
                        "• Edad: 41 años • Teléfono: +54 (351) - 341 3865 • correo electrónico: pslucianogomez@gmail.com • Dirección: Dr. Facundo Zuviría 921, Juniors, Córdoba, Córdoba, Argentina. (X5004BCF)"}                </p>
            </Frame>
        </Frame>
    );
}