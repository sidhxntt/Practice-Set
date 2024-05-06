import { useParams } from "react-router-dom"

const User = () => {
    const {id}= useParams()
  return (
    <div className='bg-orange-300 flex justify-center py-5 '>
        User:{id}</div>
  )
}

export default User