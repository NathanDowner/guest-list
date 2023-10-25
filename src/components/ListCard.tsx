import { List } from '@/models/list.interface';

interface Props {
  list: List;
}

const ListCard = ({ list }: Props) => {
  return (
    <div className="border-2 rounded-md min-h-[200px] w-40 p-4">
      <div className="flex h-full flex-col justify-end">
        <h3 className="text-lg">{list.title}</h3>
        <small className="text-gray-600">
          Created by: {list.author.split(' ')[0]}
        </small>
      </div>
    </div>
  );
};

export default ListCard;
