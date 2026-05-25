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
    en: "15+ years coding on all kinds of projects. Today I build my own projects and choose who I collaborate with, always mate in hand. My interests beyond code are wide-ranging — music, mechanics, electricity, environmentalism and social policy — and I'm always looking for ways to bring them together.",
    es: 'Más de 15 años codeando en proyectos de todo tipo. Hoy construyo mis propios proyectos y elijo con quién colaborar, siempre con el mate en mano. Mis intereses por fuera del código son variados —música, mecánica, electricidad, ambientalismo y políticas sociales— y siempre busco maneras de unirlos.',
  },
  // intro (Sobre mí) y career (Carrera) — redacción propia pendiente; vacío oculta la sección.
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
