export interface ProfileData {
  name: string;
  city: string;
  bio: { en: string; es: string };
  intro: { en: string; es: string };
  career: { en: string; es: string };
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
  intro: {
    en: `I am a proactive individual with a strong growth mindset and a continuous drive to learn and evolve. I quickly adapt to new challenges and environments, always seeking opportunities to acquire new skills and enhance my performance.

I'm passionate about teamwork and deeply value interdisciplinary collaboration. I enjoy connecting with people from diverse backgrounds, roles, and departments, believing that shared ideas are key to driving innovative solutions.

As a creative professional, I'm always looking for ways to improve processes, optimize outcomes, and raise the bar for quality. I believe in moving forward, staying innovative, and leading with purpose.

Self-management, independent learning, and empathetic leadership are essential to my approach. I see myself as a connector — bridging ideas, people, and organizations to create meaningful progress.

Technology and music are not just part of my professional life — they are constant sources of energy and inspiration in my daily routine.`,
    es: `Soy una persona proactiva, con una mentalidad de crecimiento constante y una fuerte inclinación por el aprendizaje continuo. Me adapto con rapidez a nuevos entornos y desafíos, y disfruto incorporando habilidades y conocimientos que potencien mis resultados.

Me apasiona el trabajo en equipo y valoro profundamente la colaboración interdisciplinaria. Me siento cómodo interactuando con personas de diferentes perfiles, áreas y niveles de responsabilidad, ya que creo firmemente en el poder de las ideas compartidas para lograr soluciones innovadoras.

Como profesional creativo, siempre estoy buscando formas de mejorar procesos, optimizar resultados y elevar el estándar de calidad en todo lo que hago. Creo en moverse hacia adelante, en innovar constantemente y en liderar con propósito.

Me motiva la autogestión, el aprendizaje autónomo y la posibilidad de guiar equipos con empatía y visión estratégica. Me considero un puente entre ideas, personas y organizaciones, generando conexiones que impulsan el desarrollo colectivo.

La tecnología y la música no solo forman parte de mi vida profesional, sino que también son motores clave de mi inspiración diaria.`,
  },
  career: {
    en: `I have over 15 years of experience in the development of desktop and web applications, and more than a year and a half specializing in process automation, working with some of the most prominent international companies in their respective industries.

My core strengths lie in my commitment to continuous learning and staying up-to-date with emerging technologies, combined with a strong ability to apply those technologies to build efficient, scalable, and real-world problem-solving applications.

I have a solid technical background in C#, .NET, and SQL Server, along with hands-on experience in modern front-end frameworks like React, as well as a wide array of tools, libraries, and development environments. Throughout my career, I've built software solutions for various industries including finance, insurance, and retail, which has given me a comprehensive and adaptable perspective across different business domains and technical challenges.`,
    es: `Cuento con más de 15 años de experiencia en el desarrollo de aplicaciones de escritorio y web, y más de un año y medio en automatización de procesos, trabajando para algunas de las empresas internacionales más reconocidas en sus sectores.

Mi principal fortaleza radica en la formación continua y el aprendizaje constante de nuevas tecnologías, sumado a una alta capacidad para aplicarlas de manera práctica en la resolución de problemas reales, mediante soluciones eficientes y escalables.

Poseo una sólida trayectoria en C#, .NET y SQL Server, así como en tecnologías modernas como React, y un amplio conjunto de herramientas, frameworks y librerías complementarias. He desarrollado soluciones para diversas industrias, incluyendo los sectores financiero, asegurador y retail, lo que me ha permitido adquirir una visión integral y versátil sobre distintos modelos de negocio y entornos de desarrollo.`,
  },
  cvPath: null, // set to '/cv.pdf' once the file exists in public/
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pslucianogomez' },
    { label: 'GitHub',   href: 'https://github.com/pslucianogomez' },
    { label: 'Email',    href: 'mailto:pslucianogomez@gmail.com' },
  ],
};
