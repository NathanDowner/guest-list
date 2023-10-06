import { Draggable } from 'react-beautiful-dnd';
import { Guest } from '../models/guest.interface';

interface GuestCardProps {
  index: number;
  guest: Guest;
}

const GuestCard = ({ index, guest }: GuestCardProps) => {
  return (
    <Draggable draggableId={guest.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="border border-gray-500 rounded-md mb-2 text-left p-1"
        >
          <span>{guest.name}</span>
        </div>
      )}
    </Draggable>
  );
};

export default GuestCard;
