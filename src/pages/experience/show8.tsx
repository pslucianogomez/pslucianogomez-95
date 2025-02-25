import { useState } from 'react';
import {
    Button,
    Frame,
    GroupBox,
    WindowHeader
} from 'react95';

export const Show8 = () => {

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
                <WindowHeader>Santex, Córdoba, Argentina</WindowHeader>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                }}>
                    <div style={{ fontWeight: 'bold' }}>
                        {isEnglish ? "(Jul. 2017 - Aug. 2020)" : "(Jul. 2017 - Ago. 2020)"}
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
                        ITA Group Inc. – Incent and reward coworkers with a recognition platform (Acclaim Recognition app)
                    </h2>
                    :
                    <h2 style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                        ITA Group Inc. - Incentivar y recompensar a los compañeros de trabajo con una plataforma de reconocimiento (Acclaim Recognition app)
                    </h2>
                }

                <br />

                {isEnglish &&
                    <GroupBox label='Abstract'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`This project encompasses five interconnected platforms, all in production:
                            • A rewards portal that allows users to exchange stars/points by category and redeem them for prizes.
                            • A recognition platform for sending and receiving badges and certificates.
                            • An airline consultation API for flight ticket availability.
                            • A web API supporting the recognition platform.
                            • A web API identity provider for credential federation and secure account management.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these solutions, working directly with the client under an Agile methodology in a remote environment.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            The platforms were built using Microsoft’s technology stack, including Entity Framework and SQL Server, with an architecture based on Microservices and Web APIs deployed on Azure. The frontend was developed using Angular and Razor, and the development process was carried out with Visual Studio 2022 and Visual Studio Code.
                        </p>
                    </GroupBox>
                }
                {!isEnglish &&
                    <GroupBox label='Resumen'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`Este proyecto abarca cinco plataformas interconectadas, todas en producción:
                            • Un portal de recompensas que permite a los usuarios intercambiar estrellas/puntos por categoría y canjearlos por premios.
                            • Una plataforma de reconocimiento para enviar y recibir insignias y certificados.
                            • Una API de consulta de aerolíneas para la disponibilidad de boletos de avión.
                            • Una API web que soporta la plataforma de reconocimiento.
                            • Un proveedor de identidad de API web para la federación de credenciales y la gestión segura de cuentas.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo de estas soluciones, trabajando directamente con el cliente bajo una metodología Agile en un entorno remoto.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            Las plataformas fueron construidas utilizando la pila tecnológica de Microsoft, incluyendo Entity Framework y SQL Server, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure. El frontend fue desarrollado utilizando Angular y Razor, y el proceso de desarrollo se llevó a cabo con Visual Studio 2022 y Visual Studio Code.
                        </p>
                    </GroupBox>
                }

                <br />

                <GroupBox label={isEnglish ? 'Role / Technologies' : 'Rol / Tecnología'} >
                    <Frame
                        variant='well'
                        style={{ marginTop: '1rem', padding: '0.1rem 0.25rem', width: '100%' }}
                    >
                        {".NET Backend Developer Sr."}

                        <p style={{ padding: '0.5rem' }}>
                            {"• .NET Core, • Entity Framework Core, • SQL Server, • React, • Azure, • Microservices, • Web APIs, • Visual Studio 2022 / VS Code."}
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
                            onClick={() => window.location.href = '/experience/7'}
                        >{isEnglish ? '< - Prev' : '< - Ant'}</Button>
                        <Button
                            size='md'
                            //active={!isEnglish}
                            onClick={() => window.location.href = '/experience/9'}
                        >{isEnglish ? 'Next - >' : 'Sig - >'}</Button>
                    </div>
                </div>

            </Frame>
        </>
    );
}
