import { Outlet } from 'react-router-dom';
import { Navigation } from './navigation';

export default function MainLayout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}
