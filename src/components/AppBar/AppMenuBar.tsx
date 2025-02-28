import { useState } from "react";
import { AppBar, Button, MenuList, MenuListItem, Separator, TextInput, Toolbar } from 'react95';
import { localStorageHelper } from "../../constants";
import logoIMG from "../../assets/logo1.png";

export const AppMenuBar = () => {

  const [open, setOpen] = useState(false);

    return (
      <AppBar style={{ top: "unset", bottom: 0 }}>
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
              Start
            </Button>
            {open && (
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
                  {"Profile"}
                  <span role='img' aria-label='👨‍💻 '>
                    {`👨‍💻 `}
                  </span>
                </MenuListItem>
                <MenuListItem onClick={() => window.location.href = '/experience'}>
                  {"Experience"}
                  <span role='img' aria-label='📁 '>
                    {`📁 `}
                  </span>
                </MenuListItem>
                <Separator />
                <MenuListItem
                  onClick={() => {
                    localStorageHelper.setItem('isLogedIn', false);
                    window.location.href = '/login';
                  }}
                >
                  {"Logout"}
                  <span role='img' aria-label='🔙'>
                    🔙
                  </span>
                </MenuListItem>
              </MenuList>
            )}
          </div>
          <TextInput placeholder='Search...' width={150} />
        </Toolbar>
      </AppBar>
    );
  };