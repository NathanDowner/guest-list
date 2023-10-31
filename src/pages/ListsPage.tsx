import { Link, useNavigate } from 'react-router-dom';
import ListCard from './../components/ListCard';
import { AppRoutes } from '@/routes';
import { useGetUserLists } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

const ListsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [values, loading, error] = useGetUserLists(user!.email!);

  const createNewList = () => {
    navigate(AppRoutes.newList);
  };

  return (
    <>
      <header className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl">All Lists</h1>
        <button
          onClick={createNewList}
          className="border py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          Create List
        </button>
      </header>

      <section className="mb-6">
        <header className="mb-2 text-xl">
          <h2>My Lists</h2>
        </header>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex gap-4">
            {values!.map((list) => (
              <Link key={list.id} to={AppRoutes.guestListBuilder(list.id)}>
                <ListCard list={list} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default ListsPage;
