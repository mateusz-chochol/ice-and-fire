import { FC } from "react";

const TableHeader: FC = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Alive</th>
        <th>Gender</th>
        <th>Culture</th>
        <th>Allegiances</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
