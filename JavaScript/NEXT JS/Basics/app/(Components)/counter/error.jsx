'use client'

const error = ({error ,reset}) => {
  return (
    <>
      <h1>{error.message}</h1>
      <button onClick={reset}>Try Again</button>
    </>
  
  )
}

export default error 