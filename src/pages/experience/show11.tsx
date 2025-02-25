import { useState } from 'react';
import {
    Button,
    Frame,
    GroupBox,
    WindowHeader
} from 'react95';

export const Show11 = () => {

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
                    <WindowHeader>Tarmac, Córdoba, Argentina</WindowHeader> :
                    <WindowHeader>Tarmac, Córdoba, Argentina</WindowHeader>
                }

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                }}>
                    <div style={{ fontWeight: 'bold' }}>
                        {isEnglish ? "(Nov. 2022 – Present)" : "(Nov. 2022 – Actual)"}
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
                        Recuro Health – Clinical History and Video Call Assistance Portals.
                    </h2>
                    :
                    <h2 style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                        Recuro Health – Portales para Historial Clínico y Asistencia por Videollamada.
                    </h2>
                }

                <br />

                {isEnglish &&
                    <GroupBox label='Abstract'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`This project consists of four interconnected platforms, all in production:
                            • Provider Portal – A platform for medical staff.
                            • Member Portal – A patient access portal.
                            • Agent Portal – A site for administrative personnel.
                            • Admin Portal – A system management platform.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these portals and APIs, working directly with the client in a remote and Agile environment.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            The platforms were built using the Microsoft ASP technology stack, with Entity Framework and Dapper, following a Microservices and Web APIs architecture deployed on Azure. The development process was carried out using Visual Studio 2019 and 2022.
                        </p>
                    </GroupBox>
                }
                {!isEnglish &&
                    <GroupBox label='Resumen'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`El proyecto abarca cuatro plataformas interconectadas, todas en producción:
                            • Provider Portal – Plataforma para el personal médico.
                            • Member Portal – Portal de acceso para pacientes.
                            • Agent Portal – Sitio para el equipo administrativo.
                            • Admin Portal – Plataforma para la gestión del sistema.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            Como Desarrollador Senior, participé en el análisis, arquitectura, diseño y desarrollo de estos portales y sus APIs, colaborando directamente con el cliente en un entorno remoto y bajo una metodología Ágil.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            Las plataformas fueron desarrolladas con el ecosistema Microsoft ASP, utilizando Entity Framework y Dapper, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure. El desarrollo se llevó a cabo con Visual Studio 2019 y 2022.
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
                            {"• .NET Core, • Entity Framework Core, • SQL Server, • Razor, • Azure, • Microservices, • Web APIs, • Dapper, • Visual Studio 2019 & 2022."}
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
                            onClick={() => window.location.href = '/experience/10'}
                        >{isEnglish ? '< - Prev' : '< - Ant'}</Button>
                        <Button
                            size='md'
                            //active={!isEnglish}
                            disabled
                        >{isEnglish ? 'Next - >' : 'Sig - >'}</Button>
                    </div>
                </div>

            </Frame>
        </>
    );
}
