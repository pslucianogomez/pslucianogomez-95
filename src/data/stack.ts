export type StackLevel = 'advanced' | 'medium' | 'low';

export interface StackItem {
  name: string;
  level: StackLevel;
}

export interface StackGroup {
  category: string;
  items: StackItem[];
}

export const stack: StackGroup[] = [
  {
    category: 'LANGUAGES',
    items: [
      { name: 'C# / .NET',                level: 'advanced' },
      { name: 'JavaScript',               level: 'advanced' },
      { name: 'TypeScript',               level: 'medium' },
      { name: 'React',                    level: 'advanced' },
      { name: 'Blazor',                   level: 'advanced' },
      { name: 'Next.js',                  level: 'medium' },
      { name: 'Node.js',                  level: 'medium' },
      { name: 'HTML / CSS',               level: 'advanced' },
      { name: 'Java',                     level: 'medium' },
      { name: 'C / C++',                  level: 'low' },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { name: 'Azure OpenAI',             level: 'advanced' },
      { name: 'LLMs / RAG',               level: 'advanced' },
      { name: 'TensorFlow',               level: 'medium' },
      { name: 'Azure ML',                 level: 'medium' },
    ],
  },
  {
    category: 'CLOUD',
    items: [
      { name: 'Azure',                    level: 'advanced' },
      { name: 'Google Cloud',             level: 'medium' },
    ],
  },
  {
    category: 'DATABASES',
    items: [
      { name: 'SQL Server',               level: 'advanced' },
      { name: 'MySQL',                    level: 'advanced' },
      { name: 'PostgreSQL',               level: 'advanced' },
      { name: 'Cosmos DB',                level: 'advanced' },
      { name: 'MongoDB',                  level: 'advanced' },
    ],
  },
  {
    category: 'ARCHITECTURE & MESSAGING',
    items: [
      { name: 'Clean Architecture',       level: 'advanced' },
      { name: 'DDD',                      level: 'advanced' },
      { name: 'Microservices',            level: 'advanced' },
      { name: 'gRPC',                     level: 'advanced' },
      { name: 'Redis',                    level: 'advanced' },
      { name: 'Kafka',                    level: 'medium' },
      { name: 'RabbitMQ',                 level: 'medium' },
    ],
  },
  {
    category: 'MOBILE',
    items: [
      { name: 'Ionic (Cordova)',          level: 'medium' },
      { name: 'React Native',             level: 'medium' },
      { name: 'Xamarin',                  level: 'low' },
    ],
  },
  {
    category: 'TOOLS & PRACTICES',
    items: [
      { name: 'Git',                      level: 'advanced' },
      { name: 'Azure DevOps',             level: 'advanced' },
      { name: 'Jenkins',                  level: 'advanced' },
      { name: 'Jira',                     level: 'advanced' },
      { name: 'Confluence',               level: 'advanced' },
      { name: 'TFS',                      level: 'advanced' },
      { name: 'SVN',                      level: 'advanced' },
      { name: 'Swagger',                  level: 'advanced' },
      { name: 'Postman',                  level: 'advanced' },
      { name: 'Telerik',                  level: 'advanced' },
      { name: 'DevExpress',               level: 'advanced' },
      { name: 'Material UI',              level: 'advanced' },
      { name: 'Bootstrap',                level: 'advanced' },
      { name: 'Agile (Scrum / Kanban)',   level: 'advanced' },
      { name: 'Docker',                   level: 'medium' },
      { name: 'Kubernetes',               level: 'medium' },
      { name: 'Vite',                     level: 'medium' },
    ],
  },
  {
    category: 'LEGACY / HERITAGE',
    items: [
      { name: 'VB .NET',                  level: 'advanced' },
      { name: 'jQuery',                   level: 'advanced' },
      { name: 'ASP.NET Web Forms',        level: 'advanced' },
    ],
  },
];
