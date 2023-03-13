/**
 * Navigation errors state-logging
 */

export const DID_REDIRECT = "DID_REDIRECT";

export const didRedirect = error => ({
  type: DID_REDIRECT,
  error
})


// All paths in the application
export const HOME = "/"
export const ABOUT = "/about"
export const HOST = "/host"
export const JOIN = "/join"
export const LOBBY = "/lobby"
export const GAME = "/game"
export const RESULTS = "/results"
export const HISGH_SCORES = "/high_scores"
export const LOGIN = "/login"
