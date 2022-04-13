import React from 'react';
import {Row} from './Row';
import useDimensions from 'use-element-dimensions';

interface TableProps {
    data: any[][];
}

function findDragHandle(column: number | string, row: number | string, direction: "x" | "y") {
    return document.querySelector(
        `[data-testid^="drag-handle"][data-column="${column}"][data-row="${row}"][data-direction="${direction}"]`
    ) as HTMLElement | null;
}

export const Table = ({data}: TableProps) => {
    const [tableSize, ref] = useDimensions();

    const dividerEditMode = React.useRef<'none' | 'navigate' | 'drag'>('none');

    function enterEditMode() {
        dividerEditMode.current = 'navigate';
        findDragHandle(0,0,'x')?.focus();
    }

    function onKeyDownNavMode(event: KeyboardEvent) {
        const {dataset} = event.currentTarget as HTMLElement;
        const column = Number(dataset.column);
        const row = Number(dataset.row);
        switch (event.key) {
            case " ":
            case "Enter":
                dividerEditMode.current = 'drag';
                break;
            case "Escape":
                dividerEditMode.current = 'none';
                break;
            case "ArrowLeft":
                // Row must be set to 0, otherwise it will never get the proper X drag handler
                findDragHandle(column - 1, 0,'x')?.focus();
                break;
            case "ArrowRight":
                // Row must be set to 0, otherwise it will never get the proper X drag handler
                findDragHandle(column + 1, 0,'x')?.focus();
                break;
            case "ArrowUp":
                findDragHandle(column, row - 1,'y')?.focus();
                break;
            case "ArrowDown":
                findDragHandle(column, row + 1,'y')?.focus();
                break;
            default:
                break;
        }
    }

    function onKeyDownEditMode(event: KeyboardEvent) {
        const el = event.currentTarget as HTMLElement;
        const direction = el.dataset.direction;
        if (event.key === " " || event.key === "Enter" || event.key === "Escape") {
            // Exit edit mode to nav mode
            dividerEditMode.current = 'navigate';
            return;
        }
        const createMoveEvent = (val: number) => {
            return new CustomEvent('move', {detail: {amount: val}})
        }
        if (direction === 'x') {
            switch (event.key) {
                case "ArrowLeft":
                    el.dispatchEvent(createMoveEvent(-10));
                    break;
                case "ArrowRight":
                    el.dispatchEvent(createMoveEvent(10));
                    break;
                default:
                    break;
            }
        }
        if (direction === 'y') {
            switch (event.key) {
                case "ArrowUp":
                    el.dispatchEvent(createMoveEvent(-10));
                    break;
                case "ArrowDown":
                    el.dispatchEvent(createMoveEvent(10));
                    break;
                default:
                    break;
            }
        }
    }

    function onKeyDown(event: KeyboardEvent) {
        switch (dividerEditMode.current) {
            case "drag":
                onKeyDownEditMode(event);
                break;
            case "navigate":
                onKeyDownNavMode(event);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <button onClick={enterEditMode}>Edit divider layout</button>
            <table style={{position: 'relative'}} ref={ref} onBlur={(e) => {
                // Prevent `none` from being set when divider is focused programmatically
                if (e.currentTarget.contains(e.relatedTarget)) return;
                dividerEditMode.current = 'none';
            }}>
                <tbody>
                {data.map((row, i) => (
                    <Row key={i} tableSize={tableSize} rowIndex={i} row={row} isFirst={i === 0} dragHandlerProps={{onKeyDown: onKeyDown as never}}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};
