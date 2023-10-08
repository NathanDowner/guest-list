import MainComponent from './components/MainComponent';
import { selectContributors } from './store/contributorSlice';
import { useAppSelector } from './store/hooks';

function App() {
  const contributors = useAppSelector(selectContributors);

  return (
    <>
      <div className="p-4">
        <header>
          <h1 className="text-4xl text-center">Guest list</h1>
        </header>
        {contributors.length ? <MainComponent /> : <div>uh oh</div>}
      </div>
    </>
  );
}

export default App;
