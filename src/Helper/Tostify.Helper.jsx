import { toast } from 'react-toastify';

function showSuccess(message, conifgration = { autoClose: 3000 }) {
  toast.success(message, conifgration);
}

function showError(message, conifgration = { autoClose: 3000 }) {
  toast.error(message, conifgration);
}

function showWarn(message, conifgration = { autoClose: 3000 }) {
  toast.warn(message, conifgration);
}

function showinfo(message, conifgration = { autoClose: 3000 }) {
  toast.info(message, conifgration);
}

export {
 showSuccess, showError, showWarn, showinfo
};
