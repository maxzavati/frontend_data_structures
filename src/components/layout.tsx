import { Outlet } from 'react-router-dom';
import { Navigation } from './navigation';

export default function MainLayout() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
