import { useState } from "react";
import { AppBar, Button, MenuList, MenuListItem, Separator, TextInput, Toolbar } from 'react95';
import { localStorageHelper } from "../../constants";
import logoIMG from "../../assets/logo1.png";
import { useLanguage } from "../../contexts/LanguageContext";

export const AppMenuBar = () => {

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { language, setLanguage, t } = useLanguage();

  return (
    <AppBar style={{ top: "unset", bottom: 0, position: "fixed" }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: 'bold' }}
          >
            <img
              src={logoIMG}
              alt='react95 logo'
              style={{ height: '20px', marginRight: 4 }}
            />
            {t('menu.start')}
          </Button>
          {open && (
            <>
              <MenuList
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '100%',
                  width: '200px',
                }}
                onClick={() => setOpen(false)}
              >
                <MenuListItem onClick={() => window.location.href = '/profile'}>
                  {t('menu.profile')}
                  <span role='img' aria-label='👨‍💻 '>
                    {`👨‍💻 `}
                  </span>
                </MenuListItem>
                <MenuListItem onClick={() => window.location.href = '/experience'}>
                  {t('menu.experience')}
                  <span role='img' aria-label='📁 '>
                    {`📁 `}
                  </span>
                </MenuListItem>
                <MenuListItem onClick={() => window.location.href = '/contact'}>
                  {t('menu.contact')}
                  <span role='img' aria-label='📧 '>
                    {`📧 `}
                  </span>
                </MenuListItem>
                <Separator />
                <MenuListItem
                  onClick={() => {
                    localStorageHelper.setItem('isLogedIn', false);
                    window.location.href = '/login';
                  }}
                >
                  {t('menu.logout')}
                  <span role='img' aria-label='🔙'>
                    🔙
                  </span>
                </MenuListItem>
              </MenuList>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            <Button
              size='sm'
              active={language === 'en'}
              onClick={() => setLanguage('en')}
              style={{ minWidth: '45px' }}
            >
              EN
            </Button>
            <Button
              size='sm'
              active={language === 'es'}
              onClick={() => setLanguage('es')}
              style={{ minWidth: '45px' }}
            >
              ES
            </Button>
          </div>
          <TextInput
            placeholder={t('search.placeholder')}
            width={450}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchTerm.trim()) {
                window.location.href = `/experience?search=${encodeURIComponent(searchTerm.trim())}`;
              }
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};