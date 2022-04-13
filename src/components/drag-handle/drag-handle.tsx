import React, {HTMLAttributes, MouseEventHandler, useRef} from 'react';
import { debounce } from '../utils';
import styles from './drag-handle.module.css';

export interface DragHandlerProps {
  move: (relativeX: number) => void;
  direction: 'x' | 'y';
  style?: object;
    divProps?: Partial<HTMLAttributes<HTMLDivElement>> & Record<string, string | number>;
}

export const DragHandler = ({
  move,
  direction = 'x',
  style = {},
                                divProps = {}
}: DragHandlerProps) => {
  const elRef = useRef<HTMLElement | null>(null);

  const onMouseMove = React.useMemo(
    () =>
      debounce((e) => {
        e.preventDefault();
        if (!elRef.current) return;
        const clientDir = direction === 'x' ? 'clientX' : 'clientY';
        const boundingBox = elRef.current.getBoundingClientRect();
        const relativeDir = e[clientDir] - boundingBox[direction];
        move(relativeDir);
      }, 1),
    [elRef, direction, move]
  );

  const onMouseUp = React.useCallback(
    (e: Event) => {
      e.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
    },
    [onMouseMove]
  );

  React.useEffect(() => {
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  React.useEffect(() => {
    return () => document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseUp]);

  const onMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  React.useLayoutEffect(() => {
      function customEventHandler(e: CustomEvent) {
            e.stopPropagation();
            e.preventDefault();
            move(Number(e.detail['amount']));
      }
      elRef.current?.addEventListener('move', customEventHandler as never);
      return () => {
          elRef.current?.removeEventListener('move', customEventHandler as never);
      }
  }, [move])

  return (
    <div
      data-testid={`drag-handle-${direction}` }
      ref={elRef as any}
      className={direction === 'x' ? styles.x : styles.y}
      style={style}
      onMouseDown={onMouseDown}
      {...divProps}
    />
  );
};
