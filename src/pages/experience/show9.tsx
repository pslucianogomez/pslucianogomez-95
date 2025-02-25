import { useState } from 'react';
import {
    Button,
    Frame,
    GroupBox,
    WindowHeader
} from 'react95';

export const Show9 = () => {

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
                    <WindowHeader>Venon Solutions, Córdoba, Argentina</WindowHeader> :
                    <WindowHeader>Venon Solutions, Córdoba, Argentina</WindowHeader>
                }

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                }}>
                    <div style={{ fontWeight: 'bold' }}>
                        {isEnglish ? "(Aug. 2020 – Nov. 2021)" : "(Ago. 2020 – Nov. 2021)"}
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
                        The Walker Group – Whistleblower Platform for Incident Reporting and Tracking
                    </h2>
                    :
                    <h2 style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                        The Walker Group. / Sitio the Wistle Blower, para denuncias,
                        reporte de insidentes y seguimiento de los casos.
                    </h2>
                }

                <br />

                {isEnglish &&
                    <GroupBox label='Abstract'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`This project consists of three interconnected platforms, all in production:
                            • An internal portal for staff and case management supervisors.
                            • A secure site for anonymous incident reporting.
                            • A web API identity provider for IT system integration.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these solutions, working directly with the client under an Agile methodology in a remote environment.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            The platforms were built using Microsoft’s technology stack, including Entity Framework and SQL Server, with an architecture based on Microservices and Web APIs deployed on Azure. The frontend was developed using React, and the development process was carried out with Visual Studio 2022 and Visual Studio Code.
                        </p>
                    </GroupBox>
                }
                {!isEnglish &&
                    <GroupBox label='Resumen'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`El proyecto abarca tres plataformas interconectadas, todas en producción:
                            • Un portal interno para el personal y supervisores responsables de la gestión de casos.
                            • Un sitio anónimo para la denuncia de incidentes de manera segura.
                            • Una API web de identidad para la integración con sistemas de TI.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            Como Desarrollador Senior, participé en el análisis, arquitectura, diseño y desarrollo de estas soluciones, colaborando directamente con el cliente bajo una metodología Ágil y en un entorno de trabajo remoto.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            Las plataformas fueron desarrolladas con el ecosistema tecnológico de Microsoft, utilizando Entity Framework y SQL Server, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure. El frontend se construyó con React, y el desarrollo se llevó a cabo en Visual Studio 2022 y Visual Studio Code.
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
                            onClick={() => window.location.href = '/experience/8'}
                        >{isEnglish ? '< - Prev' : '< - Ant'}</Button>
                        <Button
                            size='md'
                            //active={!isEnglish}
                            onClick={() => window.location.href = '/experience/10'}
                        >{isEnglish ? 'Next - >' : 'Sig - >'}</Button>
                    </div>
                </div>

            </Frame>
        </>
    );
}
