export interface ProfileData {
  name: string;
  city: string;
  bio: { en: string; es: string };
  cvPath: string | null; // null hides the CV button
  socials: { label: string; href: string }[];
}

export const profile: ProfileData = {
  name: 'Pedro S. Luciano Gomez',
  city: 'CÓRDOBA, AR',
  bio: {
    en: 'Senior .NET Full Stack Developer · 15+ years building web and desktop apps. Specialised in C#, .NET Core, React, SQL Server, and Azure.',
    es: 'Senior .NET Full Stack Developer · 15+ años construyendo apps web y desktop. Especializado en C#, .NET Core, React, SQL Server y Azure.',
  },
  cvPath: null, // set to '/cv.pdf' once the file exists in public/
  socials: [
    { label: 'GitHub',   href: 'https://github.com/pslucianogomez' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pslucianogomez/' },
    { label: 'Email',    href: 'mailto:pslucianogomez@gmail.com' },
  ],
};
