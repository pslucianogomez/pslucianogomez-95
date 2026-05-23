import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface FloatingWindow {
    id: string;
    experienceId: string;
    position: { x: number; y: number };
    zIndex: number;
}

interface WindowContextType {
    windows: FloatingWindow[];
    mainContentZIndex: number;
    openWindow: (experienceId: string) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    focusMainContent: () => void;
    updatePosition: (id: string, position: { x: number; y: number }) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

let nextZIndex = 1000;
let windowCounter = 0;

export const WindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [windows, setWindows] = useState<FloatingWindow[]>([]);
    const [mainContentZIndex, setMainContentZIndex] = useState(1000);

    const openWindow = useCallback((experienceId: string) => {
        windowCounter++;
        nextZIndex++;

        // Offset para que las ventanas se abran en cascada
        const offset = (windows.length % 5) * 25;

        // Posición inicial: esquina superior izquierda con offset
        // Esto deja visible parte de la tabla a la derecha
        const newWindow: FloatingWindow = {
            id: `window-${windowCounter}`,
            experienceId,
            position: { x: 20 + offset, y: 20 + offset },
            zIndex: nextZIndex
        };

        setWindows(prev => [...prev, newWindow]);
        // Bajar el contenido principal para que la nueva ventana quede al frente
        setMainContentZIndex(100);
    }, [windows.length]);

    const closeWindow = useCallback((id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    }, []);

    const focusWindow = useCallback((id: string) => {
        nextZIndex++;
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, zIndex: nextZIndex } : w
        ));
        // Bajar el contenido principal cuando se enfoca una ventana flotante
        setMainContentZIndex(100);
    }, []);

    const focusMainContent = useCallback(() => {
        nextZIndex++;
        setMainContentZIndex(nextZIndex);
    }, []);

    const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, position } : w
        ));
    }, []);

    return (
        <WindowContext.Provider value={{ windows, mainContentZIndex, openWindow, closeWindow, focusWindow, focusMainContent, updatePosition }}>
            {children}
        </WindowContext.Provider>
    );
};

export const useWindows = (): WindowContextType => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error('useWindows must be used within a WindowProvider');
    }
    return context;
};
