import Cookies from "js-cookie";
const google_token = Cookies.get('google_jwt')
const token = Cookies.get('jwt')


const handleLikeClick = async (setLikeStatus, likeStatus, id) => {
    const newStatus = likeStatus === true ? null : true;
    setLikeStatus(newStatus);

    try {
      const response = await fetch(`http://localhost:3000/all-blogs/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || google_token}`, 
        },
        body: JSON.stringify({ action: 'like' }),
      });

      if (!response.ok) {
        throw new Error('Error updating like status');
      }

      const result = await response.json();
      setLikeStatus(result.status); // Update status based on response if needed

    } catch (error) {
      console.error('Error updating like status', error);
      // Revert state if there's an error
      setLikeStatus(likeStatus);
    }
  };
 
const handleDislikeClick = async (setLikeStatus, likeStatus, id) => {
    const newStatus = likeStatus === false ? null : false;
    setLikeStatus(newStatus);

    try {
      const response = await fetch(`http://localhost:3000/all-blogs/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || google_token}`,
        },
        body: JSON.stringify({ action: 'dislike' }),
      });

      if (!response.ok) {
        throw new Error('Error updating dislike status');
      }

      const result = await response.json();
      setLikeStatus(result.status); // Update status based on response if needed

    } catch (error) {
      console.error('Error updating dislike status', error);
      // Revert state if there's an error
      setLikeStatus(likeStatus);
    }
  };  

const fetchLikeStatus = async (isAuthenticated, id, setLikeStatus) => {
    if (isAuthenticated) {
      try {
        const response = await fetch(`http://localhost:3000/all-blogs/${id}/status`, {
          headers: {
            'Authorization': `Bearer ${token || google_token}`,
          },
        });
        const result = await response.json();
        setLikeStatus(result.status); // Assuming the API returns { status: true/false/null }
      } catch (error) {
        console.error('Error fetching like status', error);
      }
    }
  };  

export {handleLikeClick, handleDislikeClick, fetchLikeStatus}  