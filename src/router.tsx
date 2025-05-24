import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout';
import MapRoute from './routes/map';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: '/map',
        element: <MapRoute />,
      },
    ],
  },
]);

export default router;
