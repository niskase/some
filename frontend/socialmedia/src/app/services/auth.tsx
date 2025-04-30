import api from '@/lib/api';

export default async function RefreshToken(token, onSuccess: () => void) {

    try {
  
      const response = await api.post('http://localhost:8000/api/token/refresh/', {
        'refresh': refresh?.split(" ")[1] // I was stupid and saved token with Bearer
      });
  
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
  
      localStorage.setItem('access', `Bearer ${accessToken}`);
      localStorage.setItem('refresh', `Bearer ${refreshToken}`);

      onSuccess();
  
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        alert(`Error ${error.status}`);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    }
  };