"use client";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const router = useRouter();
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        nesciunt placeat ab at asperiores, molestias quo, adipisci officia ea
        quia ut vitae qui vero exercitationem illum nulla omnis iusto! In libero
        temporibus inventore, itaque tempora quibusdam facere necessitatibus at
        adipisci velit eum eaque, commodi magni reiciendis maiores est repellat
        architecto ut ex suscipit iure, ipsum deserunt possimus. Aliquid placeat
        quam, voluptates error officia et libero dicta odit dolorem harum odio
        reprehenderit, magni labore. Nihil debitis aliquam porro accusantium
        voluptatum necessitatibus illum velit explicabo quo similique. Nobis
        magni minima velit quis corporis debitis vitae impedit assumenda dolorum
        labore, culpa facilis, commodi quibusdam officia aliquid quo, quas est
        perspiciatis natus. Beatae atque deleniti perspiciatis, ad eos error
        dicta nemo maiores voluptatem sequi impedit ipsa eum a ea numquam
        dignissimos similique repellat. Libero corporis, cumque, id cupiditate
        sequi eveniet aliquam, aliquid repudiandae mollitia sed quo. Voluptate
        aperiam doloremque reiciendis aliquid sit incidunt officia delectus
        soluta quod, optio asperiores possimus nobis quisquam ab est, libero
        voluptatum illo amet laborum odio neque laudantium necessitatibus.
        Deserunt alias placeat nesciunt vel ea sapiente, rerum magni nostrum
        commodi ab est illum eius nobis adipisci temporibus consequuntur
        excepturi rem eum. Voluptates maiores adipisci incidunt asperiores
        obcaecati praesentium ipsa tempore?
      </p>
      <button onClick={() => router.push(`/`)}>
        Home
      </button>
    </div>
  );
};

export default page;
