'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


const logout = async () => {
    
    try {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    } catch {
        console.error("Error logging out");
    }
    
}

export default function Logout() {

  //const [logged, setLogged] = useState(false);

  
  const router = useRouter();

  /*useEffect(() => {
    const isLogged = localStorage.getItem('access') ? true : false;
    setLogged(isLogged);
    console.log("Logged", isLogged)
  }, []);*/

  /*const loggedOut = () => {
    const router = useRouter();
    router.push('/');
  }*/

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <div>
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Logout</button>
    </div>
  );
}
