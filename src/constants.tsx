import { Experience } from './data/experiences';

export const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/pslucianogomez',
    github: 'https://github.com/pslucianogomez',
    phone: '+54 (351) - 341 3865',
    email: 'pslucianogomez@gmail.com',
    location: 'Córdoba, Argentina'
};

export const profileSummary = {
    eng: `Senior .NET Full Stack Developer with 15+ years of experience in desktop and web applications. Passionate about continuous learning, teamwork, and building efficient, scalable solutions.`,
    esp: `Desarrollador Senior .NET Full Stack con más de 15 años de experiencia en aplicaciones de escritorio y web. Apasionado por el aprendizaje continuo, el trabajo en equipo y la creación de soluciones eficientes y escalables.`
};

export const localStorageHelper = {
    setItem: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key);
    },
};

export const intro = {
    "eng": `I am a proactive individual with a strong growth mindset and a continuous drive to learn and evolve. I quickly adapt to new challenges and environments, always seeking opportunities to acquire new skills and enhance my performance. \n
    I’m passionate about teamwork and deeply value interdisciplinary collaboration. I enjoy connecting with people from diverse backgrounds, roles, and departments, believing that shared ideas are key to driving innovative solutions. \n
    As a creative professional, I’m always looking for ways to improve processes, optimize outcomes, and raise the bar for quality. I believe in moving forward, staying innovative, and leading with purpose. \n
    Self-management, independent learning, and empathetic leadership are essential to my approach. I see myself as a connector—bridging ideas, people, and organizations to create meaningful progress. \n
    Technology and music are not just part of my professional life—they are constant sources of energy and inspiration in my daily routine.`,

    "esp": `Soy una persona proactiva, con una mentalidad de crecimiento constante y una fuerte inclinación por el aprendizaje continuo. Me adapto con rapidez a nuevos entornos y desafíos, y disfruto incorporando habilidades y conocimientos que potencien mis resultados. \n
    Me apasiona el trabajo en equipo y valoro profundamente la colaboración interdisciplinaria. Me siento cómodo interactuando con personas de diferentes perfiles, áreas y niveles de responsabilidad, ya que creo firmemente en el poder de las ideas compartidas para lograr soluciones innovadoras. \n
    Como profesional creativo, siempre estoy buscando formas de mejorar procesos, optimizar resultados y elevar el estándar de calidad en todo lo que hago. Creo en moverse hacia adelante, en innovar constantemente y en liderar con propósito. \n
    Me motiva la autogestión, el aprendizaje autónomo y la posibilidad de guiar equipos con empatía y visión estratégica. Me considero un puente entre ideas, personas y organizaciones, generando conexiones que impulsan el desarrollo colectivo. \n
    La tecnología y la música no solo forman parte de mi vida profesional, sino que también son motores clave de mi inspiración diaria.`,
};

export const career = {
    "eng": `I have over 15 years of experience in the development of desktop and web applications, and more than a year and a half specializing in process automation, working with some of the most prominent international companies in their respective industries. \n
    My core strengths lie in my commitment to continuous learning and staying up-to-date with emerging technologies, combined with a strong ability to apply those technologies to build efficient, scalable, and real-world problem-solving applications. \n
    I have a solid technical background in C#, .NET, and SQL Server, along with hands-on experience in modern front-end frameworks like React, as well as a wide array of tools, libraries, and development environments. Throughout my career, I’ve built software solutions for various industries including finance, insurance, and retail, which has given me a comprehensive and adaptable perspective across different business domains and technical challenges.`,
    
    "esp": `Cuento con más de 15 años de experiencia en el desarrollo de aplicaciones de escritorio y web, y más de un año y medio en automatización de procesos, trabajando para algunas de las empresas internacionales más reconocidas en sus sectores. \n
    Mi principal fortaleza radica en la formación continua y el aprendizaje constante de nuevas tecnologías, sumado a una alta capacidad para aplicarlas de manera práctica en la resolución de problemas reales, mediante soluciones eficientes y escalables. \n
    Poseo una sólida trayectoria en C#, .NET y SQL Server, así como en tecnologías modernas como React, y un amplio conjunto de herramientas, frameworks y librerías complementarias. He desarrollado soluciones para diversas industrias, incluyendo los sectores financiero, asegurador y retail, lo que me ha permitido adquirir una visión integral y versátil sobre distintos modelos de negocio y entornos de desarrollo.`,
};

