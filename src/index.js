import Bowser from 'bowser'
import {
  setCurrentAgent,
  getAgentIdentification,
  updateAgentIdentification,
  incrementAgentCounter,
  getAgents,
} from './agents'
import {
  setCurrentUser,
  getUserIdentification,
  updateUserIdentification,
  getUsers,
  incrementUserCounter,
} from './users'
import {getIdentifier} from './identifications'

let parser

export const bootDevice = (UA = window.navigator.userAgent) => {
  parser = Bowser.getParser(UA)
  setCurrentAgent(UA)
  bindSessionListener()
  bindLoginListener()
  return {
    getAgentParser: () => parser,
    getAgentResult: () => parser.getResult(),
    getUserAgent: () => parser.getUA(),
    getBrowser: () => parser.getBrowser(),
    getPlatform: () => parser.getPlatform(),
    getOS: () => parser.getOS(),
    isMobile: isMobile,
    isDesktop: isDesktop,
    isTablet: isTablet,
    isAgent: is,
    getDeviceId: getIdentifier,
    getAgentIdentification: getAgentIdentification,
    updateAgentIdentification: updateAgentIdentification,
    incrementAgentCounter: incrementAgentCounter,
    getUserIdentification: getUserIdentification,
    updateUserIdentification: updateUserIdentification,
    incrementUserCounter: incrementUserCounter,
    getAgents: getAgents,
    getUsers: getUsers(),
  }
}
export const isMobile = () => parser.isPlatform('mobile')
export const isDesktop = () => parser.isPlatform('desktop')
export const isTablet = () => parser.isPlatform('tablet')
export const is = (string, withAliases = false) =>
  parser.is(string, withAliases)

const bindSessionListener = () => {
  window.addEventListener('session-initialised', function (event) {
    if (event.detail) {
      const now = Date.now()
      const sessionCreatedAt = parseInt(event.detail.createdAt)
      if (now - sessionCreatedAt < 1000) {
        incrementAgentCounter('sessions')
      }
    }
  })
}
const bindLoginListener = () => {
  window.addEventListener('user-authenticated', function (event) {
    if (event.detail) {
      const user = parseInt(event.detail.user)
      if (user) setCurrentUser(user.id)
    }
  })
}
