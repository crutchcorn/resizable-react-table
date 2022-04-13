import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {DragHandler} from "./drag-handle";

describe("Drag Handle", () => {
  test('should render', () => {
    const move = jest.fn();
    render(<DragHandler direction={"x"} move={move} />);
    expect(screen.getByTestId('drag-handle')).toBeInTheDocument();
  });

  test('should handle mouse moving right', async () => {
    const move = jest.fn();
    render(<DragHandler direction={"x"} move={move} />);
    const dragHandle = screen.getByTestId('drag-handle');
    fireEvent.mouseDown(dragHandle);
    fireEvent.mouseMove(dragHandle, {clientX: 10, clientY: 0});
    await waitFor(() => expect(move).toHaveBeenCalledTimes(1));
    expect(move).toHaveBeenCalledWith(10);
  });

  test('should handle mouse moving left', async () => {
    const move = jest.fn();
    render(<DragHandler direction={"x"} move={move} />);
    const dragHandle = screen.getByTestId('drag-handle');
    fireEvent.mouseDown(dragHandle);
    fireEvent.mouseMove(dragHandle, {clientX: -10, clientY: 0});
    await waitFor(() => expect(move).toHaveBeenCalledTimes(1));
    expect(move).toHaveBeenCalledWith(-10);
  });

  test('should handle mouse moving up', async () => {
    const move = jest.fn();
    render(<DragHandler direction={"y"} move={move} />);
    const dragHandle = screen.getByTestId('drag-handle');
    fireEvent.mouseDown(dragHandle);
    fireEvent.mouseMove(dragHandle, {clientX: 0, clientY: -10});
    await waitFor(() => expect(move).toHaveBeenCalledTimes(1));
    expect(move).toHaveBeenCalledWith(-10);
  });

  test('should handle mouse moving down', async () => {
    const move = jest.fn();
    render(<DragHandler direction={"y"} move={move} />);
    const dragHandle = screen.getByTestId('drag-handle');
    fireEvent.mouseDown(dragHandle);
    fireEvent.mouseMove(dragHandle, {clientX: 0, clientY: 10});
    await waitFor(() => expect(move).toHaveBeenCalledTimes(1));
    expect(move).toHaveBeenCalledWith(10);
  });

  test('make sure mousemove does not do anything when mousedown not called', async () => {
    const move = jest.fn();
    render(<DragHandler direction={"y"} move={move} />);
    const dragHandle = screen.getByTestId('drag-handle');
    fireEvent.mouseMove(dragHandle, {clientX: 0, clientY: 10});
    await waitFor(() => expect(move).not.toHaveBeenCalledTimes(1));
  });

  test('make sure mousemove is cleaned up on mouseup', async () => {
    const move = jest.fn();
    render(<DragHandler direction={"y"} move={move} />);
    const dragHandle = screen.getByTestId('drag-handle');
    fireEvent.mouseDown(dragHandle);
    fireEvent.mouseUp(dragHandle);
    fireEvent.mouseMove(dragHandle, {clientX: 0, clientY: 10});
    await waitFor(() => expect(move).not.toHaveBeenCalledTimes(1));
  });
})
