import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableHeadCell,
    TableDataCell,
    Window,
    WindowHeader,
    WindowContent,
    Button,
    Select,
    NumberInput,
    Hourglass,
    ScrollView,
    Frame,
    TextInput,
} from "react95";
import { experiences } from "../../constants";
import { useLanguage } from "../../contexts/LanguageContext";
import { useWindows } from "../../contexts/WindowContext";

const ExperienceCard = ({ exp, onOpen, t }: { exp: any; onOpen: (id: string) => void; t: (key: string) => string }) => (
    <Frame
        variant='field'
        style={{
            padding: '1rem',
            marginBottom: '1rem',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden'
        }}
    >
        <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', wordBreak: 'break-word' }}>
            {exp.title}
        </div>
        <div style={{ marginBottom: '0.5rem', wordBreak: 'break-word' }}>
            <strong>Company:</strong> {exp.company}
        </div>
        <div style={{ marginBottom: '0.5rem', wordBreak: 'break-word' }}>
            <strong>Client:</strong> {exp.client}
        </div>
        <div style={{ marginBottom: '0.5rem', wordBreak: 'break-word' }}>
            <strong>Period:</strong> {exp.period}
        </div>
        <div style={{ marginBottom: '1rem', wordBreak: 'break-word' }}>
            <strong>Tech:</strong> {exp.techStack}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <Button onClick={(e) => { e.stopPropagation(); onOpen(exp.id.toString()); }}>
                {t('experience.open')}
            </Button>
            <Button disabled>{t('experience.share')}</Button>
        </div>
    </Frame>
);

const pageSizeOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
];

