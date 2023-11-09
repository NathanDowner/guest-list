import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addGuest, selectList } from '../store/guestListSlice';
import { Guest } from '../models/guest.interface';
import { createUUID } from '../utils';
import { Droppable } from 'react-beautiful-dnd';
import GuestCard from './GuestCard';
import { ListContributor } from '../models/contributor.interface';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface GuestListProps {
  contributor: ListContributor;
  listId: string;
}

const GuestList = ({ contributor, listId }: GuestListProps) => {
  const [newName, setNewName] = useState('');

  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const selectNamedList = selectList(contributor.name);
  const guestList = useAppSelector(selectNamedList);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGuest: Guest = {
      name: newName,
      id: createUUID(),
      contributorId: contributor.id,
    };
    dispatch(addGuest({ listName: contributor.name, guest: newGuest }));
    setNewName('');
  };

  const userCanEdit = useMemo(() => {
    return user!.email === contributor.email;
  }, [user, contributor]);

  const saveList = async () => {
    try {
      await setDoc(
        doc(db, `lists/${listId}/contributors/${contributor.id}`),
        {
          guests: guestList,
        },
        { merge: true },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center w-[250px] flex-shrink-0">
      <header>
        <h2 className="">{contributor.name}'s List</h2>
      </header>
      <div className="border border-gray-300 rounded-md p-4">
        <Droppable droppableId={contributor.name}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {guestList.map((guest, index) => (
                <GuestCard key={guest.id} guest={guest} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {userCanEdit && (
          <div className="flex flex-col gap-4 items-end">
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter a name.."
                className="border w-full rounded-md p-1"
              />
            </form>

            <button onClick={saveList} className="btn btn-sm btn-secondary">
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestList;
