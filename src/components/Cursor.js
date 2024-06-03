import {Transition} from '@headlessui/react';
import {useEffect, useState} from 'react';

function Cursor() {
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsShowing((isShowing) => !isShowing);
        }, 50); // Adjust the interval time (in milliseconds) to control the flickering speed

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Transition
            className="inline"
            show={isShowing}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <span>▌</span>
        </Transition>
    );
}

export default Cursor;
