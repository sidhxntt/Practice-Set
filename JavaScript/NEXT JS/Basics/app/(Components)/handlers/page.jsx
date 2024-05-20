"use client"
import { data } from "@/app/(Backend)/_data/data";
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  const handleclick = async () => {
    let a = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    let res = await a.json();
    console.log(res);
  };
  
  const handleclick2 =()=>{
    router.push('/api/get')
  }
  return (
    <>
      <h1>Router Handlers</h1>
      <button onClick={handleclick}>Post</button>
      <button onClick={handleclick2}>API endpoint</button>
    </>
  );
};

export default page;
