import React, { MouseEventHandler, useRef } from 'react';
import { debounce } from './utils';

interface DragHandlerProps {
    move: (relativeX: number) => void;
    direction: 'x' | 'y';
}

export const DragHandler = ({ move, direction = 'x' }: DragHandlerProps) => {
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
        [elRef, direction]
    );

    const onMouseUp = React.useCallback(
        (e: any) => {
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

    return (
        <div
            ref={elRef as any}
            style={{
                ...(direction === 'x' ? { width: '2px' } : { height: '2px' }),
                backgroundColor: 'red',
                cursor: direction === 'x' ? 'col-resize' : 'row-resize',
            }}
            onMouseDown={onMouseDown}
        />
    );
};
