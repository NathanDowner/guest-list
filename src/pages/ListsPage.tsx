import { useNavigate } from 'react-router-dom';
import ListCard from './../components/ListCard';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AppRoutes } from '@/routes';
import { FieldPath, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { listConverter } from '@/models/list.interface';

const ListsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const path: FieldPath = new FieldPath('contributors', user!.email!);
  const q = query(collection(db, 'lists'), where(path, '!=', '')).withConverter(
    listConverter,
  );

  const [values, loading, error] = useCollectionData(q, { initialValue: [] });

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
              <ListCard list={list} key={list.id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default ListsPage;
