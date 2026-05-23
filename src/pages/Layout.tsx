import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Anchor,
  AppBar,
  Button,
  Hourglass,
  MenuList,
  MenuListItem,
  Separator,
  TextInput,
  Toolbar,
  Window,
  WindowHeader,
  Frame,
  GroupBox
} from 'react95';
import logoIMG from '../assets/logo1.png';
import { localStorageHelper, experienceDetails } from '../constants';
import { AppMenuBar } from '../components/AppBar/AppMenuBar';
import { useWindows, FloatingWindow } from '../contexts/WindowContext';
import { useLanguage } from '../contexts/LanguageContext';

// Componente para ventana flotante de experiencia
const FloatingExperienceWindow: React.FC<{ windowData: FloatingWindow }> = ({ windowData }) => {
  const { closeWindow, focusWindow, updatePosition } = useWindows();
  const { language, t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const experience = experienceDetails.find(exp => exp.id === windowData.experienceId);

  if (!experience) return null;

  const currentIndex = experienceDetails.findIndex(exp => exp.id === windowData.experienceId);
  const prevId = currentIndex < experienceDetails.length - 1 ? experienceDetails[currentIndex + 1].id : undefined;
  const nextId = currentIndex > 0 ? experienceDetails[currentIndex - 1].id : undefined;

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    focusWindow(windowData.id);
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updatePosition(windowData.id, {
        x: Math.max(0, e.clientX - dragOffset.x),
        y: Math.max(0, e.clientY - dragOffset.y)
      });
    }
  }, [isDragging, dragOffset, windowData.id, updatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const { openWindow } = useWindows();

  return (
    <div
      ref={windowRef}
      style={{
        position: 'fixed',
        left: windowData.position.x,
        top: windowData.position.y,
        zIndex: windowData.zIndex,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onClick={() => focusWindow(windowData.id)}
    >
      <Window style={{ width: 1000 }}>
        <WindowHeader
          className='window-title'
          style={{ cursor: 'grab' }}
          onMouseDown={handleMouseDown}
        >
          <span>{experience.company}, {experience.location}</span>
          <Button onClick={() => closeWindow(windowData.id)}>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>x</span>
          </Button>
        </WindowHeader>
        <Frame
          variant='outside'
          shadow
          style={{ padding: '0.5rem', lineHeight: '1.5' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            gap: '2rem',
            borderBottom: '2px solid #808080',
            marginBottom: '1rem'
          }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px', margin: 0, flex: 1 }}>
              {language === 'en' ? experience.title.en : experience.title.es}
            </h2>
            <div style={{ fontWeight: 'bold', color: '#666', fontSize: '14px', whiteSpace: 'nowrap' }}>
              {language === 'en' ? experience.period.en : experience.period.es}
            </div>
          </div>

          <GroupBox label={t('experience.abstract')}>
            <div style={{ height: '280px', overflowY: 'auto', padding: '0.5rem' }}>
              <p style={{ whiteSpace: 'pre-line', margin: 0 }}>
                {language === 'en' ? experience.abstract.en : experience.abstract.es}
              </p>
            </div>
          </GroupBox>

          <br />

          <GroupBox label={t('experience.roleTech')}>
            <Frame variant='well' style={{ marginTop: '1rem', padding: '0.1rem 0.25rem', width: '100%' }}>
              {experience.role}
              <p style={{ padding: '0.5rem' }}>{experience.technologies}</p>
            </Frame>
          </GroupBox>

          <br />

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignContent: 'center',
            alignItems: 'center',
            padding: '10px',
            gap: '0.5rem'
          }}>
            {prevId && (
              <Button size='md' onClick={() => { closeWindow(windowData.id); openWindow(prevId); }}>
                {t('experience.prev')}
              </Button>
            )}
            {nextId && (
              <Button size='md' onClick={() => { closeWindow(windowData.id); openWindow(nextId); }}>
                {t('experience.next')}
              </Button>
            )}
          </div>
        </Frame>
      </Window>
    </div>
  );
};

export const Layout = ({ element }: { element: any }) => {
  const isLogedIn = localStorageHelper.getItem('isLogedIn');
  const [isLoading, setIsLoading] = useState(true);
  const { windows, mainContentZIndex, focusMainContent } = useWindows();

  useEffect(() => {
    setTimeout(delayedMessage, delay);
  }, [isLoading]);

  const delay: number = 500;

  const delayedMessage: () => void = () => {
    setIsLoading(false);
  };

  if (!isLogedIn) {
    window.location.href = '/login';
    return null
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh",
            padding: 20,
          }}
        >
          <Hourglass size={32} />
        </div>
      ) : (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 40, // Espacio para AppMenuBar
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            zIndex: mainContentZIndex,
            overflow: 'auto',
            background: 'transparent',
            pointerEvents: 'none', // Permite clicks a ventanas flotantes
          }}>
          <div onClick={focusMainContent} style={{ pointerEvents: 'auto' }}>
            {element}
          </div>
        </div>
      )}

      {/* Ventanas flotantes de experiencias */}
      {windows.map(w => (
        <FloatingExperienceWindow key={w.id} windowData={w} />
      ))}

      <AppMenuBar />
    </>
  );
}
