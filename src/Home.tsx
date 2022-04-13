import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export const Home = forwardRef((_, ref) => {
    const elRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => ({
        width: elRef.current!.clientWidth,
    }));

    return (
        <p style={{ display: 'inline-block' }} ref={elRef as any}>
            Hi there!
        </p>
    );
});
