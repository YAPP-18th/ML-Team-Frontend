import React from 'react';
import { MainLayoutHeader } from '@components/layouts/main/MainLayoutHeader';
import { MainLayoutFooter } from '@components/layouts/main/MainLayoutFooter';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <MainLayoutHeader />
      {children}
      <MainLayoutFooter />
    </>
  );
};