export const skills = {
    language: [
        { "name": "C/C++", "level": "Low/Medium" },
        { "name": "C# .NET", "level": "Advanced" },
        { "name": "VB .NET", "level": "Advanced" },
        { "name": "Javascript/JQuery/React", "level": "Advanced" },
        { "name": "Typecstipt/React/Next.js", "level": "Medium" },
        { "name": "Node.Js", "level": "Medium" },
        { "name": "HTML/CSS", "level": "Advanced" },
        { "name": "Python", "level": "Low" },
        { "name": "Java", "level": "Medium" },
    ],
    database: [
        { "name": "SQL Server (2005 - 2022)", "level": "Advanced" },
        { "name": "My SQL", "level": "Advanced" },
        { "name": "PostgreSQL", "level": "Advanced" },
        { "name": "Cosmos db", "level": "Advanced" },
        { "name": "Mongo db (No Relational)", "level": "Advanced" },
    ],
    mobile: [
        { "name": "Ionic Framework (Cordova)", "level": "Medium" },
        { "name": "React Native", "level": "Medium" },
        { "name": "Xamarin", "level": "Low" },
    ],
    other: [
        { "name": "Ionic Framework (Cordova)", "level": "Medium" },
        { "name": "React Native", "level": "Medium" },
        { "name": "Xamarin", "level": "Low" },
        { "name": "Git", "level": "Advanced" },
        { "name": "Jira", "level": "Advanced" },
        { "name": "Confluence", "level": "Advanced" },
        { "name": "TFS", "level": "Advanced" },
        { "name": "SVN", "level": "Advanced" },
        { "name": "Azure DevOps", "level": "Advanced" },
        { "name": "Docker", "level": "Medium" },
        { "name": "Kubernetes", "level": "Medium" },
        { "name": "Jenkins", "level": "Advanced" },
        { "name": "SonarQube", "level": "Low" },
        { "name": "Swagger", "level": "Advanced" },
        { "name": "Postman", "level": "Advanced" },
        { "name": "Telerik", "level": "Advanced" },
        { "name": "DevExpress", "level": "Advanced" },
        { "name": "Material UI", "level": "Advanced" },
        { "name": "Bootstrap", "level": "Advanced" },
        { "name": "Agile (Scrum/Kanban)", "level": "Advanced" },
    ],
}

export const experiences = [
    { "id": 11, "title": ".NET Full Stack Developer Sr.", "company": "Tarmac", "client": "Recuro Health", "techStack": ".NET Core, E.F. Core, SQL Server, Razor, Azure", "period": "Aug. 2023 - Current" },
    { "id": 10, "title": ".NET Full Stack Developer Sr.", "company": "Quisitive", "client": "Ledgerpay", "techStack": ".NET Core, E.F. Core, SQL Server, React, Azure", "period": "Nov. 2021 - Jul. 2023" },
    { "id": 9, "title": ".NET Backend Developer Sr.", "company": "Venon Solutions", "client": "The Walker Group", "techStack": ".NET Core, E.F. Core, SQL Server, Azure", "period": "Aug. 2020 - Nov. 2021" },
    { "id": 8, "title": ".NET Backend Developer Sr.", "company": "Santex", "client": "ITA Group Inc.", "techStack": ".NET Core, E.F. Core, SQL Server, Azure", "period": "Jul. 2017 - Aug. 2020" },
    { "id": 7, "title": ".NET Backend Developer Sr.", "company": "Agilesight", "client": "Microsoft", "techStack": ".NET Core, E.F. Core, SQL Server, Azure", "period": "Aug. 2015 - Jul. 2017" },
    // { "id": 6, "title": ".NET Backend Developer Sr.", "company": "GlobalLogic", "client": "Disa Corp.", "techStack": ".NET Framework, MVC 3/4, E.F., SQL Server", "period": "Aug. 2015 - Jan. 2016" },
    { "id": 5, "title": ".NET Backend Developer Sr.", "company": "Globant", "client": "OCA", "techStack": ".NET Framework, MVC 3/4, E.F., SQL Server", "period": "Jan. 2015 - Jul. 2015" },
    { "id": 4, "title": ".NET Backend Developer Ssr.", "company": "Globant", "client": "Deloitte", "techStack": ".NET Framework, MVC 3/4, E.F., SQL Server", "period": "Aug. 2014 - Dec. 2014" },
    { "id": 3, "title": ".NET Backend Developer Ssr.", "company": "Sofrecom", "client": "Telecom/Personal", "techStack": ".NET Framework, MVC 3/4, E.F., SQL Server", "period": "Jan. 2015 - Jul. 2015" },
    { "id": 2, "title": ".C++ Automation Ssr.", "company": "Globant", "client": "AutoDesk", "techStack": "C++, Qt, Python", "period": "Jan. 2012 - Apr. 2013" },
    { "id": 1, "title": ".C# Automation Ssr.", "company": "Vates S.A.", "client": "Intel", "techStack": "C#, Selenium, NUnit, Jenkins", "period": "Oct. 2010 - Jan. 2012" },
];

