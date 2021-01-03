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

export const bootDevice = (opts = {}) => {
  const UA = window.navigator.userAgent
  parser = Bowser.getParser(UA)
  setCurrentAgent(UA)
  if (opts.hasOwnProperty('listeners') && opts.listeners instanceof Array) {
    if (opts.listeners.includes('agents')) trackAgents()
    if (opts.listeners.includes('users')) trackUsers()
  }
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

const trackAgents = () =>
  window.addEventListener(Events.SessionCreated, () =>
    incrementAgentCounter('sessions'),
  )

const trackUsers = () => {
  window.addEventListener(Events.UserAuthenticated, function (event) {
    const user = getEventDetail(event, 'user')
    if (user) setCurrentUser(user.uuid ?? user.id)
  })
}
