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
  // Redacción propia pendiente — vacío oculta la sección (ver Profile.tsx).
  bio: {
    en: '',
    es: '',
  },
  intro: {
    en: '',
    es: '',
  },
  career: {
    en: '',
    es: '',
  },
  cvPath: null, // set to '/cv.pdf' once the file exists in public/
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pslucianogomez' },
    { label: 'GitHub',   href: 'https://github.com/pslucianogomez' },
    { label: 'Email',    href: 'mailto:pslucianogomez@gmail.com' },
  ],
};
