import { showToast } from "@cred/neopop-web/lib/components";

const delay = (d) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, d * 1000);
  });
};

const redirect = async (navigate, isSubmitSuccessful, errorMessage) => {
  if (isSubmitSuccessful && !errorMessage) {
    await delay(2);
    navigate("/login");
  }
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


 const onSubmit = async (data, setErrorMessage, setSuccessMessage) => {
  await delay(3);
  try {
    const response = await fetch("http://localhost:3000/sign-up", {
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
      setSuccessMessage("Account created successfully");
    }
  } catch (error) {
    console.error("Error:", error.message);
    setErrorMessage(error.message);
  }
};

const handleToastMessages = (
  errorMessage,
  setErrorMessage,
  isSubmitting,
  isValid,
  successMessage,
  setSuccessMessage
) => {
  if (errorMessage) {
    showToast(errorMessage, { type: "error", autoCloseTime: "2000" });
    setErrorMessage("");
  }
  if (isSubmitting && isValid) {
    showToast("Submitting...", { type: "warning", autoCloseTime: "3000" });
  }
  if (successMessage) {
    showToast(successMessage, { type: "success", autoCloseTime: "2000" });
    setSuccessMessage("");
  }
};

export { redirect, validatePassword, onSubmit, handleToastMessages };
