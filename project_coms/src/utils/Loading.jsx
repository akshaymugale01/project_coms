import React from 'react';

const Loading = ({ message = "....lodaing" }) => {
  return (
    <div className="loading">
      <div>{message}</div>
    </div>
  );
};

export default Loading;
