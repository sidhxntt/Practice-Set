import React, { useState } from "react";

const List_items = () => {
  const [list, setList] = useState([
    {
      id: 1,
      user: "Sid",
      age: 22,
      address: "Delhi",
    },
    {
      id: 2,
      user: "Pri",
      age: 21,
      address: "Bangalore",
    },
    {
      id: 3,
      user: "Shashank",
      age: 22,
      address: "Pune",
    },
  ]);

  // Function to handle the click event to update the list
  const handleClick = () => {
    const newList = [
      {
        id: 1,
        user: "Siddhant",
        age: 22,
        address: "New-Delhi",
      },
      {
        id: 2,
        user: "Munchkin",
        age: 21,
        address: "Bangalore",
      },
    ];
    setList(newList);
  };

  // Function to handle the click event to revert back to the original list
  const handleRevert = () => {
    const originalList = [
      {
        id: 1,
        user: "Sid",
        age: 22,
        address: "Delhi",
      },
      {
        id: 2,
        user: "Pri",
        age: 21,
        address: "Bangalore",
      },
      {
        id: 3,
        user: "Shashank",
        age: 22,
        address: "Pune",
      },
    ];
    setList(originalList);
  };

  // Mapping over the list array and returning JSX elements
  const renderedList = list.map((item) => {
    return (
      <div className="list" key={item.id}>
        <p>User Name: {item.user}</p>
        <p>Age: {item.age}</p>
        <p>Address: {item.address}</p>
      </div>
    );
  });

  // Return the JSX with the mapped list items and buttons
  return (
    <>
      {renderedList}
      <button onClick={handleClick}>Update List</button>
      <button onClick={handleRevert}>Revert Back</button>
    </>
  );
};

export default List_items;
