import Cookies from "js-cookie";

const google_token = Cookies.get('google_jwt');
const token = Cookies.get('jwt');

const onPublish = async (id, navigate, setPublishStatus) => {
    try {
        const response = await fetch(`http://localhost:3000/publish-blogs/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token || google_token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        } else {
            console.log(data);
            navigate("/blogs/10");
            // Save publish status in localStorage
            localStorage.setItem(`publishStatus-${id}`, 'true');
            setPublishStatus(true);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

export { onPublish };
