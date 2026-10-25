export const checkForUpdateAsync = jest.fn();
export const fetchUpdateAsync = jest.fn();
export const reloadAsync = jest.fn();
export const UpdateCheckResultNotAvailableReason = {
  NO_UPDATE_AVAILABLE_ON_SERVER: 'noUpdateAvailableOnServer',
};
export const useUpdates = () => ({
  currentlyRunning: {
    isEmbeddedLaunch: false,
  },
});
