import { showToast } from "@cred/neopop-web/lib/components";

const delay = (d) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, d * 1000);
  });
};

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
  };
  
  const handleToastMessages = (
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage
  ) => {
    if (errorMessage) {
      showToast(errorMessage, { type: "error", autoCloseTime: "2000" });
      setErrorMessage("");
    }
    if (successMessage) {
      showToast(successMessage, { type: "success", autoCloseTime: "2000" });
      setSuccessMessage("");
    }
  };
const onSubmit = async (data, setErrorMessage, setSuccessMessage, navigate) => {
    try {
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      } else {
        setSuccessMessage("Password Resetted Sucessfully");
        await delay(1.5)
        navigate("/login")
        navigate(0)
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
    }
  };

  export { validatePassword, onSubmit, handleToastMessages };
