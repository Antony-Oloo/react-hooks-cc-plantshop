import React from "react";

function PlantCard({ plant, onToggleStock }) {
  const { id, name, image, price, inStock } = plant;

  const handleToggleStock = () => {
    // Call the onToggleStock function to toggle stock status
    onToggleStock(id, !inStock);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image || "https://via.placeholder.com/400"} alt={name || "Plant"} />
      <h4>{name || "Plant Name"}</h4>
      <p>Price: ${price?.toFixed(2) || "0.00"}</p>
      <button className={inStock ? "primary" : ""} onClick={handleToggleStock}>
        {inStock ? "In Stock" : "Sold Out"}
      </button>
    </li>
  );
}

export default PlantCard;