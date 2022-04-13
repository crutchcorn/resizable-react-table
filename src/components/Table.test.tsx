import React from 'react';
import {render, screen} from '@testing-library/react';
import {Table} from "./Table";

describe("Drag Handle", () => {
  test('should render data', () => {
    render(<Table data={[[1, 2], [3,4], [5, 6]]} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });
})
