import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Leaderboards from "./components/Leaderboards";

export default function RouteSwitcher() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = '/' element = { <App />} />
            <Route path = '/leaderboards' element = { <Leaderboards />} />
        </Routes>
    </BrowserRouter>
  )
}
