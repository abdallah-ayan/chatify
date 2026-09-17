import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function ChatPage() {
  const {logout , isLogouting} = useAuthStore();
  const navigate = useNavigate();
  async function handleLogout() {
    console.log(1)
    const state = await logout();
    if(state) {
      navigate("/login");
    }
  }
  return (
    
    <div className='z-10'>
      <button
            className="btn"
            onClick={handleLogout}
            disabled={isLogouting}
        >
            {isLogouting ? "Loading..." : "Logout"}
        </button>
    </div>
  )
}
