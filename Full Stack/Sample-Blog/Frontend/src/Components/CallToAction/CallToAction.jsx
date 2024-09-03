import { Button } from "@cred/neopop-web/lib/components";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css"

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <>
    <section className={`bg-gray-900 ${styles.pattern}`} >
    <div className="container flex flex-col items-center px-4 py-52 mx-auto text-center">
        <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
            Publish your own Blogs <span className="text-blue-500">Right Now.</span>
        </h2>

        <p className="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
            Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Cum quidem officiis reprehenderit, aperiam veritatis non, quod veniam fuga possimus hic
            explicabo laboriosam nam. A tempore totam ipsa nemo adipisci iusto!
        </p>

        <div className="flex justify-center mt-11">
          <Button
            variant="secondary"
            kind="elevated"
            size="big"
            colorMode="dark"
            onClick={() => {
              navigate("/account");
            }}
          >
            Get Started
          </Button>
        </div>
    </div>
</section>
</>
  
  );
};

export default CallToAction;
