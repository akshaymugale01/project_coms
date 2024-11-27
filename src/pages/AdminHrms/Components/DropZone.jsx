import { useDrop } from "react-dnd";
import { MdClose } from "react-icons/md";

const ItemTypes = {
  FIELD: "field",
};

const DropZone = ({ title, fields, onDrop, removeField }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.FIELD,
    drop: (item) => {
      if (fields.length < 8) {
        onDrop(item.name); // Only allow dropping if there are less than 8 fields
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`p-4 border rounded-lg min-h-[25rem] ${
        isOver ? "bg-blue-100" : "bg-white"
      }`}
    >
      <h3 className="font-semibold mb-4 text-center">{title}</h3>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-red-100 p-2 rounded-lg"
          >
            {field}
            <button onClick={() => removeField(field)} className="text-red-600">
              <MdClose size={15} />
            </button>
          </div>
        ))}
      </div>
      {fields.length >= 8 && (
        <p className="text-red-500 text-sm text-center mt-2">
          Maximum of 8 fields allowed
        </p>
      )}
    </div>
  );
};

export default DropZone;
