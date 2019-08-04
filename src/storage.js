const generateUniqueUsername = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9)
}

export const saveUsername = (username) => {
  if (window.sessionStorage.getItem('username')) {
    return
  }
  window.sessionStorage.setItem('username', username)
}

export const getUsername = () => {
  const key = 'username'

  if (!window.sessionStorage.getItem(key)) {
    throw new Error('username is not defined in sessionStorage')
  }

  return window.sessionStorage.getItem(key)
}
