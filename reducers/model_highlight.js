export const reducer = (state, action) => {
  return state.map((material, i) => {
    if (material.id === action.id) {
      console.log("matched with " + i);
      return { ...material, highlight: !material.highlight };
    }
    return material;
  });
};
