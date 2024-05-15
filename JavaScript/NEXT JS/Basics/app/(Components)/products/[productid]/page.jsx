'use client'
import { useRouter } from 'next/navigation'

export async function generateMetaData({params}){
  return (
   "title"
  )
}

const page = ({ params }) => {
    const router = useRouter()
  return (
    <div>
      <h1>Details about Product: {params.productid}</h1>
      <button onClick={() => router.push(`/products/${params.productid}/reviews`)}>Reviews of Product:{params.productid}</button>
    </div>
  );
};

export default page;
