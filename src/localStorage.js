const generateUniqueUsername = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const getUsername = (key = 'username') => {

    if(!localStorage.getItem(key)) {
      localStorage.setItem(key, generateUniqueUsername())
    }

    return localStorage.getItem(key)
}