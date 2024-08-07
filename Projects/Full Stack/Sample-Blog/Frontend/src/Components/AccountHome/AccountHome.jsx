import useFetch from "@/utils/hooks/useFetch(auth)";
import { useNavigate } from "react-router-dom";
import { Button } from "@cred/neopop-web/lib/components";

const AccountHome = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`http://localhost:3000/users`, []);
  if (error) return <div>Error: {error}</div>;
  if (loading) return;
  <div className="flex h-full justify-center">
    <span className="loading loading-bars loading-lg"></span>
  </div>;

  return (
    <>
      {data && (
        <div className="diff aspect-[16/9]">
          <div className="diff-item-1">
            <div className=" bg-primary text-primary-content text-6xl font-black grid place-content-center">{`Wassup ${data[0].username}?`}</div>
          </div>
          <div className="diff-item-2">
            <div className=" bg-base-200 text-6xl font-black grid place-content-center">
             Lets Start Writing
            </div>
          </div>
          <div className="diff-resizer"></div>
        </div>
      )}

      <section class="px-4 py-32 mx-auto max-w-7xl">
        <div class="w-full mx-auto text-left md:w-11/12 xl:w-8/12 md:text-center">
          <h1 class="mb-3 text-4xl font-bold text-gray-900 md:text-5xl md:leading-tight md:font-extrabold">
            A secure, faster way to transfer.
          </h1>
          <p class="mb-6 text-lg text-gray-500 md:text-xl md:leading-normal">
            We’re on a mission to bring transparency to finance. We charge as
            little as possible, and we always show you upfront. No hidden fees.
            No bad exchange rates. No surprises.
          </p>
          <div className="mb-9">
                 <Button
          variant="secondary"
          kind="elevated"
          size="big"
          colorMode="dark"
          showArrow
          onClick={() => {
           navigate('/account/premium')
          }}
        >
          Go Premium
        </Button>
          </div>
       
          <div class="flex flex-col justify-start mb-3 space-x-0 space-y-2 text-xs text-gray-600 md:flex-row md:justify-center md:space-x-8 md:space-y-0">
            <div class="flex items-center">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4 mr-1 text-green-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              No credit card required
            </div>
            <div class="flex items-center">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4 mr-1 text-green-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              14 days free
            </div>
            <div class="flex items-center">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4 mr-1 text-green-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountHome;
