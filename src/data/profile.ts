export interface ProfileData {
  name: string;
  city: string;
  credential: { en: string; es: string };
  bio: { en: string; es: string };
  intro: { en: string; es: string };
  career: { en: string; es: string };
  cvPath: string | null; // null hides the CV button
  socials: { label: string; href: string }[];
}

export const profile: ProfileData = {
  name: 'Pedro S. Luciano Gomez',
  city: 'CÓRDOBA, AR',
  credential: {
    en: 'Microsoft AI & ML Engineering Professional Certificate',
    es: 'Certificado Profesional de Microsoft AI & ML Engineering',
  },
  bio: {
    en: '15 years writing C#. Today I build my own products and choose who I build for, always mate in hand. Córdoba, GMT-3.',
    es: '15 años escribiendo C#. Hoy construyo mis propios productos y elijo a quién le construyo, siempre mate en mano. Córdoba, GMT-3.',
  },
  intro: {
    en: 'After 15 years developing at Argentine agencies and US enterprise, today I combine the two things I do best: solid .NET systems and, increasingly, AI integration. I build my own products and work with a select group of clients, putting the same care into every project.',
    es: 'Después de 15 años desarrollando en agencias argentinas y enterprise de EEUU, hoy combino las dos cosas que mejor hago: sistemas .NET sólidos y, cada vez más, integración de IA. Construyo productos propios y trabajo con un grupo acotado de clientes, poniendo el mismo cuidado en cada proyecto.',
  },
  career: {
    en: 'Six years at US enterprise (LedgerPay · fintech, Recuro Health · telemedicine, ITA · recognition). Eight at Argentine agencies. Today: my own products + selected clients. Stack: .NET, Azure, Blazor, increasingly AI/ML. Industries: health, finance, retail, pharmacy.',
    es: 'Seis años en enterprise de EEUU (LedgerPay · fintech, Recuro Health · telemedicina, ITA · reconocimiento). Ocho en agencias argentinas. Hoy: productos propios + clientes elegidos. Stack: .NET, Azure, Blazor, cada vez más IA/ML. Industrias: salud, finanzas, retail, farmacia.',
  },
  cvPath: null, // set to '/cv.pdf' once the file exists in public/
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pslucianogomez' },
    { label: 'GitHub',   href: 'https://github.com/pslucianogomez' },
    { label: 'Email',    href: 'mailto:pslucianogomez@gmail.com' },
  ],
};
