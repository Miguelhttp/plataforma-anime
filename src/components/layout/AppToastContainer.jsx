import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName={() =>
        "bg-slate-800 text-white text-sm px-4 py-3 rounded-md shadow-md max-w-xs w-full mx-auto"
      }
      bodyClassName="flex items-center"
    />
  );
}
