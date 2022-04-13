import React from 'react';
import {Row} from './Row';
import useDimensions from 'use-element-dimensions';

interface TableProps {
    data: any[][];
}

function findDragHandle(column: number | string, row: number | string, direction: "x" | "y") {
    const query = `[data-testid^="drag-handle"][data-column="${column}"][data-row="${row}"][data-direction="${direction}"]`;
    console.log({query});
    return document.querySelector(
        `[data-testid^="drag-handle"][data-column="${column}"][data-row="${row}"][data-direction="${direction}"]`
    ) as HTMLElement | null;
}

export const Table = ({data}: TableProps) => {
    const [tableSize, ref] = useDimensions();

    function enterEditMode() {
        findDragHandle(0,0,'x')?.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
        const {dataset} = event.currentTarget as HTMLElement;
        const column = Number(dataset.column);
        const row = Number(dataset.row);
        switch (event.key) {
            case "Space":
            case "Enter":
                // enterEditMode();
                break;
            case "Escape":
                // exitMode();
                break;
            case "ArrowLeft":
                findDragHandle(column - 1, row,'x')?.focus();
                break;
            case "ArrowRight":
                findDragHandle(column + 1, row,'x')?.focus();
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

    return (
        <div>
            <button onClick={enterEditMode}>Edit divider layout</button>
            <table style={{position: 'relative'}} ref={ref}>
                <tbody>
                {data.map((row, i) => (
                    <Row key={i} tableSize={tableSize} rowIndex={i} row={row} isFirst={i === 0} dragHandlerProps={{onKeyDown: onKeyDown as never}}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};
