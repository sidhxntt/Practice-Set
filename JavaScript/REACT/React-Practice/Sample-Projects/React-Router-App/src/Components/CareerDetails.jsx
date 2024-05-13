import { useLoaderData } from "react-router-dom";

const CareerDetails = () => {
    const careerDetails = useLoaderData()
  return (
    <div className="career-details">
      <h2>Career Details for {careerDetails.title}</h2>
      <p>Starting salary: {careerDetails.salary}</p>
      <p>Location: {careerDetails.location}</p>
      <div className="details">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quos
          dolores voluptate consequatur natus iste laudantium aliquid enim hic!
          Doloremque quibusdam expedita maxime nobis temporibus veniam vel
          autem, animi alias magnam quo sunt neque odio, corporis nisi
          similique. Perspiciatis quibusdam vero officiis quisquam quo
          repudiandae placeat temporibus quae sapiente exercitationem!
        </p>
      </div>
    </div>
  );
};

export default CareerDetails;

// data loader
export const careersDetailsLoader = async ({params}) => {
    const { id } = params
    try {
      const res = await fetch(`http://localhost:4000/careers/${id}`);
      return res.json();
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };
  
