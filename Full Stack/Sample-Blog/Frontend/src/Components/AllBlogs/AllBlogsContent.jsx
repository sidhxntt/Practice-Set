import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@cred/neopop-web/lib/components";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState, useEffect } from "react";
import { useAuth } from "@/Global/Auth/AuthContext";
import { handleDislikeClick , handleLikeClick, fetchLikeStatus } from "@/utils/AllBlogsContent";
import useFetch from "@/utils/hooks/useFetch";

const AllBlogsContent = () => {
  const [likeStatus, setLikeStatus] = useState(null); // null: not clicked, true: liked, false: disliked
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data, loading } = useFetch(`http://localhost:3000/all-blogs/${id}`, [id]);
  const { title, body, image, date, author } = data;


  useEffect(() => {
    fetchLikeStatus(isAuthenticated, id, setLikeStatus)
  }, [id, isAuthenticated]);


  if (loading) {
    return (
      <div className="flex h-screen justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <article itemID="#" itemScope itemType="http://schema.org/BlogPosting">
      <div className="grid items-center grid-cols-1 md:grid-cols-2">
        <div className="order-2 h-64 md:order-1 md:h-full">
          <img
            src={`../../../images/all-blogs/${image}`}
            className="object-cover w-full h-full bg-center"
            alt="img"
          />
        </div>
        <div className="order-1 w-full px-4 py-12 mx-auto text-left md:w-3/4 md:py-48 md:order-2 md:px-0">
          <p className="mb-3 text-gray-500">
            <time itemProp="datePublished dateModified">{date}</time>
          </p>
          <h1
            className="mb-5 text-3xl font-bold text-gray-900 md:leading-tight md:text-4xl"
            itemProp="headline"
          >
            {title}
          </h1>
          <div>
            <p className="text-sm font-semibold text-gray-800">{author}</p>
          </div>
          {isAuthenticated && (
            <div className="flex gap-8 mt-4">
              <div className="cursor-pointer" onClick={()=>{handleLikeClick(setLikeStatus, likeStatus, id)}}>
                {likeStatus === true ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </div>
              <div className="cursor-pointer" onClick={()=>{handleDislikeClick(setLikeStatus, likeStatus, id)}}>
                {likeStatus === false ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center px-40 py-20 mx-auto prose">
        <p>{body}</p>
      </div>
      <div className="flex justify-center">
        <Button
          variant="secondary"
          kind="elevated"
          size="big"
          colorMode="dark"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </article>
  );
};

export default AllBlogsContent;
