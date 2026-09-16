import {Route, Routes} from "react-router"
import SignUpPage from './pages/SignUpPage'
import LoginPage from "./pages/LoginPage"
import ChatPage from './pages/ChatPage'
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import Authentication from "./auth/Authentication"
import { Toaster } from "react-hot-toast"
export default function App() {


  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
     <Toaster toastOptions={{ style: { minWidth: "fit-content" , maxWidth : "800px", fontSize: "16px", padding: "16px" }, }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <Routes>
        <Route path="/" element={<Authentication />}>
          <Route element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </div>
  )
}