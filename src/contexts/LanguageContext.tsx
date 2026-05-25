import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    en: {
        'icon.profile': 'Profile',
        'icon.experience': 'Experience',
        'icon.contact': 'Contact',
        'icon.stack': 'Stack',
        'icon.now': 'Now',

        'now.comingSoon': 'Incubating · CMD games',
        'now.soon': 'soon',

        'profile.hireMe': 'Get in touch →',
        'profile.downloadCv': 'Download CV',
        'profile.about': 'About me',
        'profile.career': 'Career',

        'experience.empty': 'No experiences yet.',
        'experience.open': 'open',
        'experience.close': 'close',

        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Message',
        'contact.send': 'Send →',
        'contact.sending': 'Sending…',
        'contact.success': 'Message sent · Block',
        'contact.error': 'Failed to send. Try again.',

        'notFound.title': 'Route not found',
        'notFound.body': 'The route you typed does not exist.',
        'notFound.back': 'Back to desktop',
    },
    es: {
        'icon.profile': 'Perfil',
        'icon.experience': 'Experiencia',
        'icon.contact': 'Contacto',
        'icon.stack': 'Stack',
        'icon.now': 'Now',

        'now.comingSoon': 'Incubando · juegos CMD',
        'now.soon': 'pronto',

        'profile.hireMe': 'Contacto →',
        'profile.downloadCv': 'Descargar CV',
        'profile.about': 'Sobre mí',
        'profile.career': 'Carrera',

        'experience.empty': 'Aún no hay experiencias cargadas.',
        'experience.open': 'abrir',
        'experience.close': 'cerrar',

        'contact.name': 'Nombre',
        'contact.email': 'Email',
        'contact.message': 'Mensaje',
        'contact.send': 'Enviar →',
        'contact.sending': 'Enviando…',
        'contact.success': 'Mensaje enviado · Block',
        'contact.error': 'No se pudo enviar. Probá de nuevo.',

        'notFound.title': 'Ruta no encontrada',
        'notFound.body': 'La ruta que ingresaste no existe.',
        'notFound.back': 'Volver al escritorio',
    },
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved === 'es' || saved === 'en') ? saved : 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        // Disparar evento personalizado para que otros componentes se enteren
        window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

