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
  "eng": `Proactive and always willing to learn new stuff. I consider myself a quick learner and a team work enthusiast who loves to interact with different people, roles, departments. \n
    I'm a creative guy who will always look for a way to improve and add quality to my outputs... keep moving and innovate ! I'm motivated about self-management, technology trends and like to lead teams, being a bridge between ideas, people and organizations. \n
    Technology & Music are a must in my daily agenda.`,
  "esp": `Proactivo y siempre dispuesto a aprender cosas nuevas. Me considero un aprendiz rápido y un entusiasta del trabajo en equipo que ama interactuar con diferentes personas, roles y departamentos. \n
    Soy un creativo siempre buscaré una forma de mejorar y agregar calidad a mis resultados... ¡sigue moviéndote e innovando! Motivado por la autogestión, las tendencias tecnológicas y me gusta liderar equipos, siendo un puente entre ideas, personas y organizaciones.\n
    La tecnología y la música son imprescindibles en mi agenda diaria.`,
};

export const career = {
  "eng": `I’ve been working on the development of desktop and web application for more than 15 years, and automation for one and a half year, for some of the most important international companies. \n 
  My principal assets are my constant study and learning of new technologies, as well as my talent in using those technologies in problem solving applications. \n 
  I have a strong background in C#, .NET, SQL Server, React, and several tools and libraries. I have experience in the development of applications for different industries such as financial, insurance, and retail.`,
  "esp": `He estado trabajando en el desarrollo de aplicaciones de escritorio y web durante más de diez años, y en automatización durante un año y medio. \n
  Mis principales activos son mi constante estudio y aprendizaje de nuevas tecnologías, así como mi talento para utilizar esas tecnologías en aplicaciones de resolución de problemas. \n
  Tengo una sólida formación en C#, .NET, SQL Server, React y varias herramientas y bibliotecas. Tengo experiencia en el desarrollo de aplicaciones para diferentes industrias como la financiera, la de seguros y la minorista.`,
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
  { "id": 7, "title": ".NET Backend Developer Sr.", "company": "Agilesight", "client": "Microsoft", "techStack": ".NET Core, E.F. Core, SQL Server, Azure", "period": "Feb. 2016 - Jul. 2017" },
  // { "id": 6, "title": ".NET Backend Developer Sr.", "company": "GlobalLogic", "client": "Disa Corp.", "techStack": ".NET Framework, MVC 3/4, E.F., SQL Server", "period": "Aug. 2015 - Jan. 2016" },
  { "id": 5, "title": ".NET Backend Developer Sr.", "company": "Globant", "client": "OCA", "techStack": ".NET Framework, MVC 3/4, E.F., SQL Server", "period": "Jan. 2015 - Jul. 2015" },
  { "id": 4, "title": ".NET Backend Developer Sr.", "company": "Globant", "client": "Deloitte", "techStack": ".NET Framework, MVC 3/4, E.F., SQL Server", "period": "Aug. 2014 - Dec. 2014" },
  { "id": 3, "title": ".NET Backend Developer Sr.", "company": "Sofrecom", "client": "Telecom/Personal", "techStack": ".NET Framework, MVC 3/4, E.F., SQL Server", "period": "Jan. 2015 - Jul. 2015" },
  { "id": 2, "title": ".C++ Automation Ssr.", "company": "Globant", "client": "AutoDesk", "techStack": "C++, Qt, Python", "period": "Jan. 2012 - Apr. 2013" },
  { "id": 1, "title": ".C# Automation Ssr.", "company": "Vates S.A.", "client": "Intel", "techStack": "C#, Selenium, NUnit, Jenkins", "period": "Oct. 2010 - Jan. 2012" },
];