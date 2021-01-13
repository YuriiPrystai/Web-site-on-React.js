import React from 'react';

const TableRow = ({ info: { name, value } }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

export default TableRow;
