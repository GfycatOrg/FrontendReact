// export const dragStart = () => {
//   return {
//     type: 'DRAG_START',
//     fileUploadActive: true
//   };
// };

export const dropAreaActive = active => ({
  type: 'DROP_AREA_ACTIVE',
  dropAreaActive: active
});

export const newFilesChosen = files => ({
  type: 'NEW_FILES_CHOSEN',
  files
});

const actions = {
  dropAreaActive,
  newFilesChosen
};

export default actions;
