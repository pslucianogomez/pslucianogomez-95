import { useState } from 'react';
import {
    Button,
    Frame,
    GroupBox,
    WindowHeader
} from 'react95';

export const Show7 = () => {

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
                <WindowHeader>Agilesight, Córdoba, Argentina</WindowHeader>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                }}>
                    <div style={{ fontWeight: 'bold' }}>
                        {isEnglish ? "(Feb. 2016 - Jul. 2017)" : "(Feb. 2016 - Jul. 2017)"}
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
                        Microsoft. – Discovery API / CRM Migration
                    </h2>
                    :
                    <h2 style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                        Microsoft. - API de Discovery / Migración de CRM
                    </h2>
                }

                <br />

                {isEnglish &&
                    <GroupBox label='Abstract'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`This project involves the creation of many APIs to migrate the functions of Microsoft's CRM On-Premise to a new web version.
                            • A user and permissions API.
                            • An agenda and calendar API.
                            • An updates API according to subscriber.
                            • A notifications API.
                            • A support ticket system integration API.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these solutions, working directly with the client under an Agile methodology in a remote environment.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            The platforms were built using Microsoft’s technology stack, including Entity Framework and SQL Server, with an architecture based on Microservices and Web APIs deployed on Azure, and the development process was carried out with Visual Studio 2022 and Visual Studio Code.
                        </p>
                    </GroupBox>
                }
                {!isEnglish &&
                    <GroupBox label='Resumen'>
                        <p style={{ padding: '0.5rem', whiteSpace: 'pre-line' }}>
                            {`Este proyecto abarca la creación de muchas APIs para migrar las funciones del CRM On-Premise de Microsoft a una nueva versión web.
                            • Una API de usuarios y permisos.
                            • Una API para agenda y calendario.
                            • Una API de actualizaciones segun suscriptor.
                            • Una API de notificaciones.
                            • Una API de integración con el sistema de tickets de soporte.`}
                        </p>

                        <p style={{ padding: '0.5rem' }}>
                            Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo de estas soluciones, trabajando directamente con el cliente bajo una metodología Ágil en un entorno remoto.
                        </p>
                        <p style={{ padding: '0.5rem' }}>
                            Las plataformas fueron construidas utilizando la pila tecnológica de Microsoft, incluyendo Entity Framework y SQL Server, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure, y el proceso de desarrollo se llevó a cabo con Visual Studio 2022 y Visual Studio Code.
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
                            onClick={() => window.location.href = '/experience/6'}
                        >{isEnglish ? '< - Prev' : '< - Ant'}</Button>
                        <Button
                            size='md'
                            //active={!isEnglish}
                            onClick={() => window.location.href = '/experience/8'}
                        >{isEnglish ? 'Next - >' : 'Sig - >'}</Button>
                    </div>
                </div>

            </Frame>
        </>
    );
}
