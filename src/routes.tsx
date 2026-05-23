import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Shell } from './ui/Shell';
import type { WindowId } from './contexts/WindowsContext';
import { Button } from './ui/Button';
import { useLanguage } from './contexts/LanguageContext';

// Feature components — created in Tasks 13-17. Until then these are stubs.
import { Profile } from './features/Profile/Profile';
import { ExperienceList } from './features/Experience/ExperienceList';
import { Contact } from './features/Contact/Contact';
import { Stack } from './features/Stack/Stack';
import { Now } from './features/Now/Now';

const NotFound = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <div>
      <p style={{ fontFamily: 'JetBrains Mono', margin: 0, marginBottom: 16 }}>
        0xDEAD · {t('notFound.body')}
      </p>
      <Button $variant="primary" onClick={() => navigate('/')}>{t('notFound.back')}</Button>
    </div>
  );
};

const renderContent = (id: WindowId) => {
  switch (id) {
    case 'profile':     return <Profile />;
    case 'experience':  return <ExperienceList />;
    case 'contact':     return <Contact />;
    case 'stack':       return <Stack />;
    case 'now':         return <Now />;
    case 'not-found':   return <NotFound />;
  }
};

export const AppRoutes = () => (
  <BrowserRouter>
    <Shell>{renderContent}</Shell>
    <Routes>
      <Route path="/" element={null} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/profile" element={null} />
      <Route path="/experience" element={null} />
      <Route path="/experience/:id" element={null} />
      <Route path="/contact" element={null} />
      <Route path="/stack" element={null} />
      <Route path="/now" element={null} />
      <Route path="*" element={null} />
    </Routes>
  </BrowserRouter>
);
