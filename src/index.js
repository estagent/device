import {getEventDetail} from '@revgaming/helpers'
import {Events} from '@revgaming/session'

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
import {getIdentifier, getIdentifications} from './identifications'

let parser

export {getIdentifier, getIdentifications}
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
    getIdentifications: getIdentifications,
    getAgentIdentification: getAgentIdentification,
    updateAgentIdentification: updateAgentIdentification,
    incrementAgentCounter: incrementAgentCounter,
    getUserIdentification: getUserIdentification,
    updateUserIdentification: updateUserIdentification,
    incrementUserCounter: incrementUserCounter,
    getAgents: getAgents,
    getUsers: getUsers,
  }
}
export const isMobile = () => parser.isPlatform('mobile')
export const isDesktop = () => parser.isPlatform('desktop')
export const isTablet = () => parser.isPlatform('tablet')
export const is = (string, withAliases = false) =>
  parser.is(string, withAliases)


const bindSessionListener = () =>
  window.addEventListener(Events.SessionCreated, () =>
    incrementAgentCounter('sessions'),
  )

const bindLoginListener = () => {
  window.addEventListener(Events.UserAuthenticated, function (event) {
    const user = getEventDetail('user')
    if (user) if (user) setCurrentUser(user.id)
  })
}
