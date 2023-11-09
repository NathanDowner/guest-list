import { selectList } from '@/store/guestListSlice';
import { useAppSelector } from '@/store/hooks';
import { FINAL_LIST_NAME } from '@/utils/constants';
import { Droppable } from 'react-beautiful-dnd';
import GuestCard from './GuestCard';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface MasterListProps {
  listId: string;
  onSave: () => void;
}

const MasterList = ({ listId, onSave }: MasterListProps) => {
  const selectMasterList = selectList(FINAL_LIST_NAME);
  const masterList = useAppSelector(selectMasterList);

  const saveList = async () => {
    try {
      await setDoc(
        doc(db, `lists/${listId}`),
        {
          guests: masterList,
        },
        { merge: true },
      );
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center w-[250px] flex-shrink-0">
      <header>
        <h2 className="">Master List</h2>
      </header>
      <div className="border border-gray-300 rounded-md p-4">
        <Droppable droppableId={FINAL_LIST_NAME}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {masterList.map((guest, index) => (
                <GuestCard
                  key={guest.id}
                  guest={guest}
                  index={index}
                  showNumbers={true}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {!masterList.length && (
          <span className="text-sm text-gray-400">
            Drag guests here to build your master list!
          </span>
        )}
        <button onClick={saveList} className="btn btn-sm btn-secondary">
          Save
        </button>
      </div>
    </div>
  );
};

export default MasterList;
