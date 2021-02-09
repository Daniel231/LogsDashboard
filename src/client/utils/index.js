export const debounce = () => {
    const timeout = 0;

    return (callback, ms) => {
        clearTimeout(timeout);
        
        setTimeout(callback, ms);
    }
}