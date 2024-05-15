'use client'
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()
  return (
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <button onClick={()=>{router.back()}}>click me</button>
    </ul>
  )
}

export default page