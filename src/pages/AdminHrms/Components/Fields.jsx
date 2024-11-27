import { useDrag } from "react-dnd";
const ItemTypes = {
    FIELD: 'field',
  };
const Field = ({ name }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.FIELD,
      item: { name },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    return (
      <div
        ref={drag}
        className={`p-2 bg-gray-200 rounded-lg shadow mb-2 ${
          isDragging ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {name}
      </div>
    );
  };
  export default Field