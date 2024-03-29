import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddForm from "../pages/AddForm";
import EditForm from "../pages/EditForm";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"*"} element={<Home />}></Route>
        <Route path={""} element={<Home />}></Route>
        <Route path={"/add/"} element={<AddForm />}></Route>
        <Route path="/edit/:id" element={<EditForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
