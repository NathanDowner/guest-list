import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addGuest, selectList } from '../store/guestListSlice';
import { Guest } from '../models/guest.interface';
import { createUUID } from '../utils';
import { Droppable } from 'react-beautiful-dnd';
import GuestCard from './GuestCard';
import { FINAL_LIST_NAME } from '../utils/constants';
import { Contributor } from '../models/contributor.interface';

interface GuestListProps {
  contributor: Contributor;
}

const GuestList = ({ contributor: { name, id } }: GuestListProps) => {
  const [newName, setNewName] = useState('');

  const dispatch = useAppDispatch();
  const selectNamedList = selectList(name);
  const guestList = useAppSelector(selectNamedList);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGuest: Guest = { name: newName, id: createUUID() };
    dispatch(addGuest({ listName: name, guest: newGuest }));
    setNewName('');
  };

  const canAddGuest = useMemo(() => name !== FINAL_LIST_NAME, [name]);

  return (
    <div className="text-center last:text-right first:text-left">
      <header>
        <h2 className="">{canAddGuest ? `${name}'s List` : name}</h2>
      </header>
      <div className="border border-gray-300 rounded-md p-4">
        <Droppable droppableId={name}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {guestList.map((guest, index) => (
                <GuestCard key={guest.id} guest={guest} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {canAddGuest && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter a name.."
              className="border w-full rounded-md p-1"
            />
          </form>
        )}

        {!canAddGuest && !guestList.length && (
          <span className="text-sm text-gray-400">
            Drag guests here to build your master list!
          </span>
        )}
      </div>
    </div>
  );
};

export default GuestList;
