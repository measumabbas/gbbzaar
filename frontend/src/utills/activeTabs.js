export const getActiveTab = (location, tabs) => {
  const isTabActive = tabs.some(tab => {
    if (typeof tab === 'string') {
      return tab === location;
    } else if (tab instanceof RegExp) {
      return tab.test(location);
    } else {
      return false;
    }
  });

  return isTabActive;
};