import Toast from 'react-native-toast-message';
import type { ToastShowParams } from 'react-native-toast-message';

interface ToasterType extends ToastShowParams {
  type?: 'success' | 'error' | 'info';
}

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
