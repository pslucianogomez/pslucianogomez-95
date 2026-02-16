import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Menu
        'menu.start': 'Start',
        'menu.profile': 'Profile',
        'menu.experience': 'Experience',
        'menu.contact': 'Contact',
        'menu.tools': 'Tools',
        'menu.tools.mergePdf': 'Merge PDF',
        'menu.tools.mergePdf.comingSoon': 'Coming Soon',
        'menu.tools.mergePdf.close': 'Close',
        'menu.tools.mergePdf.selectFiles': 'Select PDF Files',
        'menu.tools.mergePdf.loading': 'Loading PDFs...',
        'menu.tools.mergePdf.noPdfFiles': 'Please select PDF files only',
        'menu.tools.mergePdf.error': 'Error processing PDF files',
        'menu.tools.mergePdf.file': 'file',
        'menu.tools.mergePdf.files': 'files',
        'menu.tools.mergePdf.selected': 'selected',
        'menu.tools.mergePdf.downloadTitle': 'Download merged files:',
        'menu.tools.mergePdf.download': 'Download',
        'menu.tools.mergePdf.downloadAll': 'Download All Files',
        'menu.tools.mergePdf.downloadError': 'Error generating PDF file',
        'menu.tools.mergePdf.downloading': 'Generating PDF',
        'menu.tools.mergePdf.processing': 'Processing PDFs...',
        'menu.tools.mergePdf.generating': 'Generating PDF...',
        'menu.tools.mergePdf.pages': 'pages',
        'menu.tools.mergePdf.downloadWarning': 'Warning',
        'menu.tools.mergePdf.skipped': 'were skipped',
        'menu.tools.extractPdf': 'Extract PDF',
        'menu.tools.extractImages': 'Extract Images',
        'menu.tools.extractImages.url': 'URL:',
        'menu.tools.extractImages.urlHint': 'Enter the URL of the page containing images',
        'menu.tools.extractImages.token': 'Token (optional):',
        'menu.tools.extractImages.loading': 'Loading images...',
        'menu.tools.extractImages.generating': 'Generating PDF...',
        'menu.tools.extractImages.generatePdf': 'Generate PDF',
        'menu.tools.extractImages.noImages': 'No images to generate PDF',
        'menu.tools.extractImages.pdfError': 'Error generating PDF',
        'menu.tools.extractImages.useProxy': 'Use CORS Proxy (may not work with authentication)',
        'menu.tools.extractImages.noUrl': 'Please enter a URL',
        'menu.tools.extractImages.extract': 'Extract Images',
        'menu.tools.extractImages.extracting': 'Extracting images...',
        'menu.tools.extractImages.downloading': 'Downloading images...',
        'menu.tools.extractImages.found': 'Found',
        'menu.tools.extractImages.images': 'images',
        'menu.tools.extractImages.downloadAll': 'Download All Images',
        'menu.tools.extractImages.downloadError': 'Error downloading image',
        'menu.tools.extractPdf.selectFile': 'Select PDF File',
        'menu.tools.extractPdf.noPdfFile': 'Please select a PDF file',
        'menu.tools.extractPdf.error': 'Error processing PDF file',
        'menu.tools.extractPdf.selectPages': 'Select pages (e.g., 1-5, 10, 15-20):',
        'menu.tools.extractPdf.apply': 'Apply',
        'menu.tools.extractPdf.selectedCount': 'Selected',
        'menu.tools.extractPdf.noPagesSelected': 'Please select at least one page',
        'menu.tools.extractPdf.download': 'Download Extracted PDF',
        'menu.tools.extractPdf.downloadError': 'Error extracting PDF pages',
        'menu.tools.extractPdf.processing': 'Processing PDF...',
        'menu.logout': 'Logout',
        
        // Search
        'search.placeholder': 'Search...',
        'search.byTech': 'Search by tech or company...',
        'search.button': 'Search',
        'search.clear': 'Clear',
        'search.results': 'Results for:',
        'search.noResults': 'No experiences found',
        'search.trySearching': 'Try searching for: React, Azure, .NET, SQL Server, etc.',
        
        // Experience
        'experience.title': 'Relevant Experience',
        'experience.tableTitle': 'Title',
        'experience.tableCompany': 'Company',
        'experience.tableClient': 'Client',
        'experience.tableTech': 'Tech stack',
        'experience.tablePeriod': 'Period',
        'experience.tableActions': 'Actions',
        'experience.open': 'Open',
        'experience.share': 'Share',
        'experience.result': 'result',
        'experience.results': 'results',
        'experience.abstract': 'Abstract',
        'experience.roleTech': 'Role / Technologies',
        'experience.backToList': '<< - Back to Experience',
        'experience.prev': '< - Prev',
        'experience.next': 'Next - >',
        
        // Profile
        'profile.title': 'My profile',
        'profile.intro': 'Intro',
        'profile.career': 'Career',
        'profile.skills': 'Skills',
        'profile.aboutMe': 'About Me',
        'profile.professionalExperience': 'Professional Experience',
        'profile.programming': 'Programming',
        'profile.databases': 'Databases',
        'profile.toolsOthers': 'Tools & Others',
        'profile.contactInfo': 'Contact Information',
        'profile.programmingLanguages': 'Programming languages:',
        'profile.misc': 'Misc:',
        'profile.age': 'Age',
        'profile.yearsOld': 'years old',
        'profile.cellPhone': 'Cell phone',
        'profile.email': 'E-mail address',
        'profile.address': 'Address',
        'profile.summary': 'Summary',
        'profile.viewMore': 'View More...',
        'profile.viewMoreTitle': 'About Me - Full Details',
        'profile.socialLinks': 'Contact & Social',
        'profile.phone': 'Phone',
        'profile.linkedin': 'LinkedIn',
        'profile.github': 'GitHub',
        'profile.close': 'Close',
        
        // Contact
        'contact.title': 'Contact Form',
        'contact.yourInfo': 'Your Information',
        'contact.name': 'Name:',
        'contact.email': 'Email:',
        'contact.subject': 'Subject:',
        'contact.message': 'Message',
        'contact.yourMessage': 'Your message:',
        'contact.namePlaceholder': 'Your name',
        'contact.emailPlaceholder': 'your.email@example.com',
        'contact.subjectPlaceholder': 'Email subject (optional)',
        'contact.messagePlaceholder': 'Write your message here...',
        'contact.send': 'Send Message',
        'contact.sending': 'Sending...',
        'contact.clear': 'Clear',
        'contact.requiredFields': '* Required fields',
        'contact.successTitle': '✓ Message sent successfully!',
        'contact.successMessage': 'We will get back to you soon.',
        'contact.errorTitle': '✗ Error sending message',
        'contact.errorMessage': 'Please try again or contact us directly.',
    },
    es: {
        // Menu
        'menu.start': 'Inicio',
        'menu.profile': 'Perfil',
        'menu.experience': 'Experiencia',
        'menu.contact': 'Contacto',
        'menu.tools': 'Herramientas',
        'menu.tools.mergePdf': 'Fusionar PDF',
        'menu.tools.mergePdf.comingSoon': 'Próximamente',
        'menu.tools.mergePdf.close': 'Cerrar',
        'menu.tools.mergePdf.selectFiles': 'Seleccionar Archivos PDF',
        'menu.tools.mergePdf.loading': 'Cargando PDFs...',
        'menu.tools.mergePdf.noPdfFiles': 'Por favor selecciona solo archivos PDF',
        'menu.tools.mergePdf.error': 'Error al procesar archivos PDF',
        'menu.tools.mergePdf.file': 'archivo',
        'menu.tools.mergePdf.files': 'archivos',
        'menu.tools.mergePdf.selected': 'seleccionado(s)',
        'menu.tools.mergePdf.downloadTitle': 'Descargar archivos fusionados:',
        'menu.tools.mergePdf.download': 'Descargar',
        'menu.tools.mergePdf.downloadAll': 'Descargar Todos los Archivos',
        'menu.tools.mergePdf.downloadError': 'Error al generar archivo PDF',
        'menu.tools.mergePdf.downloading': 'Generando PDF',
        'menu.tools.mergePdf.processing': 'Procesando PDFs...',
        'menu.tools.mergePdf.generating': 'Generando PDF...',
        'menu.tools.mergePdf.pages': 'páginas',
        'menu.tools.mergePdf.downloadWarning': 'Advertencia',
        'menu.tools.mergePdf.skipped': 'fueron omitidas',
        'menu.tools.extractPdf': 'Extraer PDF',
        'menu.tools.extractImages': 'Extraer Imágenes',
        'menu.tools.extractImages.url': 'URL:',
        'menu.tools.extractImages.urlHint': 'Ingresa la URL de la página que contiene las imágenes',
        'menu.tools.extractImages.token': 'Token (opcional):',
        'menu.tools.extractImages.loading': 'Cargando imágenes...',
        'menu.tools.extractImages.generating': 'Generando PDF...',
        'menu.tools.extractImages.generatePdf': 'Generar PDF',
        'menu.tools.extractImages.noImages': 'No hay imágenes para generar PDF',
        'menu.tools.extractImages.pdfError': 'Error al generar PDF',
        'menu.tools.extractImages.useProxy': 'Usar Proxy CORS (puede no funcionar con autenticación)',
        'menu.tools.extractImages.noUrl': 'Por favor ingresa una URL',
        'menu.tools.extractImages.extract': 'Extraer Imágenes',
        'menu.tools.extractImages.extracting': 'Extrayendo imágenes...',
        'menu.tools.extractImages.downloading': 'Descargando imágenes...',
        'menu.tools.extractImages.found': 'Encontradas',
        'menu.tools.extractImages.images': 'imágenes',
        'menu.tools.extractImages.downloadAll': 'Descargar Todas las Imágenes',
        'menu.tools.extractImages.downloadError': 'Error al descargar imagen',
        'menu.tools.extractPdf.selectFile': 'Seleccionar Archivo PDF',
        'menu.tools.extractPdf.noPdfFile': 'Por favor selecciona un archivo PDF',
        'menu.tools.extractPdf.error': 'Error al procesar archivo PDF',
        'menu.tools.extractPdf.selectPages': 'Seleccionar páginas (ej., 1-5, 10, 15-20):',
        'menu.tools.extractPdf.apply': 'Aplicar',
        'menu.tools.extractPdf.selectedCount': 'Seleccionadas',
        'menu.tools.extractPdf.noPagesSelected': 'Por favor selecciona al menos una página',
        'menu.tools.extractPdf.download': 'Descargar PDF Extraído',
        'menu.tools.extractPdf.downloadError': 'Error al extraer páginas del PDF',
        'menu.tools.extractPdf.processing': 'Procesando PDF...',
        'menu.logout': 'Salir',
        
        // Search
        'search.placeholder': 'Buscar...',
        'search.byTech': 'Buscar por tecnología o empresa...',
        'search.button': 'Buscar',
        'search.clear': 'Limpiar',
        'search.results': 'Resultados para:',
        'search.noResults': 'No se encontraron experiencias',
        'search.trySearching': 'Intenta buscar: React, Azure, .NET, SQL Server, etc.',
        
        // Experience
        'experience.title': 'Experiencia Relevante',
        'experience.tableTitle': 'Título',
        'experience.tableCompany': 'Empresa',
        'experience.tableClient': 'Cliente',
        'experience.tableTech': 'Tecnologías',
        'experience.tablePeriod': 'Período',
        'experience.tableActions': 'Acciones',
        'experience.open': 'Abrir',
        'experience.share': 'Compartir',
        'experience.result': 'resultado',
        'experience.results': 'resultados',
        'experience.abstract': 'Resumen',
        'experience.roleTech': 'Rol / Tecnología',
        'experience.backToList': '<< - Volver a Experiencias',
        'experience.prev': '< - Ant',
        'experience.next': 'Sig - >',
        
        // Profile
        'profile.title': 'Mi perfil',
        'profile.intro': 'Introducción',
        'profile.career': 'Carrera',
        'profile.skills': 'Aptitudes',
        'profile.aboutMe': 'Sobre Mí',
        'profile.professionalExperience': 'Experiencia Profesional',
        'profile.programming': 'Programación',
        'profile.databases': 'Bases de Datos',
        'profile.toolsOthers': 'Herramientas y Otros',
        'profile.contactInfo': 'Información de Contacto',
        'profile.programmingLanguages': 'Lenguajes de programación:',
        'profile.misc': 'Varios:',
        'profile.age': 'Edad',
        'profile.yearsOld': 'años',
        'profile.cellPhone': 'Teléfono',
        'profile.email': 'Correo electrónico',
        'profile.address': 'Dirección',
        'profile.summary': 'Resumen',
        'profile.viewMore': 'Ver más...',
        'profile.viewMoreTitle': 'Sobre Mí - Detalles Completos',
        'profile.socialLinks': 'Contacto y Redes',
        'profile.phone': 'Teléfono',
        'profile.linkedin': 'LinkedIn',
        'profile.github': 'GitHub',
        'profile.close': 'Cerrar',
        
        // Contact
        'contact.title': 'Formulario de Contacto',
        'contact.yourInfo': 'Tu Información',
        'contact.name': 'Nombre:',
        'contact.email': 'Correo:',
        'contact.subject': 'Asunto:',
        'contact.message': 'Mensaje',
        'contact.yourMessage': 'Tu mensaje:',
        'contact.namePlaceholder': 'Tu nombre',
        'contact.emailPlaceholder': 'tu.correo@ejemplo.com',
        'contact.subjectPlaceholder': 'Asunto del correo (opcional)',
        'contact.messagePlaceholder': 'Escribe tu mensaje aquí...',
        'contact.send': 'Enviar Mensaje',
        'contact.sending': 'Enviando...',
        'contact.clear': 'Limpiar',
        'contact.requiredFields': '* Campos requeridos',
        'contact.successTitle': '✓ ¡Mensaje enviado exitosamente!',
        'contact.successMessage': 'Te responderemos pronto.',
        'contact.errorTitle': '✗ Error al enviar mensaje',
        'contact.errorMessage': 'Por favor intenta de nuevo o contáctanos directamente.',
    }
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

