import { showToast } from "@cred/neopop-web/lib/components";

const onSubmit = async (data, setErrorMessage, setSuccessMessage) => {
    try {
      const response = await fetch("http://localhost:3000/forget-password", {
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
        setSuccessMessage("Password Rest Link sent successfully in your email");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
    }
  };

const handleToastMessages = (errorMessage,setErrorMessage,isSubmitting, isValid, successMessage,setSuccessMessage) => {
    if (errorMessage) {
      showToast(errorMessage, { type: "error", autoCloseTime: "2000" });
      setErrorMessage("");
    }
    if (isSubmitting && isValid) {
        showToast("Processing..", { type: "warning", autoCloseTime: "3000" });
      }
    if (successMessage) {
      showToast(successMessage, { type: "success", autoCloseTime: "50000" });
      setSuccessMessage("");
    }
  };
  
 
export {onSubmit, handleToastMessages}