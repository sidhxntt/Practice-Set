import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Careers() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch('http://localhost:4000/careers');
        const data = await res.json();
        setCareers(data);
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    };

    fetchCareers();
  }, []);

  return (
    <div className="careers">
      {careers.map(career => (
        <Link to='/' key={career.id}>
          <p>{career.title}</p>
          <p>Based in {career.location}</p>
        </Link>
      ))}
    </div>
  );
}

