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
    en: 'Senior .NET Full Stack Developer with 15+ years of experience in desktop and web applications. Passionate about continuous learning, teamwork, and building efficient, scalable solutions.',
    es: 'Desarrollador Senior .NET Full Stack con más de 15 años de experiencia en aplicaciones de escritorio y web. Apasionado por el aprendizaje continuo, el trabajo en equipo y la creación de soluciones eficientes y escalables.',
  },
  cvPath: null, // set to '/cv.pdf' once the file exists in public/
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pslucianogomez' },
    { label: 'GitHub',   href: 'https://github.com/pslucianogomez' },
    { label: 'Email',    href: 'mailto:pslucianogomez@gmail.com' },
  ],
};
