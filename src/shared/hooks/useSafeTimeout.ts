import { useEffect, useRef } from 'react';

function useSafeTimeout() {
    const timers = useRef<number[]>([]);

    const setSafeTimeout = (callback: () => void, delay: number) => {
        const timer = window.setTimeout(callback, delay);
        timers.current.push(timer);
        return timer;
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            timers.current.forEach(timer => window.clearTimeout(timer));
        };
    }, []);

    return { setSafeTimeout };
}

export default useSafeTimeout;
