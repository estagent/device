import Bowser from 'bowser'

let parser

export const bootDevice = (opts = {}) => {
  const UA = window.navigator.userAgent
  parser = Bowser.getParser(UA)
  return {
    agentParser: agentParser,
    agentResult: agentResult,
    userAgent: userAgent,
    agentIs: agentIs,
  }
}
export const agentParser = () => parser
export const agentResult = () => parser.getResult()
export const userAgent = () => parser.getUA()
export const agentIs = (string, withAliases = false) =>
  parser.is(string, withAliases)
