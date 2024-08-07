import Cookies from 'js-cookie';
import axios from 'axios';

const onSubmit = async (data, login, setCredentialError, navigate) => {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        const result = await response.json();

        if (response.ok) {
            login();
            navigate('/');
            window.location.reload()
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error("Error:", error.message);
        setCredentialError(error.message);
    }
};

const handleGoogleLoginSuccess = async (response, login, navigate, setCredentialError) => {
    const token = response.credential;
    try {
      const res = await axios.post('http://localhost:3000/Oauth/google-login', { token }, {
        withCredentials: true 
      });
      login();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Google login failed:', error);
      setCredentialError('Google login failed. Please try again.');
    }
  };

const handleGoogleLoginError = (setCredentialError) => {
    console.log('Login Failed');
    setCredentialError('Google login failed. Please try again.');
};

export { onSubmit, handleGoogleLoginSuccess, handleGoogleLoginError };
