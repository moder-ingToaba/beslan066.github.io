function j(arg1, arg2) {
    if (typeof arg1 === 'string' || arg1 instanceof String) {
        return document.querySelector(arg1);
    }
}