export const ExperienceList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');
    const { t } = useLanguage();
    const { openWindow } = useWindows();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Sincronizar el campo de búsqueda con los query params
    useEffect(() => {
        const search = searchParams.get('search') || '';
        setLocalSearch(search);
    }, [searchParams]);

    // Filtrar experiencias basándose en el término de búsqueda
    const filteredExperiences = useMemo(() => {
        const searchTerm = searchParams.get('search')?.toLowerCase() || '';
        
        if (!searchTerm) {
            return experiences;
        }

        return experiences.filter(exp => {
            const companyMatch = exp.company.toLowerCase().includes(searchTerm);
            const clientMatch = exp.client.toLowerCase().includes(searchTerm);
            const techMatch = exp.techStack.toLowerCase().includes(searchTerm);
            const titleMatch = exp.title.toLowerCase().includes(searchTerm);
            
            return companyMatch || clientMatch || techMatch || titleMatch;
        });
    }, [searchParams]);

    const handleSearch = () => {
        if (localSearch.trim()) {
            setSearchParams({ search: localSearch.trim() });
        } else {
            setSearchParams({});
        }
    };

    const clearSearch = () => {
        setLocalSearch('');
        setSearchParams({});
    };

    // Calculate content height considering pagination height
    const paginationHeight = isMobile ? 120 : 60; // Pagination takes more height on mobile due to stacking
    const headerHeight = 32; // WindowHeader height
    const paddingHeight = isMobile ? 16 : 32; // Total padding
    const contentHeight = isMobile 
        ? windowHeight - (headerHeight + paginationHeight + paddingHeight)
        : 410;

    return (
        <div style={{
            height: isMobile ? '100vh' : 'auto',
            maxHeight: isMobile ? '100vh' : 'auto',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Window style={{ 
                width: isMobile ? '100%' : 'auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <WindowHeader className='window-title'>
                    <span>
                        {t('experience.title')}
                        {searchParams.get('search') && ` - ${t('search.results')} "${searchParams.get('search')}"`}
                    </span>
                    <Button onClick={() => window.location.href = '/'}>
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>×</span>
                    </Button>
                </WindowHeader>
                <WindowContent style={{ 
                    flex: 1,
                    padding: isMobile ? '0.5rem' : '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    height: isMobile ? `calc(100vh - ${headerHeight}px)` : 'auto',
                    overflow: 'hidden'
                }}>
                    {/* Barra de búsqueda */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                        padding: '0.5rem',
                        backgroundColor: '#c3c3c3',
                        borderBottom: '1px solid #868686'
                    }}>
                        <TextInput
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            placeholder={t('search.byTech')}
                            style={{ flex: 1 }}
                            fullWidth
                        />
                        <Button onClick={handleSearch} style={{ minWidth: '80px' }}>
                            {t('search.button')}
                        </Button>
                        {searchParams.get('search') && (
                            <Button onClick={clearSearch} style={{ minWidth: '80px' }}>
                                {t('search.clear')}
                            </Button>
                        )}
                    </div>
                    <ScrollView style={{ 
                        width: isMobile ? '100%' : 'min(95vw, 1200px)',
                        height: contentHeight,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        marginBottom: isMobile ? '0rem' : '0.5rem'
                    }}>
                        {isLoading ? (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                minHeight: 300
                            }}>
                                <Hourglass size={32} />
                            </div>
                        ) : filteredExperiences.length === 0 ? (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                minHeight: 200,
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    {t('search.noResults')}
                                </p>
                                <p style={{ fontSize: '14px', color: '#666' }}>
                                    {t('search.trySearching')}
                                </p>
                                <Button onClick={clearSearch}>
                                    {t('search.clear')}
                                </Button>
                            </div>
                        ) : isMobile ? (
                            <div style={{ width: '100%' }}>
                                {filteredExperiences.map((exp) => (
                                    <ExperienceCard key={exp.id} exp={exp} onOpen={openWindow} t={t} />
                                ))}
                            </div>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeadCell>{t('experience.tableTitle')}</TableHeadCell>
                                        <TableHeadCell>{t('experience.tableCompany')}</TableHeadCell>
                                        <TableHeadCell>{t('experience.tableClient')}</TableHeadCell>
                                        <TableHeadCell>{t('experience.tableTech')}</TableHeadCell>
                                        <TableHeadCell>{t('experience.tablePeriod')}</TableHeadCell>
                                        <TableHeadCell>{t('experience.tableActions')}</TableHeadCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredExperiences.map((exp) => (
                                        <TableRow key={exp.id}>
                                            <TableDataCell>{exp.title.length > 20 ? exp.title.substring(0, 20) + '...' : exp.title}</TableDataCell>
                                            <TableDataCell>{exp.company.length > 20 ? exp.company.substring(0, 20) + '...' : exp.company}</TableDataCell>
                                            <TableDataCell>{exp.client.length > 20 ? exp.client.substring(0, 20) + '...' : exp.client}</TableDataCell>
                                            <TableDataCell>{exp.techStack.length > 20 ? exp.techStack.substring(0, 20) + '...' : exp.techStack}</TableDataCell>
                                            <TableDataCell>{exp.period }</TableDataCell>
                                            <TableDataCell>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <Button onClick={(e) => { e.stopPropagation(); openWindow(exp.id.toString()); }}>
                                                        {t('experience.open')}
                                                    </Button>
                                                    <Button disabled>{t('experience.share')}</Button>
                                                </div>
                                            </TableDataCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </ScrollView>
                    <div style={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "flex-end",
                        alignItems: isMobile ? 'stretch' : 'center',
                        //gap: '0.5rem',
                        padding: '0.5rem',
                        borderTop: '1px solid #868686',
                        backgroundColor: '#c3c3c3',
                        position: 'relative',
                        bottom: isMobile ? 0 : 'auto',
                        //left: 0,
                        //right: 0,
                        //zIndex: 1
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            //flexWrap: isMobile ? 'wrap' : 'nowrap'
                            paddingRight: '1rem'
                        }}>
                            <Select
                                disabled
                                style={{ minWidth: '80px' }}
                                options={pageSizeOptions}
                                defaultValue={10}
                            />
                            <span>
                                {filteredExperiences.length} {filteredExperiences.length !== 1 ? t('experience.results') : t('experience.result')}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            //flexWrap: isMobile ? 'wrap' : 'nowrap'
                            //minWidth: '50px'
                        }}>
                            <span>Go to page:</span>
                            <NumberInput
                                disabled
                                style={{ minWidth: '80px !important', width: '80px !important' }}
                                min={1}
                                defaultValue={1}
                            />
                        </div>
                    </div>
                </WindowContent>
            </Window>
        </div>
    );
};