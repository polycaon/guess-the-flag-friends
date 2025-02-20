
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import "./App.css";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <Index />
    </BrowserRouter>
  );
}

export default App;
