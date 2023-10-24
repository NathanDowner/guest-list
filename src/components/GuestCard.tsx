import { Draggable } from 'react-beautiful-dnd';
import { Guest } from '../models/guest.interface';

interface GuestCardProps {
  index: number;
  guest: Guest;
  showNumbers?: boolean;
}

const GuestCard = ({ index, guest, showNumbers = false }: GuestCardProps) => {
  return (
    <Draggable draggableId={guest.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="border border-gray-500 rounded-md mb-2 text-left p-1"
        >
          {showNumbers && (
            <span className="mr-2 font-semibold">{index + 1}.</span>
          )}
          <span>{guest.name}</span>
        </div>
      )}
    </Draggable>
  );
};

export default GuestCard;
