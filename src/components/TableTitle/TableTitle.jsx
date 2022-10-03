import React from 'react';

import './TableTitle.css';

function TableTitle({ title }) {
  return (
    <th className="th">
      {title}
    </th>
  );
}

export default TableTitle;