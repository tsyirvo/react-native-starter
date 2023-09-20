import Toast, { ToastShowParams } from 'react-native-toast-message';

type ToasterType = {
  type?: 'success' | 'error' | 'info';
} & ToastShowParams;

class ToasterClass {
  show(showParams: ToasterType) {
    Toast.show({
      type: 'error',
      visibilityTime: 5000,
      topOffset: 50,
      ...showParams,
    });
  }

  hide() {
    Toast.hide();
  }
}

export const Toaster = new ToasterClass();
