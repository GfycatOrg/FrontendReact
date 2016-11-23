export const newUrlPasted = url => ({
  type: 'NEW_URL_PASTED',
  url
});

export const stateUrlPending = pending => ({
  type: 'STATE_URL_PENDING',
  pending
});

const actions = {
  newUrlPasted,
  stateUrlPending
};

export default actions;
