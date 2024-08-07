import Cookies from 'js-cookie';
const google_token = Cookies.get('google_jwt')
const token = Cookies.get('jwt');

const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

const onSubmit = async (data) => {
    await delay(3)
    try {

      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      formData.append('BlogPic', data.blog_pic[0]);

      const response = await fetch("http://localhost:3000/user-blogs", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token || google_token}`, 
        },
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      } else {
        const result = await response.json();
        console.log(result)
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      if (
        (file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg") &&
        file.size <= 10 * 1024 * 1024 // 10MB in bytes
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Clear preview if file is invalid
        setPreview(null);
        if (file.size > 10 * 1024 * 1024) {
          alert("File size must be less than 10MB.");
        } else {
          alert("Please upload a valid image file (PNG, JPG).");
        }
      }
    }
  };

  const redirect = async(isSubmitSuccessful, navigate)=>{
    if(isSubmitSuccessful){
      await delay(2);
      navigate('/account/your-blogs')
      }
  }

  export {onSubmit,handleFileChange,redirect}