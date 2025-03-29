import { toast } from "react-toastify";

export const showError = (message, onClose, delay) => {
  const autoClosedelay = delay ? delay : 2000;
  toast.dismiss();
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: autoClosedelay,
    onOpen: onClose ? onClose : () => {},
  });
};

export const showSuccess = (message, onClose) => {
  toast.dismiss();
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    onOpen: onClose ? onClose : () => {},
  });
};

export const showInfo = (message, delay) => {
  const autoClosedelay = delay ? delay : 2000;
  toast.dismiss();
  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: autoClosedelay,
  });
};

export const showSuccessAndRedirect = (message, redirectCallback, delay = 2000) => {
    toast.dismiss();
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: delay,
      // Use onClose to trigger the redirect after the toast disappears
      onClose: () => {
        if (redirectCallback) {
          redirectCallback();
        }
      }
    });
  };
