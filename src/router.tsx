import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout';
import MapRoute from './routes/map';
import SetRoute from './routes/set';
import StackRoute from './routes/stack';

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
      {
        path: '/stack',
        element: <StackRoute />,
      },
    ],
  },
]);

export default router;
