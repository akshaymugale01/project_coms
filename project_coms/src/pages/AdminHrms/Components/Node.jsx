const Node = ({ imageUrl, initials, name, position, children }) => {
    return (
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 mb-2">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="rounded-full" />
          ) : (
            <span className="text-xl font-semibold">{initials}</span>
          )}
        </div>
        {/* Name and position */}
        <div className="text-center">
          <h3 className="font-bold text-sm">{name}</h3>
          <p className="text-gray-500 text-xs">{position}</p>
        </div>
        {/* Downward arrow */}
        {children && <div className="border-l-2 border-dashed h-8" />}
        {/* Render children nodes */}
        {children && <div className="flex space-x-4 mt-4">{children}</div>}
      </div>
    );
  };
  export default Node