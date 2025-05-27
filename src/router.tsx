import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout';
import MapRoute from './routes/map';
import SetRoute from './routes/set';

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
      {
        path: '/set',
        element: <SetRoute />,
      },
    ],
  },
]);

export default router;
