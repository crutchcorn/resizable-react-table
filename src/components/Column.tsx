import React from 'react';
import {DragHandler, DragHandlerProps} from './drag-handle/drag-handle';

interface ColumnProps {
  isFirst: boolean;
  column: any[];
  children: React.ReactNode;
  tableSize: { height: number; width: number };
  columnRef: React.Ref<HTMLElement>;
  rowIndex: number;
  colIndex: number;
  dragHandlerProps?: DragHandlerProps['divProps'];
}

export const Column = ({
  column,
  isFirst,
  children,
  tableSize,
  columnRef,
  rowIndex,
  colIndex,
                         dragHandlerProps = {}
}: ColumnProps) => {
  const [explicitWidth, setExplicitWidth] = React.useState<null | number>(null);

  const setWidth = React.useCallback(
    (val: number) => {
      setExplicitWidth((v) => {
        const newWidth = (v || 0) + val;
        if (newWidth < (0)) return v;
        return newWidth;
      });
    },
    []
  );

  return (
    <td style={{ position: 'relative', width: explicitWidth ?? undefined }} ref={columnRef as never}>
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
          divProps={{
            'data-column': colIndex,
            'data-row': rowIndex,
            'data-direction': 'x',
            tabIndex: -1,
            ...(dragHandlerProps as object)
          }}
        />
      )}
      {children}
      {column}
    </td>
  );
};
