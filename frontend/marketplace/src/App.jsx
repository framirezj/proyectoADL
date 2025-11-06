import "./App.css";
import AppRouter from "../routes/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" gutter={8} />
      <AppRouter />
    </>
  );
}

export default App;
