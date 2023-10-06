import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addGuest, selectList } from '../store/guestListSlice';
import { Guest } from '../models/guest.interface';
import { createUUID } from '../utils';

interface GuestListProps {
  name?: string;
}

const GuestList = ({ name = '' }: GuestListProps) => {
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

  return (
    <div className="text-center last:text-right first:text-left">
      <h2 className="">{name ? `${name}'s List` : 'Final List'}</h2>
      <div className="border border-gray-300 rounded-md p-4">
        {guestList.map(({ name, id }) => (
          <div
            key={id}
            className="border border-gray-500 rounded-md mb-2 text-left p-1"
          >
            <span>{name}</span>
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter a name.."
            className="border w-full rounded-md p-1"
          />
        </form>
      </div>
    </div>
  );
};

export default GuestList;
