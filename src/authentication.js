const generateUniqueUsername = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9)
}

const key = 'user'

function storageAvailable (type = 'localStorage') {
  const storage = window[type]
  try {
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof window.DOMException && (
    // everything except Firefox
      e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0)
  }
}

export const saveUsername = (username) => {
  if (storageAvailable()) {
    window.localStorage.setItem('user', JSON.stringify(username))
  }
}

export const getUsername = () => {
  if (!window.localStorage.getItem(key)) {
    return
  }

  return JSON.parse(window.localStorage.getItem(key))
}

export const isAuthenticated = () => {
  if (getUsername()) {
    return true
  }

  return false
}