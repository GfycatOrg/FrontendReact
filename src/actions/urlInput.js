export const newUrlPasted = (url) => {
  return {
    type: 'NEW_URL_PASTED',
    url
  };
};

export const stateUrlPending = (pending) => {
  return {
    type: 'STATE_URL_PENDING',
    pending
  };
};

const actions = {
  newUrlPasted,
  stateUrlPending
}

export default actions
