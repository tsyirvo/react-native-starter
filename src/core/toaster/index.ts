import Toast, { ToastShowParams } from 'react-native-toast-message';

class Toaster {
  show(showParams: ToastShowParams) {
    Toast.show({
      visibilityTime: 5000,
      topOffset: 50,
      ...showParams,
    });
  }

  hide() {
    Toast.hide();
  }
}

export default new Toaster();
