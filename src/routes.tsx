import { Navigate, createBrowserRouter } from 'react-router-dom';
import GuestListBuilderPage from './pages/GuestListBuilderPage';
import ListsPage from './pages/ListsPage';
import AuthGuard from './components/AuthGuard';
import AddContributorsForm from './components/AddContributorsForm';
import DefaultLayout from './layouts/DefaultLayout';
import App from './App';

export const AppRoutes = {
  root: '/',
  lists: '/lists',
  newList: '/new-list',
  guestListBuilder: (listId: string) => `/lists/${listId}`,
};

export const router = createBrowserRouter([
  {
    path: '',
    element: <Navigate to="/lists" />,
  },
  {
    path: 'lists/',
    element: <AuthGuard />,
    children: [
      { path: '', element: <ListsPage /> },

      { path: ':listId', element: <GuestListBuilderPage /> },
    ],
  },
  {
    path: 'new-list',
    element: (
      <DefaultLayout>
        <App />
      </DefaultLayout>
    ),
  },
  { path: '*', element: <div>Not Found</div> },
]);
