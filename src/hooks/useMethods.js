import {useMemo, useState} from "react";


export const useMethods = (initialValue, methods) => {
    const [value, setValue] = useState(initialValue);
    const boundMethods = useMemo(
        () => Object.entries(methods).reduce(
            (methods, [name, fn]) => {
                methods[name] = (...args) => {
                    setValue(value => fn(value, ...args));
                };
                return methods;
            },
            {}
        ),
        [methods]
    );
    return [value, boundMethods];
};