
const onLogin = async (data, setIsAuthenticated, setSuccess ,setError) => {
  try {
    const response = await fetch("http://localhost:4000/api/login", {
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
      setIsAuthenticated(true);
      setSuccess("Login successful");
    }
  } catch (error) {
    console.error("Error:", error.message);
    setError(error.message);
  }
};
export { onLogin}