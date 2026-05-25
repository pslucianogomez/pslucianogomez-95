export interface Experience {
  id: string;
  company: string;
  client?: string;
  location: string;
  period: { en: string; es: string };
  title: { en: string; es: string };
  abstract: { en: string; es: string };
  role: string;
  technologies: string[];
  tag?: string; // e.g. 'contract' — clarifies parallel/overlapping roles
}

export const experiences: Experience[] = [
  {
    id: '11',
    company: 'Tarmac',
    client: 'Recuro Health',
    location: 'Córdoba, Argentina',
    period: { en: 'Nov. 2022 – Present', es: 'Nov. 2022 – Actual' },
    title: {
      en: 'Recuro Health – Clinical History and Video Call Assistance Portals',
      es: 'Recuro Health – Portales para Historial Clínico y Asistencia por Videollamada',
    },
    abstract: {
      en: `This project encompasses four interconnected platforms, all fully operational:
• Provider Portal: a dedicated platform for medical staff.
• Member Portal: a patient-facing access portal.
• Agent Portal: a site tailored for administrative personnel.
• Admin Portal: a centralized system management platform.

As a Senior Developer, I was responsible for the analysis, architecture, design, and development of these portals and their supporting APIs. Collaborating remotely with the client in an Agile environment, I ensured seamless delivery of robust, user-focused solutions.

The platforms were built on the Microsoft ASP.NET stack, leveraging Entity Framework and Dapper for data access. A Microservices architecture with Web APIs was deployed on Azure. Development was carried out in Visual Studio 2019 and 2022.`,
      es: `Este proyecto abarca cuatro plataformas interconectadas, todas en funcionamiento:
• Portal de Proveedores: una plataforma dedicada para el personal médico.
• Portal de Miembros: un portal de acceso para pacientes.
• Portal de Agentes: un sitio adaptado para el personal administrativo.
• Portal de Administración: una plataforma centralizada de gestión.

Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo de estos portales y sus APIs. Trabajando de manera remota con el cliente en un entorno Ágil, aseguré la entrega de soluciones robustas y enfocadas en el usuario.

Las plataformas se construyeron sobre el stack Microsoft ASP.NET, utilizando Entity Framework y Dapper para el acceso a datos. Arquitectura de Microservicios con Web APIs desplegada en Azure. Desarrollo en Visual Studio 2019 y 2022.`,
    },
    role: '.NET Full Stack Developer Sr.',
    technologies: ['.NET Core', 'Entity Framework Core', 'SQL Server', 'Razor', 'Azure', 'Microservices', 'Web APIs', 'Dapper', 'Visual Studio 2019/2022'],
    tag: 'contract',
  },
  {
    id: '10',
    company: 'Quisitive',
    client: 'LedgerPay',
    location: 'Córdoba, Argentina',
    period: { en: 'Nov. 2021 – Jul. 2023', es: 'Nov. 2021 – Jul. 2023' },
    title: {
      en: 'LedgerPay – PayiQ Portal: Virtual Wallet with Client Loyalty Engine',
      es: 'LedgerPay – PayiQ Portal: Billetera Virtual con Motor de Fidelización',
    },
    abstract: {
      en: `Two interconnected platforms, both in production:
• A transaction registration portal, built as a React SPA backed by a middleware Web API.
• The CTP Engine, an API service designed to generate personalized offers based on customers' latest purchases.

As a Senior .NET Full Stack Developer, I led the analysis, architecture, design, and development of the PayiQ site and its middleware API, working directly with the client in a remote Agile environment.

Built on the Microsoft stack with Entity Framework, Web APIs, and a microservices architecture deployed on Azure. Frontend built with React as a Single Page Application.`,
      es: `Dos plataformas interconectadas, ambas en producción:
• Portal de registro de transacciones: desarrollado como SPA en React, respaldado por una Web API middleware.
• Motor CTP: servicio API diseñado para generar ofertas personalizadas según el historial de consumo.

Como Desarrollador Senior .NET Full Stack, lideré el análisis, arquitectura, diseño y desarrollo del portal PayiQ y su API middleware. Trabajé en estrecha colaboración con el cliente en un entorno Ágil y remoto.

Construido sobre el ecosistema Microsoft, integrando Entity Framework y Web APIs en una arquitectura de microservicios alojada en Azure. Frontend en React (SPA).`,
    },
    role: '.NET Full Stack Developer Sr.',
    technologies: ['.NET Core', 'Entity Framework Core', 'Cosmos DB', 'React', 'Azure', 'Microservices', 'Web APIs', 'Azure Hub', 'Visual Studio 2022', 'VS Code'],
    tag: 'contract',
  },
  {
    id: '9',
    company: 'Venon Solutions',
    client: 'The Walker Group',
    location: 'Córdoba, Argentina',
    period: { en: 'Aug. 2020 – Nov. 2021', es: 'Ago. 2020 – Nov. 2021' },
    title: {
      en: 'The Walker Group – Whistleblower Platform for Incident Reporting and Tracking',
      es: 'The Walker Group – Plataforma Whistleblower para Denuncias y Seguimiento',
    },
    abstract: {
      en: `Three interconnected platforms, all in production:
• An internal portal for staff and case management supervisors.
• A secure site for anonymous incident reporting.
• A Web API identity provider for IT system integration.

As a Senior Developer, I owned the analysis, architecture, design, and development, working directly with the client under Agile methodology in a remote environment.

Microsoft stack with Entity Framework and SQL Server, Microservices and Web APIs deployed on Azure. Frontend in React. Visual Studio 2022 and VS Code.`,
      es: `Tres plataformas interconectadas, todas en producción:
• Portal interno para personal y supervisores de gestión de casos.
• Sitio anónimo para denuncia segura de incidentes.
• API Web de identidad para integración con sistemas de TI.

Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo, trabajando directamente con el cliente bajo metodología Ágil en entorno remoto.

Stack Microsoft con Entity Framework y SQL Server, Microservicios y Web APIs en Azure. Frontend en React. Visual Studio 2022 y VS Code.`,
    },
    role: '.NET Backend Developer Sr.',
    technologies: ['.NET Core', 'Entity Framework Core', 'SQL Server', 'React', 'Azure', 'Microservices', 'Web APIs', 'Visual Studio 2022', 'VS Code'],
  },
  {
    id: '8',
    company: 'Santex',
    client: 'ITA Group Inc.',
    location: 'Córdoba, Argentina',
    period: { en: 'Jul. 2017 – Aug. 2020', es: 'Jul. 2017 – Ago. 2020' },
    title: {
      en: 'ITA Group Inc. – Acclaim Recognition: Coworker Incentives & Rewards Platform',
      es: 'ITA Group Inc. – Acclaim Recognition: Plataforma de Incentivos y Recompensas',
    },
    abstract: {
      en: `Five interconnected platforms, all in production:
• A rewards portal allowing users to exchange star points by category and redeem for prizes.
• A recognition platform for sending and receiving badges and certificates.
• An airline consultation API for flight ticket availability.
• A Web API supporting the recognition platform.
• A Web API identity provider for credential federation and secure account management.

As a Senior Developer, I owned the analysis, architecture, design, and development, working directly with the client under Agile in a remote environment.

Microsoft stack with Entity Framework and SQL Server, Microservices and Web APIs deployed on Azure. Frontend in Angular and Razor.`,
      es: `Cinco plataformas interconectadas, todas en producción:
• Portal de recompensas para canjear estrellas/puntos por categoría y obtener premios.
• Plataforma de reconocimiento para enviar y recibir insignias y certificados.
• API de consulta de aerolíneas para disponibilidad de boletos.
• Web API que soporta la plataforma de reconocimiento.
• Proveedor de identidad Web API para federación de credenciales y gestión segura de cuentas.

Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo, trabajando directamente con el cliente bajo metodología Ágil en entorno remoto.

Stack Microsoft con Entity Framework y SQL Server, Microservicios y Web APIs en Azure. Frontend en Angular y Razor.`,
    },
    role: '.NET Backend Developer Sr.',
    technologies: ['.NET Core', 'Entity Framework Core', 'SQL Server', 'Angular', 'Razor', 'Azure', 'Microservices', 'Web APIs', 'Visual Studio 2015', 'VS Code'],
  },
  {
    id: '7',
    company: 'Agilesight',
    client: 'Microsoft',
    location: 'Córdoba, Argentina',
    period: { en: 'Aug. 2015 – Jul. 2017', es: 'Ago. 2015 – Jul. 2017' },
    title: {
      en: 'Microsoft – Discovery API / CRM Migration',
      es: 'Microsoft – API de Discovery / Migración de CRM',
    },
    abstract: {
      en: `Creation of multiple APIs to migrate Microsoft CRM On-Premise functions to a new web version:
• Users and permissions API.
• Agenda and calendar API.
• Subscriber-based updates API.
• Notifications API.
• Support ticket system integration API.

As a Senior Developer, I owned the analysis, architecture, design, and development, working directly with the client under Agile methodology in a remote environment.

Microsoft stack with Entity Framework and SQL Server, Microservices and Web APIs deployed on Azure.`,
      es: `Creación de múltiples APIs para migrar las funciones del CRM On-Premise de Microsoft a una versión web:
• API de usuarios y permisos.
• API de agenda y calendario.
• API de actualizaciones según suscriptor.
• API de notificaciones.
• API de integración con el sistema de tickets de soporte.

Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo, trabajando directamente con el cliente bajo metodología Ágil en entorno remoto.

Stack Microsoft con Entity Framework y SQL Server, Microservicios y Web APIs en Azure.`,
    },
    role: '.NET Backend Developer Sr.',
    technologies: ['.NET Core', 'Entity Framework Core', 'SQL Server', 'Azure', 'Microservices', 'Web APIs', 'Visual Studio 2015', 'VS Code'],
  },
  {
    id: '5',
    company: 'Globant',
    client: 'OCA',
    location: 'Córdoba, Argentina',
    period: { en: 'Jan. 2015 – Jul. 2015', es: 'Ene. 2015 – Jul. 2015' },
    title: {
      en: 'OCA – Credit Card Delivery Site',
      es: 'OCA – Sitio de Entrega de Tarjetas de Crédito',
    },
    abstract: {
      en: `A single site for credit card delivery to all Visa and Mastercard customers, with a small geolocation tracker for delivery status:
• A Razor site with minor redirections to a small mobile SPA for better self-service UX.
• An API to manage the credit cards and delivery status.
• A small API to manage the geolocation tracker.

As a Senior Developer, I owned the analysis, architecture, design, and development, working directly with the client under Agile methodology in a remote environment.

Microsoft stack with Entity Framework and SQL Server, Microservices and Web APIs deployed on Azure. Visual Studio 2010.`,
      es: `Un único sitio para la entrega de tarjetas de crédito a todos los clientes de Visa y Mastercard, con un pequeño rastreador de geolocalización para seguir el estado:
• Sitio Razor con redirecciones menores a una pequeña SPA mobile para mejor experiencia de autogestión.
• API para gestionar las tarjetas y el estado de entrega.
• Pequeña API para gestionar el rastreador de geolocalización.

Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo, trabajando directamente con el cliente bajo metodología Ágil en entorno remoto.

Stack Microsoft con Entity Framework y SQL Server, Microservicios y Web APIs en Azure. Visual Studio 2010.`,
    },
    role: '.NET Backend Developer Sr.',
    technologies: ['.NET Framework', 'MVC 3/4', 'Entity Framework', 'SQL Server', 'Razor', 'Visual Studio 2012'],
  },
  {
    id: '4',
    company: 'Globant',
    client: 'Deloitte',
    location: 'Córdoba, Argentina',
    period: { en: 'Aug. 2014 – Dec. 2014', es: 'Ago. 2014 – Dic. 2014' },
    title: {
      en: 'Deloitte – CP3/Audit',
      es: 'Deloitte – CP3/Audit',
    },
    abstract: {
      en: `A web application to optimize the CP3/Audit process, with seamless integration to the client's ERP system:
• Web Application to efficiently manage the CP3/Audit process.
• Integration API for smooth interaction with the ERP system.
• Authentication and Authorization API ensuring secure user access.

As a Senior Developer, I owned analysis, design, architecture, and development. Worked directly with the client in a fully remote environment using Agile.

Microsoft stack with Entity Framework and SQL Server, Microservices and Web APIs on Azure. Visual Studio 2010.`,
      es: `Una aplicación web para optimizar el proceso CP3/Audit, integrada con el sistema ERP del cliente:
• Aplicación Web para gestionar eficientemente el proceso CP3/Audit.
• API de Integración para interactuar con el sistema ERP.
• API de Autenticación y Autorización para acceso seguro.

Como Desarrollador Senior, fui responsable del análisis, diseño, arquitectura y desarrollo. Colaboré directamente con el cliente en entorno totalmente remoto bajo metodología Ágil.

Stack Microsoft con Entity Framework y SQL Server, Microservicios y Web APIs en Azure. Visual Studio 2010.`,
    },
    role: '.NET Backend Developer Sr.',
    technologies: ['.NET Framework', 'MVC 3/4', 'Entity Framework', 'SQL Server', 'Razor', 'Visual Studio 2010'],
  },
  {
    id: '3',
    company: 'Sofrecom',
    client: 'Telecom / Personal',
    location: 'Córdoba, Argentina',
    period: { en: 'Jan. 2014 – Jul. 2014', es: 'Ene. 2014 – Jul. 2014' },
    title: {
      en: 'Telecom / Personal – Personal Self-Management',
      es: 'Telecom / Personal – Autogestión Personal',
    },
    abstract: {
      en: `A Personal Self-Management web application integrated with all company services and plans, letting users purchase, modify, or cancel subscriptions seamlessly:
• Web Application for the Self-Management process.
• Mobile Application for on-the-go Self-Management.
• Web API for User Management (auth/authz).
• Web API for Service Integration with endpoint orchestration.

As a Senior Developer, I owned the analysis, architecture, design, and development. Worked directly with the client using Agile in a fully remote environment.

Microsoft stack with Entity Framework and SQL Server, Microservices-based architecture, Web APIs on Azure. Visual Studio 2010.`,
      es: `Aplicación web de Autogestión Personal integrada con todos los servicios y planes de la empresa, permitiendo comprar, modificar o cancelar suscripciones de manera fluida:
• Aplicación Web para gestionar el proceso de Autogestión Personal.
• Aplicación Móvil para Autogestión Personal en cualquier lugar.
• API Web para Gestión de Usuarios (autenticación y autorización).
• API Web para Integración de Servicios, conectando endpoints.

Como Desarrollador Senior, fui responsable del análisis, arquitectura, diseño y desarrollo, trabajando directamente con el cliente bajo metodología Ágil en entorno remoto.

Stack Microsoft con Entity Framework y SQL Server, arquitectura de Microservicios, Web APIs en Azure. Visual Studio 2010.`,
    },
    role: '.NET Backend Developer Ssr.',
    technologies: ['.NET Framework', 'MVC 3/4', 'Entity Framework', 'SQL Server', 'Razor', 'Visual Studio 2010'],
  },
  {
    id: '2',
    company: 'Globant',
    client: 'AutoDesk',
    location: 'Córdoba, Argentina',
    period: { en: 'Jan. 2012 – Apr. 2013', es: 'Ene. 2012 – Abr. 2013' },
    title: {
      en: 'AutoDesk – C++ Automation (OGS Library)',
      es: 'AutoDesk – Automatización C++ (Librería OGS)',
    },
    abstract: {
      en: `A C++ application to automate the testing process of the OGS library (One Graphic System). The library was designed to draw all 2D lines and letters and was the main library across several AutoDesk products.`,
      es: `Aplicación C++ para automatizar el proceso de testing de la librería OGS (One Graphic System). La librería fue diseñada para dibujar todas las líneas y letras en 2D, y fue la librería principal en varios productos de AutoDesk.`,
    },
    role: 'C++ Automation Ssr.',
    technologies: ['C++', 'Qt', 'Python', 'Visual Studio 2010'],
  },
  {
    id: '1',
    company: 'Vates S.A.',
    client: 'Intel',
    location: 'Córdoba, Argentina',
    period: { en: 'Oct. 2010 – Jan. 2012', es: 'Oct. 2010 – Ene. 2012' },
    title: {
      en: 'Intel – C# Automation (Installer + Web App)',
      es: 'Intel – Automatización C# (Instalador + Web App)',
    },
    abstract: {
      en: `A C# application to automate the QA process for two large projects: a Windows installer and a web app.

As a Semi-Senior Developer, I owned the analysis and development, working directly with the client under Agile methodology in an on-site environment.

Microsoft stack including NUnit, Ninject, NLog, TFS, and Visual Studio 2008.`,
      es: `Aplicación C# para automatizar el proceso de QA de dos proyectos grandes: un instalador Windows y una web app.

Como Desarrollador Semi-Senior, fui responsable del análisis y desarrollo, trabajando directamente con el cliente bajo metodología Ágil de manera presencial.

Stack Microsoft incluyendo NUnit, Ninject, NLog, TFS y Visual Studio 2008.`,
    },
    role: 'C# Automation Ssr.',
    technologies: ['C#', 'Selenium', 'NUnit', 'Ninject', 'NLog', 'TFS', 'Jenkins', 'Visual Studio 2008'],
  },
];
