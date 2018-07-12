import React from 'react';

const RowHeader = props => {
  return (
    <div>
      <p className="column_header">{props.columnHeader}</p>
    </div>
  );
};

export default RowHeader;
