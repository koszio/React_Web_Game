import { createSelector } from 'reselect'

/**
 * All getters that should be used when reading the router or redirect state in
 * the redux store.
 *
 * Selectors created by `createSelector` will keep their calculated value in
 * memory and will only update the return value whenever the specific part of
 * the state it depends on has been modified. ==> less recalculation and
 * rerendering. :)
 */

// Functions extracting the raw data from the router state
const pathname = state => state.router.location.pathname
//const search = state => state.router.location.search
//const hash = state => state.router.location.hash

// Functions extracting the raw data from the redirect state
const didRedirect = state => state.redirect.didRedirect
const message = state => state.redirect.message

// Get the current URL path
export const getURL = createSelector(
  [pathname],
  url => url
)

// Get the latest redirect message. "" if lates navigation attempt succeded.
export const getRedirectMessage = createSelector(
  [message],
  msg => msg
)

// Check if the latest navigation attempt succeded or not.
// True if navigation failed, false if navigation succeded.
export const navError = createSelector(
  [didRedirect],
  r => r
)
