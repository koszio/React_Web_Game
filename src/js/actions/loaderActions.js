/**
 * Actions required for the functionality of Spinner styledComponent
 */

export const HIDE_LOADER = "HIDE_LOADER";

export const hideLoader = () => ({
  type: HIDE_LOADER
})


export const SHOW_LOADER = "SHOW_LOADER";

export const showLoader = () => ({
  type: SHOW_LOADER
})

export const SHOW_LOADER_FRONT = "SHOW_LOADER_FRONT";

export const showLoader_front = function() {
  return{
    type : SHOW_LOADER_FRONT
  }
}

export const HIDE_LOADER_FRONT = "HIDE_LOADER_FRONT";

export const hideLoader_front = function() {
  return{
    type : HIDE_LOADER_FRONT
  }
}

export const setLoader = function(isLoading){
  return {
    type: isLoading ? SHOW_LOADER : HIDE_LOADER
  }
}

export const setLoader_front = function(isLoading){
  return {
    type: isLoading ? SHOW_LOADER_FRONT : HIDE_LOADER_FRONT
  }
}
