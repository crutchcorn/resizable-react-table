import React from 'react';
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import {Table} from "./Table";

function fireEventMouseDrag(el: HTMLElement, x: number, y: number) {
  const boundingRect = el.getBoundingClientRect();
  fireEvent.mouseDown(el);
  fireEvent.mouseMove(el, {clientX: boundingRect.x + x, clientY: boundingRect.y + y});
  fireEvent.mouseUp(el);
}

describe("Drag Handle", () => {
  test('should render data', () => {
    render(<Table data={[[1, 2], [3, 4], [5, 6]]}/>);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  test('should be resizable in the X direction', async () => {
    render(<Table data={[[1, 2], [3, 4], [5, 6]]}/>);
    // eslint-disable-next-line testing-library/no-node-access
    const firstColumn = screen.getByText('1').closest('td')!;
    const ogWidth = firstColumn.style.width;
    const dragHandle = within(firstColumn).getByTestId('drag-handle-x');
    // Right
    fireEventMouseDrag(dragHandle, 10, 0);
    await waitFor(() => expect(ogWidth).not.toBe(firstColumn.style.width));
    expect(firstColumn.style.width).toBe('10px');
  })


  test('should be resizable in the Y direction', async () => {
    render(<Table data={[[1, 2], [3, 4], [5, 6]]}/>);
    // eslint-disable-next-line testing-library/no-node-access
    const firstRow = screen.getByText('1').closest('tr')!;
    const ogHeight = firstRow.style.height;
    const dragHandle = within(firstRow).getByTestId('drag-handle-y');
    // Right
    fireEventMouseDrag(dragHandle, 0, 10);
    await waitFor(() => expect(ogHeight).not.toBe(firstRow.style.height));
    expect(firstRow.style.height).toBe('10px');
  })
});
