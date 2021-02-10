const isEmpty = async value => {
  return value === '' || value === null || value === undefined || value === 'null' || value === 'undefined'
}

const dateToString = async (value, format = 'dd-mm-YY') => {
  const dateObj = new Date(value)
  switch (format) {
    case 'dd-mm-YY':
      return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1)
        .toString().padStart(2, '0')}-${dateObj.getFullYear().toString()}`
    default:
      return value
  }
}

const generatePassword = async () => {
  let length = 5
  let randomPassword = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    randomPassword += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return randomPassword
}

export {
  isEmpty,
  dateToString,
  generatePassword
}
