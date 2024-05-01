const Card2 = ({ title, name, desc, handleClick }) => {
  return (
    <div className="cards">
      <h2>{title}</h2>
      <img
        src="https://cdn.shopify.com/s/files/1/0306/6419/6141/articles/coding_languages.png?v=1619126283"
        alt=""
        width={333}
        style={{ border: "2px solid black" }}
      />
      <h3>{name}</h3>
      <p>{desc}</p>
      <button onClick={handleClick}>Counter</button>
    </div>
  );
};

export default Card2;
// on clicking the button handleclick func is getting executed ie passed as props from the parent component to the child component
// but handlecick func is declared in parent component ie App() and not in child component ie Card2() which uses its local state varirable

