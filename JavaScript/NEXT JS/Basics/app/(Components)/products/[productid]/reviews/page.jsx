import Link from "next/link";

const Page = ({ params }) => {
  return (
    <>
      <ul>
        <li>
          <Link href={`/products/${params.productid}/reviews/1`}>
            Review-1 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/2`}>
            Review-2 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/3`}>
            Review-3 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/4`}>
            Review-4 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/5`}>
            Review-5 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/6`}>
            Review-6 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/7`}>
            Review-7 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/8`}>
            Review-8 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/9`}>
            Review-9 of Product: {params.productid}
          </Link>
        </li>
        <li>
          <Link href={`/products/${params.productid}/reviews/10`}>
            Review-10 of Product: {params.productid}
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Page;
