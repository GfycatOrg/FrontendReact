// export const dragStart = () => {
//   return {
//     type: 'DRAG_START',
//     fileUploadActive: true
//   };
// };

export const dropAreaActive = (active) => {
  return  {
    type: 'DROP_AREA_ACTIVE',
    dropAreaActive: active
  }
}

export const filesDrop = (files) => {
  return {
    type: 'FILES_DROP',
    files
  };
};

const actions = {
  dropAreaActive,
  filesDrop
}

export default actions
