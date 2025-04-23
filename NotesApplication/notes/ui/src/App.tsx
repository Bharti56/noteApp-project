import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NoteView from './app/noteview/main';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App