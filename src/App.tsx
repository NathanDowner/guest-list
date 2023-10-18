import AddContributorsForm from './components/AddContributorsForm';
import MainComponent from './components/MainComponent';
import { auth } from './lib/firebase';
import { selectContributors } from './store/contributorSlice';
import { useAppSelector } from './store/hooks';
import { MIN_CONTRIBUTORS } from './utils/constants';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

function App() {
  const contributors = useAppSelector(selectContributors);
  const [user, loading, authStateError] = useAuthState(auth);
  const [signInWithGoogle, loggedInUser, isLoggingIn, loginError] =
    useSignInWithGoogle(auth);

  return (
    <>
      <header className="bg-gray-300">
        <div className="flex justify-between items-center mx-auto max-w-5xl p-4">
          <h1 className="text-4xl text-center">Guest listrr</h1>
          <div>
            {user ? (
              user.displayName
            ) : (
              <button onClick={() => signInWithGoogle()}>Login</button>
            )}
          </div>
        </div>
      </header>
      <div className="p-4 max-w-5xl mx-auto">
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
