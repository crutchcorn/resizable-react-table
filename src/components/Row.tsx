import React, { Fragment } from 'react';
import { Column } from './Column';
import { DragHandler } from './drag-handle';

interface RowProps {
  isFirst: boolean;
  row: any[];
  tableSize: { height: number; width: number };
}

export const Row = ({ row, isFirst, tableSize }: RowProps) => {
  const [explicitHeight, setExplicitHeight] = React.useState<null | number>(null);
  const [initSize, setInitSize] = React.useState<{height: number, width: number} | null>(null);

  const setHeight = React.useCallback(
    (val: number) => {
      setExplicitHeight((v) => {
        const newHeight = (v || initSize?.height || 0) + val;
        if (newHeight < (initSize?.height || 0)) return v;
        return newHeight;
      });
    },
    [initSize]
  );

  const assignInitSize = React.useCallback((el: HTMLElement) => {
    if (!el) return;
    setInitSize(el.getBoundingClientRect());
  }, []);

  const realHeight = explicitHeight || initSize?.height;

  return (
    <tr style={{ height: realHeight }}>
      {row.map((column, i) => {
        return (
          <Column
            key={i}
            columnRef={assignInitSize}
            column={column}
            isFirst={isFirst}
            tableSize={tableSize}
          >
            {i === 0 && (
              <DragHandler
                direction="y"
                move={setHeight}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: tableSize.width,
                  zIndex: 1,
                }}
              />
            )}
          </Column>
        );
      })}
    </tr>
  );
};
