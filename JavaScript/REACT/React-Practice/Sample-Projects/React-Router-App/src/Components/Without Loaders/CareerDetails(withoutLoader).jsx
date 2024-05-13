import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CareerDetails = () => {
  const [careerDetails, setCareerDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getCareerDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4000/careers/${id}`);
        const data = await res.json();
        setCareerDetails(data);
      } catch (error) {
        console.error("Error fetching career details:", error);
      }
    };
    getCareerDetails();
  }, []);

  return (
    <div className="career-details">
      <h2>Career Details for {careerDetails.title}</h2>
      <p>Starting salary: {careerDetails.salary}</p>
      <p>Location: {careerDetails.location}</p>
      <div className="details">
        <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quos dolores voluptate consequatur natus iste laudantium aliquid enim hic! Doloremque quibusdam expedita maxime nobis temporibus veniam vel autem, animi alias magnam quo sunt neque odio, corporis nisi similique. Perspiciatis quibusdam vero officiis quisquam quo repudiandae placeat temporibus quae sapiente exercitationem!
        </p>
      </div>
    </div>
  );
};

export default CareerDetails;
