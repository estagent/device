import {getIdentifications, updateIdentifications} from './identifications'

let userId

export const setCurrentUser = id => {
  userId = id
  updateIdentifications('currentUser', id)
  incrementUserCounter('login')
}

export const getUsers = () => {
  return getIdentifications()['users']
}

const updateUsers = data => {
  updateIdentifications('users', data)
}

export const getUserIdentification = () => {
  const users = getUsers()
  if (Object.keys(users).includes(userId)) return users[userId]
}

export const updateUserIdentification = (attributes = {}) => {
  const data = getUserIdentification() ?? {
    createdAt: Date.now(),
  }

  for (let key of Object.keys(attributes)) {
    data[key] = attributes[key]
  }
  data['updatedAt'] = Date.now()
  const users = getUsers()
  users[userId] = data
  updateUsers(users)
}

export const incrementUserCounter = key => {
  const data = getUserIdentification() ?? {}
  updateUserIdentification({
    [key]: (data[key] ?? 0) + 1,
  })
}
