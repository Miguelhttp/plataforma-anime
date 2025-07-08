import { ToastContainer } from "react-toastify";
import { useThemeStore } from "../../store/themeStore";

export default function AppToastContainer() {
  const theme = useThemeStore((state) => state.theme);

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
      theme={theme}
    />
  );
}
