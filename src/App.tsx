import AddContributorsForm from './components/AddContributorsForm';
import GuestListBuilderPage from './pages/GuestListBuilderPage';
import { selectContributors } from './store/contributorSlice';
import { useAppSelector } from './store/hooks';
import { MIN_CONTRIBUTORS } from './utils/constants';

function App() {
  const contributors = useAppSelector(selectContributors);

  return (
    <>
      {contributors.length >= MIN_CONTRIBUTORS ? (
        <GuestListBuilderPage />
      ) : (
        <AddContributorsForm />
      )}
    </>
  );
}

export default App;
