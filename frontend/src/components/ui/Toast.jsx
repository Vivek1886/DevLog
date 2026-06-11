// This is a helper — actual toasts are fired via react-hot-toast
// Import and call these anywhere in your app

import toast from "react-hot-toast";

export const showToast = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    loading: (msg) => toast.loading(msg),
    dismiss: (id) => toast.dismiss(id),

    // Promise toast — shows loading → success/error automatically
    promise: (promise, { loading, success, error }) =>
        toast.promise(promise, { loading, success, error }),
};

export default showToast;