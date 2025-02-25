import React, { useEffect, useState } from 'react';
import {
  Anchor,
  AppBar,
  Button,
  Hourglass,
  MenuList,
  MenuListItem,
  Separator,
  TextInput,
  Toolbar
} from 'react95';
import logoIMG from '../assets/logo1.png';
import { localStorageHelper } from '../constants';

export const Layout = ({ element }: { element: any }) => {

  const [open, setOpen] = useState(false);
  const isLogedIn = localStorageHelper.getItem('isLogedIn');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(delayedMessage, delay);
  }, [isLoading]);

  const delay: number = 1000;

  const delayedMessage: () => void = () => {
    //console.log("This message is displayed after 4 seconds.");
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh",
            padding: 20,
          }}>
          {element}
        </div>
      )}

      <AppBar style={{ top: "unset", bottom: 0 }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button
              //disabled={true}
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
                <MenuListItem
                  onClick={() => window.location.href = '/profile'}>
                  {"Profile"}
                  <span role='img' aria-label='👨‍💻 '>
                    {`👨‍💻 `}
                  </span>
                </MenuListItem>
                <MenuListItem
                  onClick={() => window.location.href = '/experience'}>
                  {"Experience"}
                  <span role='img' aria-label='📁 '>
                    {`📁 `}
                  </span>
                </MenuListItem>
                <Separator />
                <MenuListItem
                  //disabled
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

    </>
  );
}