export const experienceDetails: Experience[] = [
    {
        id: '11',
        company: 'Tarmac',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Nov. 2022 – Present)',
            es: '(Nov. 2022 – Actual)'
        },
        title: {
            en: 'Recuro Health – Clinical History and Video Call Assistance Portals',
            es: 'Recuro Health – Portales para Historial Clínico y Asistencia por Videollamada'
        },
        abstract: {
            en: `This project encompasses four interconnected platforms, all fully operational:
                • Provider Portal: A dedicated platform for medical staff.
                • Member Portal: A patient-facing access portal.
                • Agent Portal: A site tailored for administrative personnel.
                • Admin Portal: A centralized system management platform.

                As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these portals and their supporting APIs. Collaborating remotely with the client in an Agile environment, I ensured seamless delivery of robust, user-focused solutions.

                The platforms were developed using the Microsoft ASP.NET technology stack, leveraging Entity Framework and Dapper for data access. Adopting a Microservices architecture with Web APIs, the solution was deployed on Azure. Development was executed using Visual Studio 2019 and 2022, ensuring a modern and efficient workflow.`,
            es: `Este proyecto abarca cuatro plataformas interconectadas, todas en funcionamiento:
                • Portal de Proveedores: Una plataforma dedicada para el personal médico.
                • Portal de Miembros: Un portal de acceso para pacientes.
                • Portal de Agentes: Un sitio adaptado para el personal administrativo.
                • Portal de Administración: Una plataforma centralizada de gestión de sistemas.
                
                Como Desarrollador Senior, era responsable del análisis, arquitectura, diseño y desarrollo de estos portales y sus APIs de soporte. Colaborando de manera remota con el cliente en un entorno Ágil, aseguré la entrega sin complicaciones de soluciones robustas y enfocadas en el usuario.

                Las plataformas fueron desarrolladas utilizando la pila tecnológica Microsoft ASP.NET, utilizando Entity Framework y Dapper para el acceso a datos. Adoptando una arquitectura de Microservicios con Web APIs, la solución fue desplegada en Azure. El desarrollo se llevó a cabo utilizando Visual Studio 2019 y 2022, asegurando un flujo de trabajo moderno y eficiente.`
        },
        role: '.NET Full Stack Developer Sr.',
        technologies: '• .NET Core, • Entity Framework Core, • SQL Server, • Razor, • Azure, • Microservices, • Web APIs, • Dapper, • Visual Studio 2019 & 2022.'
    },
    {
        id: '10',
        company: 'Quisitive',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Nov. 2021 – Jul. 2023)',
            es: '(Nov. 2021 – Jul. 2023)'
        },
        title: {
            en: 'LedgerPay – PayiQ Portal: Virtual Wallet with Client Loyalty Engine',
            es: 'LedgerPay – PayiQ Portal: Billetera Virtual con Motor de Fidelización de Clientes'
        },
        abstract: {
            en: `The project consists of two interconnected platforms, both in production:
            • A transaction registration portal, built with a React SPA and powered by a middleware Web API.
            • The CTP Engine, an API service designed to generate personalized offers based on customers' latest purchases.

            As a Senior .NET Full Stack Developer, I was focused on the analysis, architecture, design, and development of the PayiQ site and middleware API, collaborating directly with the client in a remote and Agile environment.

            The platform was developed using the Microsoft technology stack, with Entity Framework, Web APIs, and a microservices architecture deployed on Azure, while the frontend was built with React as a Single Page Application (SPA).`,
            es: `El proyecto comprende dos plataformas interconectadas, ambas en producción:
            • Portal de registro de transacciones: Desarrollado como una Aplicación de Página Única (SPA) en React, respaldada por una Web API de middleware.
            • Motor CTP: Un servicio API diseñado para generar ofertas personalizadas basadas en el historial de consumo de los clientes.
            
            En mi rol como Desarrollador Senior .NET Full Stack, estaba enfocado en el análisis, la arquitectura, el diseño y el desarrollo del portal PayiQ y su API de middleware. Trabajé en estrecha colaboración con el cliente en un entorno Ágil y remoto, asegurando soluciones técnicas alineadas con sus necesidades.

            La plataforma se construyó utilizando el ecosistema tecnológico de Microsoft, integrando Entity Framework y Web APIs dentro de una arquitectura de microservicios alojada en Azure. El frontend, por su parte, fue desarrollado en React como una SPA, garantizando una experiencia de usuario dinámica y eficiente.`
        },
        role: '.NET Full Stack Developer Sr.',
        technologies: '• .NET Core, • Entity Framework Core, • Cosmos DB, • React, • Azure, • Microservices, • Web APIs, • Azure Hub, • Visual Studio 2022 / VSCode.'
    },
    {
        id: '9',
        company: 'Venon Solutions',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Aug. 2020 – Nov. 2021)',
            es: '(Ago. 2020 – Nov. 2021)'
        },
        title: {
            en: 'The Walker Group – Whistleblower Platform for Incident Reporting and Tracking',
            es: 'The Walker Group. / Sitio the Wistle Blower, para denuncias, reporte de insidentes y seguimiento de los casos.'
        },
        abstract: {
            en: `This project consists of three interconnected platforms, all in production:
              • An internal portal for staff and case management supervisors.
              • A secure site for anonymous incident reporting.
              • A web API identity provider for IT system integration.

              As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these solutions, working directly with the client under an Agile methodology in a remote environment.

              The platforms were built using Microsoft's technology stack, including Entity Framework and SQL Server, with an architecture based on Microservices and Web APIs deployed on Azure. The frontend was developed using React, and the development process was carried out with Visual Studio 2022 and Visual Studio Code.`,
            es: `El proyecto abarca tres plataformas interconectadas, todas en producción:
              • Un portal interno para el personal y supervisores responsables de la gestión de casos.
              • Un sitio anónimo para la denuncia de incidentes de manera segura.
              • Una API web de identidad para la integración con sistemas de TI.

              Como Desarrollador Senior, participé en el análisis, arquitectura, diseño y desarrollo de estas soluciones, colaborando directamente con el cliente bajo una metodología Ágil y en un entorno de trabajo remoto.

              Las plataformas fueron desarrolladas con el ecosistema tecnológico de Microsoft, utilizando Entity Framework y SQL Server, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure. El frontend se construyó con React, y el desarrollo se llevó a cabo en Visual Studio 2022 y Visual Studio Code.`
        },
        role: '.NET Backend Developer Sr.',
        technologies: '• .NET Core, • Entity Framework Core, • SQL Server, • React, • Azure, • Microservices, • Web APIs, • Visual Studio 2022 / VS Code.'
    },
    {
        id: '8',
        company: 'Santex',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Jul. 2017 - Aug. 2020)',
            es: '(Jul. 2017 - Ago. 2020)'
        },
        title: {
            en: 'ITA Group Inc. – Incent and reward coworkers with a recognition platform (Acclaim Recognition app)',
            es: 'ITA Group Inc. - Incentivar y recompensar a los compañeros de trabajo con una plataforma de reconocimiento (Acclaim Recognition app)'
        },
        abstract: {
            en: `This project encompasses five interconnected platforms, all in production:
              • A rewards portal that allows users to exchange stars/points by category and redeem them for prizes.
              • A recognition platform for sending and receiving badges and certificates.
              • An airline consultation API for flight ticket availability.
              • A web API supporting the recognition platform.
              • A web API identity provider for credential federation and secure account management.

              As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these solutions, working directly with the client under an Agile methodology in a remote environment.

              The platforms were built using Microsoft's technology stack, including Entity Framework and SQL Server, with an architecture based on Microservices and Web APIs deployed on Azure. The frontend was developed using Angular and Razor, and the development process was carried out with Visual Studio 2022 and Visual Studio Code.`,
            es: `Este proyecto abarca cinco plataformas interconectadas, todas en producción:
              • Un portal de recompensas que permite a los usuarios intercambiar estrellas/puntos por categoría y canjearlos por premios.
              • Una plataforma de reconocimiento para enviar y recibir insignias y certificados.
              • Una API de consulta de aerolíneas para la disponibilidad de boletos de avión.
              • Una API web que soporta la plataforma de reconocimiento.
              • Un proveedor de identidad de API web para la federación de credenciales y la gestión segura de cuentas.

              Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo de estas soluciones, trabajando directamente con el cliente bajo una metodología Agile en un entorno remoto.

              Las plataformas fueron construidas utilizando la pila tecnológica de Microsoft, incluyendo Entity Framework y SQL Server, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure. El frontend fue desarrollado utilizando Angular y Razor, y el proceso de desarrollo se llevó a cabo con Visual Studio 2022 y Visual Studio Code.`
        },
        role: '.NET Backend Developer Sr.',
        technologies: '• .NET Core, • Entity Framework Core, • SQL Server, • React, • Azure, • Microservices, • Web APIs, • Visual Studio 2015 / VS Code.'
    },
    {
        id: '7',
        company: 'Agilesight',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Aug. 2015 - Jul. 2017)',
            es: '(Ago. 2015 - Jul. 2017)'
        },
        title: {
            en: 'Microsoft. – Discovery API / CRM Migration',
            es: 'Microsoft. - API de Discovery / Migración de CRM'
        },
        abstract: {
            en: `This project involves the creation of many APIs to migrate the functions of Microsoft's CRM On-Premise to a new web version.
              • A user and permissions API.
              • An agenda and calendar API.
              • An updates API according to subscriber.
              • A notifications API.
              • A support ticket system integration API.

              As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these solutions, working directly with the client under an Agile methodology in a remote environment.

              The platforms were built using Microsoft's technology stack, including Entity Framework and SQL Server, with an architecture based on Microservices and Web APIs deployed on Azure, and the development process was carried out with Visual Studio 2022 and Visual Studio Code.`,
            es: `Este proyecto abarca la creación de muchas APIs para migrar las funciones del CRM On-Premise de Microsoft a una nueva versión web.
              • Una API de usuarios y permisos.
              • Una API para agenda y calendario.
              • Una API de actualizaciones segun suscriptor.
              • Una API de notificaciones.
              • Una API de integración con el sistema de tickets de soporte.

              Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo de estas soluciones, trabajando directamente con el cliente bajo una metodología Ágil en un entorno remoto.

              Las plataformas fueron construidas utilizando la pila tecnológica de Microsoft, incluyendo Entity Framework y SQL Server, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure, y el proceso de desarrollo se llevó a cabo con Visual Studio 2022 y Visual Studio Code.`
        },
        role: '.NET Backend Developer Sr.',
        technologies: '• .NET Core, • Entity Framework Core, • SQL Server, • React, • Azure, • Microservices, • Web APIs, • Visual Studio 2015 / VS Code.'
    },
    {
        id: '5',
        company: 'Globant',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Jan. 2015 - Jul. 2015)',
            es: '(Ene. 2015 - Jul. 2015)'
        },
        title: {
            en: 'OCA – Credit card delivery site',
            es: 'OCA - Sitio de entrega de tarjetas de crédito'
        },
        abstract: {
            en: `One single site for the delivery of credit cards to all the customers of Visa and Mastercard, with a small geolocation tracker to follow the delivery status.
              • A Razor site, and some minor redirections to a small SPA for mobile devices, to offer a better experience to the users and self-services.
              • An API to manage the credit cards and the delivery status.
              • A small API to manage the geolocation tracker.
              
              As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these solutions, working directly with the client under an Agile methodology in a remote environment.

              The platforms were built using Microsoft's technology stack, including Entity Framework and SQL Server, with an architecture based on Microservices and Web APIs deployed on Azure, and the development process was carried out with Visual Studio 2010.`,
            es: `Un solo sitio para la entrega de tarjetas de crédito a todos los clientes de Visa y Mastercard, con un pequeño rastreador de geolocalización para seguir el estado de la entrega.
              • Un sitio Razor, y algunas redirecciones menores a un pequeño SPA para dispositivos móviles, para ofrecer una mejor experiencia a los usuarios y servicios autoservicio.
              • Una API para gestionar las tarjetas de crédito y el estado de la entrega.
              • Una pequeña API para gestionar el rastreador de geolocalización.
              
              Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo de estas soluciones, trabajando directamente con el cliente bajo una metodología Ágil en un entorno remoto.

              Las plataformas fueron construidas utilizando la pila tecnológica de Microsoft, incluyendo Entity Framework y SQL Server, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure, y el proceso de desarrollo se llevó a cabo con Visual Studio 2010.`
        },
        role: '.NET Backend Developer Sr.',
        technologies: '• .NET Framework, • MVC 3/4, • Entity Framework, • SQL Server, • Razor, • Visual Studio 2012.'
    },
    {
        id: '4',
        company: 'Globant',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Aug. 2014 - Dec. 2014)',
            es: '(Ago. 2014 - Dic. 2014)'
        },
        title: {
            en: 'Deloitte. – CP3/Audit',
            es: 'Deloitte. - CP3/Audit'
        },
        abstract: {
            en: `This project focused on developing a web application to optimize the CP3/Audit process, emphasizing seamless integration with the client's ERP system. The solution comprised the following components:

            • Web Application: Built to efficiently manage the CP3/Audit process.
            • Integration API: Designed for smooth interaction with the client's ERP system.
            • Authentication and Authorization API: Ensured secure user access and management.

            As a Senior Developer, I was responsible for analyzing, designing, architecting, and developing these solutions. I collaborated directly with the client in a fully remote environment, utilizing Agile methodology to ensure iterative and efficient delivery.

            The platforms leveraged Microsoft's technology stack, incorporating Entity Framework and SQL Server. The architecture employed Microservices and Web APIs deployed on Azure, guaranteeing scalability and reliability. The development process was carried out using Visual Studio 2010.`,
            es: `Este proyecto se enfocó en el desarrollo de una aplicación web para optimizar el proceso CP3/Audit, destacando la integración sin complicaciones con el sistema ERP del cliente. La solución incluyó los siguientes componentes:

            • Aplicación Web: Construida para gestionar eficientemente el proceso CP3/Audit.
            • API de Integración: Diseñada para interactuar de manera suave con el sistema ERP del cliente.
            • API de Autenticación y Autorización: Garantizó acceso seguro y gestión de usuarios.

            Como Desarrollador Senior, fui responsable del análisis, diseño, arquitectura y desarrollo de estas soluciones. Colaboré directamente con el cliente en un entorno remoto totalmente remoto, utilizando una metodología Ágil para garantizar entregas iterativas y eficientes.

            Las plataformas utilizaron la pila tecnológica de Microsoft, incluyendo Entity Framework y SQL Server. La arquitectura empleó Microservicios y Web APIs desplegadas en Azure, garantizando escalabilidad y confiabilidad. El proceso de desarrollo se llevó a cabo utilizando Visual Studio 2010.`
        },
        role: '.NET Backend Developer Sr.',
        technologies: '• .NET Framework, • MVC 3/4, • Entity Framework, • SQL Server, • Razor, • Visual Studio 2010.'
    },
    {
        id: '3',
        company: 'Sofrecom',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Jan. 2015 - Jul. 2015)',
            es: '(Ene. 2015 - Jul. 2015)'
        },
        title: {
            en: 'Telecom/Personal. – Personal Self-Management',
            es: 'Telecom/Personal. - Autogestión Personal'
        },
        abstract: {
            en: `This project involved developing a Personal Self-Management web application integrated with all the company's services and plans, enabling users to purchase, modify, or cancel their subscriptions seamlessly. The solution encompassed the following:

            • Web Application: To manage the Personal Self-Management process.
            • Mobile Application: For on-the-go Personal Self-Management.
            • Web API for User Management: Handling authentication and authorization.
            • Web API for Service Integration: Connecting with all endpoints for various services.

            As a Senior Developer, I was responsible for analyzing, architecting, designing, and developing these solutions. I collaborated directly with the client using Agile methodology in a fully remote environment.

            The platforms were built with Microsoft's technology stack, including Entity Framework and SQL Server, featuring a Microservices-based architecture. Web APIs were deployed on Azure to ensure scalability and reliability, and the development process was carried out using Visual Studio 2010`,
            es: `Este proyecto involucró el desarrollo de una aplicación web de Autogestión Personal integrada con todos los servicios y planes de la empresa, permitiendo a los usuarios comprar, modificar o cancelar sus suscripciones de manera sin complicaciones. La solución incluyó lo siguiente:

            • Aplicación Web: Para gestionar el proceso de Autogestión Personal.
            • Aplicación Móvil: Para Autogestión Personal en cualquier lugar.
            • API Web para Gestión de Usuarios: Manejo de autenticación y autorización.
            • API Web para Integración de Servicios: Conectando con todos los endpoints para diversos servicios.
        
            Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo de estas soluciones, trabajando directamente con el cliente bajo una metodología Ágil en un entorno remoto.

            Las plataformas fueron construidas utilizando la pila tecnológica de Microsoft, incluyendo Entity Framework y SQL Server, con una arquitectura basada en Microservicios y Web APIs desplegadas en Azure, y el proceso de desarrollo se llevó a cabo con Visual Studio 2010.`
        },
        role: '.NET Backend Developer Sr.',
        technologies: '• .NET Framework, • MVC 3/4, • Entity Framework, • SQL Server, • Razor, • Visual Studio 2010.'
    },
    {
        id: '2',
        company: 'Globant',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Jan. 2012 - Apr. 2013)',
            es: '(Ene. 2012 - Abr. 2013)'
        },
        title: {
            en: 'C++ Automation Ssr. - AutoDesk',
            es: 'C++ Automation Ssr. - AutoDesk'
        },
        abstract: {
            en: `This project consists of the development of a C++ application to automate the testing process of the OGS library (One Graphic System). The library was design to draw all 2d lines and leters, was the main library in several AutoDesk products.`,
            es: `Este proyecto consiste en el desarrollo de una aplicación C++ para automatizar el proceso de testing de la librería OGS (One Graphic System). La librería fue diseñada para dibujar todas las líneas y letras en 2D, y fue la librería principal en varios productos de AutoDesk.`
        },
        role: '.NET Backend Developer Sr.',
        technologies: '• C++, • Qt, • Visual Studio 2010.'
    },
    {
        id: '1',
        company: 'Vates S.A.',
        location: 'Córdoba, Argentina',
        period: {
            en: '(Oct. 2010 - Jan. 2012)',
            es: '(Oct. 2010 - Ene. 2012)'
        },
        title: {
            en: 'C# Automation Ssr. - Intel',
            es: 'C# Automation Ssr. - Intel'
        },
        abstract: {
            en: `This project consists of the development of a C# application to automate the process for two big projects, one instaler for windows, and one web app.
        
        As a Ssr Developer, I was responsible for the analysis, and development of these solutions, working directly with the client under an Agile methodology in an on-site environment.

        The platforms were built using Microsoft's technology stack, including NUnit, Ninject, NLog, TFS, and Visual Studio 2008.`,
            es: `Este proyecto consiste en el desarrollo de una aplicación C# para automatizar el proceso para dos grandes proyectos, uno instalador para windows, y uno web app.
        
        Como Desarrollador Senior, fui responsable del análisis, y desarrollo de estas soluciones, trabajando directamente con el cliente bajo una metodología Ágil de manera presencial.

        Las plataformas fueron construidas utilizando la pila tecnológica de Microsoft, incluyendo NUnit, Ninject, NLog, TFS, y Visual Studio 2008.`,
        },
        role: '.NET Backend Developer Sr.',
        technologies: '• .NET Framework, • NUnit, • Ninject, • NLog, • TFS, • Visual Studio 2008.'
    }
]; 