export interface Experience {
    id: string;
    company: string;
    location: string;
    period: {
        en: string;
        es: string;
    };
    title: {
        en: string;
        es: string;
    };
    abstract: {
        en: string;
        es: string;
    };
    role: string;
    technologies: string;
}

