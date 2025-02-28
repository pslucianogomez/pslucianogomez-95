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
import { AppMenuBar } from '../components/AppBar/AppMenuBar';

export const Layout = ({ element }: { element: any }) => {

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

      <AppMenuBar />
    </>
  );
}
