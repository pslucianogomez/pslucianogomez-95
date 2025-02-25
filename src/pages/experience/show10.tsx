import { useState } from 'react';
import {
    Button,
    Frame,
    GroupBox,
    WindowHeader
} from 'react95';

export const Show10 = () => {

    const [isEnglish, setIsEnglish] = useState(true);

    return (
        <>
            <Frame
                variant='outside'
                shadow
                style={{
                    padding: '0.5rem',
                    lineHeight: '1.5',
                    width: 1000
                }}
            >
                {isEnglish ?
                    <WindowHeader>Quisitive, Córdoba, Argentina</WindowHeader> :
                    <WindowHeader>Quisitive, Córdoba, Argentina</WindowHeader>
                }

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                }}>
                    <div style={{ fontWeight: 'bold' }}>
                        {isEnglish ? "(Nov. 2021 – Jul. 2023)" : "(Nov. 2021 – Jul. 2023)"}
                    </div>
                    <div>
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
                </div>

                {isEnglish ?
                    <h2 style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                        LedgerPay – PayiQ Portal: Virtual Wallet with Client Loyalty Engine
                    </h2>
                    :
                    <h2 style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                        LedgerPay – PayiQ Portal: Billetera Virtual con Motor de Fidelización de Clientes
                    </h2>
                }

                <br />

                {isEnglish &&
                    <GroupBox label='Abstract'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`The project consists of two interconnected platforms, both in production:
                                • A transaction registration portal, built with a React SPA and powered by a middleware Web API.
                                • The CTP Engine, an API service designed to generate personalized offers based on customers' latest purchases.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            As a Senior .NET Full Stack Developer, I was responsible for the analysis, architecture, design, and development of the PayiQ site and middleware API, collaborating directly with the client in a remote and Agile environment.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            The platform was developed using the Microsoft technology stack, with Entity Framework, Web APIs, and a microservices architecture deployed on Azure, while the frontend was built with React as a Single Page Application (SPA).
                        </p>
                    </GroupBox>
                }
                {!isEnglish &&
                    <GroupBox label='Resumen'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`El proyecto abarca dos plataformas interconectadas, ambas en producción:
                            • Un portal de registro de transacciones, desarrollado con una SPA en React y respaldado por una Web API de middleware.
                            • El motor CTP, un servicio API diseñado para generar ofertas personalizadas en función del historial de consumo de los clientes.
                            `}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            Como Desarrollador Senior .NET Full Stack, participé en el análisis, arquitectura, diseño y desarrollo del portal PayiQ y su API middleware, colaborando directamente con el cliente en un entorno Ágil y remoto.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            La plataforma fue desarrollada con el ecosistema tecnológico de Microsoft, utilizando Entity Framework, Web APIs y una arquitectura de microservicios desplegada en Azure, mientras que el frontend fue construido con React como una Aplicación de Página Única (SPA).
                        </p>
                    </GroupBox>
                }

                <br />

                <GroupBox label={isEnglish ? 'Role / Technologies' : 'Rol / Tecnología'} >
                    <Frame
                        variant='well'
                        style={{ marginTop: '1rem', padding: '0.1rem 0.25rem', width: '100%' }}
                    >
                        {".NET Full Stack Developer Sr."}

                        <p style={{ padding: '0.5rem' }}>
                            {"• .NET Core, • Entity Framework Core, • Cosmos DB, • React, • Azure, • Microservices, • Web APIs, • Azure Hub, • Visual Studio 2022 / VSCode."}
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
                            {isEnglish ? '<< - Back to Experience' : '<< - Volver a Experiencias'}
                        </Button>
                    </div>
                    <div>
                        <Button
                            size='md'
                            //active={isEnglish}
                            onClick={() => window.location.href = '/experience/9'}
                        >{isEnglish ? '< - Prev' : '< - Ant'}</Button>
                        <Button
                            size='md'
                            //active={!isEnglish}
                            onClick={() => window.location.href = '/experience/11'}
                        >{isEnglish ? 'Next - >' : 'Sig - >'}</Button>
                    </div>
                </div>

            </Frame>
        </>
    );
}
