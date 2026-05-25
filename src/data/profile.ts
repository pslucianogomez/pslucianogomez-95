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
    en: "15 years writing C#. Tired of building everyone else's roadmap — now I build my own, and for a few clients I actually choose. Córdoba, mate in hand, GMT-3.",
    es: '15 años escribiendo C#. Me cansé de construir el roadmap de otros — ahora construyo el mío y el de unos pocos clientes que elijo. Córdoba, mate en mano, GMT-3.',
  },
  intro: {
    en: "I write code the way I drink mate: slowly, in rounds, and I'd rather share it with people I actually want to work with. After 15 years building software for everyone else, I'm betting the next decade on three things — my own products, AI integration, and clients who ship.",
    es: 'Escribo código como tomo mate: despacio, en rondas, y prefiero compartirlo con gente con la que realmente quiero trabajar. Después de 15 años haciendo software para todos los demás, apuesto la próxima década a tres cosas: mis propios productos, integración de IA, y clientes que shippean.',
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
