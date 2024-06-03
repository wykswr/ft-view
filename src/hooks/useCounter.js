import {useMethods} from "./useMethods";


const methods = {
    increment(value) {
        return value + 1;
    },
    decrement(value) {
        return value - 1;
    },
    set(value, newValue) {
        return newValue;
    }
};

const useCounter = (initialValue = 0) => {
    return useMethods(initialValue, methods);
};


export default useCounter;
