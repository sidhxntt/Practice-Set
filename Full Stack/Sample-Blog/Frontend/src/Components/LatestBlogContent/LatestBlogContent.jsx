import useFetch from "@utils/hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@cred/neopop-web/lib/components";

const LatestBlogContent = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { data, loading } = useFetch(`http://localhost:3000/latest-blogs/${id}`, [id]);
  const { title, body, image} = data;

  if (loading) {
    return (
      <div className="flex justify-center h-svh">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  }
  return (
    <>
    <article itemid="#" itemscope itemtype="http://schema.org/BlogPosting">
      <div class="grid items-center grid-cols-1 md:grid-cols-2">
        <div class="order-2 h-64 md:order-1 md:h-full">
          <img
            src={image}
            class="object-cover w-full h-full bg-center"
            alt="img"
          />
        </div>
        <div class="order-1 w-full px-4 py-12 mx-auto text-left md:w-3/4 md:py-48 md:order-2 md:px-0">
          <p class="mb-3 text-gray-500">
            <time
              itemprop="datePublished dateModified"
              datetime="2010-08-07 11:11:03-0400"
              pubdate
            >
              Jan 02 2021
            </time>
          </p>
          <h1
            class="mb-5 text-3xl font-bold text-gray-900 md:leading-tight md:text-4xl"
            itemprop="headline"
          >
           {title}
          </h1>
          <a class="flex items-center text-gray-700" href="#">
            <div class="ml-2">
              <p class="text-sm font-semibold text-gray-800">Praveen Juge</p>
              <p class="text-sm text-gray-500">Swell Guy</p>
            </div>
          </a>
        </div>
      </div>

      <div class=" flex justify-center px-40 py-20 mx-auto prose">
        <p>
        {body}
        </p>
      </div>
    </article>
     <div className="flex justify-center">
     <Button
       variant="secondary"
       kind="elevated"
       size="small"
       colorMode="dark"
       onClick={() => {
         navigate(-1);
       }}
     >
       Go Back
     </Button>
   </div>
   </>
  );
};

export default LatestBlogContent;
