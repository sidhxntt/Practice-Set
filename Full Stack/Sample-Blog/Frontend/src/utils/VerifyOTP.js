const onSubmit = async (data, navigate, setServerError) => {
  try {
    const response = await fetch("http://localhost:3000/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Something went wrong!');
    } else {
      navigate("/reset-password");
    }
  } catch (error) {
    console.error("Submission error:", error); // Log the error for debugging
    setServerError(error.message);
  }
};

export { onSubmit };
