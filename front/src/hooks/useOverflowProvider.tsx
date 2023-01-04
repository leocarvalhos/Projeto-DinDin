import { useState } from 'react';

export default function useOverflowProvider() {
    const [overflow, setOverflow] = useState(false);

    return {
        overflow,
        setOverflow,
    };
}
