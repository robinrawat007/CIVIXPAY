import { useEffect, useRef } from 'react';

function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element: Window | HTMLElement = window,
    options?: boolean | AddEventListenerOptions
) {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event: Event) => savedHandler.current(event as unknown as WindowEventMap[K]);

        element.addEventListener(eventName, eventListener, options);

        return () => {
            element.removeEventListener(eventName, eventListener, options);
        };
    }, [eventName, element, options]);
}

export default useEventListener;
