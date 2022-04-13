import React, { MouseEventHandler, useRef } from 'react';
import { debounce } from './utils';

interface DragHandlerProps {
    moveX: (relativeX: number) => void;
}

export const DragHandler = ({ moveX }: DragHandlerProps) => {
    const elRef = useRef<HTMLElement | null>(null);

    const onMouseMove = React.useMemo(
        () =>
            debounce((e) => {
                if (!elRef.current) return;
                const boundingBox = elRef.current.getBoundingClientRect();
                const relativeX = e.clientX - boundingBox.x;
                moveX(relativeX);
            }, 1),
        [elRef]
    );

    const onMouseUp = React.useCallback(() => {
        document.removeEventListener('mousemove', onMouseMove);
    }, [onMouseMove]);

    React.useEffect(() => {
        return () => document.removeEventListener('mousemove', onMouseMove);
    }, [onMouseMove]);

    React.useEffect(() => {
        return () => document.removeEventListener('mouseup', onMouseUp);
    }, [onMouseUp]);

    const onMouseDown: MouseEventHandler = (e) => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            ref={elRef as any}
            style={{ width: '2px', backgroundColor: 'red', cursor: 'col-resize' }}
            onMouseDown={onMouseDown}
        />
    );
};
