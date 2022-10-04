import React from 'react';

import './TableBody.css';

function TableBody({ body }) {
  let arr = (Object.entries(body)).sort();
  return (
    <tr>
      {
        arr && arr.map((item, index) => {
          return <td
                  key={index}
                  className="td"
                >
                  {item[1]}
                </td>
        })
      }
    </tr>
  );
}

export default TableBody;