export const loadState = () => {
  try {
    const state = localStorage.getItem('reposDisplay');
    if (state) {
      return JSON.parse(state);
    }
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('reposDisplay', serialized);
  } catch (error) {
    // igonre errors
  }
};
