import React, { Fragment } from 'react';
import { DragHandler } from './drag-handle';

interface ColumnProps {
  isFirst: boolean;
  column: any[];
  children: React.ReactNode;
  tableSize: { height: number; width: number };
  columnRef: React.Ref<HTMLElement>;
}

export const Column = ({
  column,
  isFirst,
  children,
  tableSize,
  columnRef,
}: ColumnProps) => {
  const [explicitWidth, setExplicitWidth] = React.useState<null | number>(null);
  const [initSize, setInitSize] = React.useState<{height: number, width: number} | null>(null);

  const setWidth = React.useCallback(
    (val: number) => {
      setExplicitWidth((v) => {
        const newWidth = (v || initSize?.width || 0) + val;
        if (newWidth < (initSize?.width || 0)) return v;
        return newWidth;
      });
    },
    [initSize]
  );

  const assignInitSize = React.useCallback((el: HTMLElement) => {
    setInitSize(el.getBoundingClientRect());
  }, []);

  const realWidth = explicitWidth || initSize?.width;

  return (
    <td style={{ position: 'relative', width: realWidth }} ref={columnRef}>
      {isFirst && (
        <DragHandler
          direction="x"
          move={setWidth}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: tableSize.height,
            zIndex: 1,
          }}
        />
      )}
      {children}
      {column}
    </td>
  );
};
