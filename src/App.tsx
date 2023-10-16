import AddContributorsForm from './components/AddContributorsForm';
import MainComponent from './components/MainComponent';
import { selectContributors } from './store/contributorSlice';
import { useAppSelector } from './store/hooks';
import { MIN_CONTRIBUTORS } from './utils/constants';

function App() {
  const contributors = useAppSelector(selectContributors);

  return (
    <>
      <div className="p-4 max-w-5xl mx-auto">
        <header>
          <h1 className="text-4xl text-center">Guest list</h1>
        </header>
        {contributors.length >= MIN_CONTRIBUTORS ? (
          <MainComponent />
        ) : (
          <AddContributorsForm />
        )}
      </div>
    </>
  );
}

export default App;
