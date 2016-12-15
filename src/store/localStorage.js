/**
 *  Attempt to retrieve state object from browser's local storage
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const setState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    //Ignore write errors 
    //TODO: log errors
    console.error('Error setting state')
  }
}
