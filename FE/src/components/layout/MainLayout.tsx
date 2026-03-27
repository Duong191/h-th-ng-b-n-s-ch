import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  topBarVariant?: 'default' | 'auth';
}

export default function MainLayout({ topBarVariant = 'default' }: MainLayoutProps) {
  return (
    <>
      <Header topBarVariant={topBarVariant} />
      <Outlet />
      <Footer />
    </>
  );
}
