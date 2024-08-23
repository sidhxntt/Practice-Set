const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL

const validatePassword = (value) => {
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;
  
    if (!hasMinLength) {
      return "* Password must be at least 8 characters long";
    }
    if (!hasNumber) {
      return "* Password must include at least one number";
    }
    if (!hasSpecialChar) {
      return "* Password must include at least one special character";
    }
  
    // Strength evaluation
    if (hasMinLength && hasNumber && hasSpecialChar) {
      return true; // Strong password
    } else if (hasMinLength && (hasNumber || hasSpecialChar)) {
      return "* Password strength: Medium";
    } else {
      return "* Password strength: Weak";
    }
  }

  const onSignup = async (data, setSuccess, setError) => {
    try {
      const response = await fetch(`${URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      } else {
        setSuccess("Account created successfully");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };


export {validatePassword,onSignup}