import { useNavigate } from 'react-router-dom';
import ListCard from './../components/ListCard';
import { AppRoutes } from '@/routes';

const ListsPage = () => {
  const navigate = useNavigate();

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

        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ListCard key={i} />
          ))}
        </div>
      </section>
      <section className="mb-6">
        <header className="mb-2 text-xl">
          <h2>Their Lists</h2>
        </header>

        <div className="flex gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <ListCard key={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ListsPage;
