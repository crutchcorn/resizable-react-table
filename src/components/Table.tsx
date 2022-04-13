import React, { Fragment } from 'react';
import { Row } from './Row';
import useDimensions from 'use-element-dimensions';

interface TableProps {
  data: any[][];
}
export const Table = ({ data }: TableProps) => {
  const [tableSize, ref] = useDimensions();

  return (
    <table style={{ position: 'relative' }} ref={ref}>
      <tbody>
        {data.map((row, i) => (
          <Row tableSize={tableSize} row={row} isFirst={i === 0} />
        ))}
      </tbody>
    </table>
  );
};
