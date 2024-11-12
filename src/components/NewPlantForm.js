import React from "react";
import { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    const newPlant = {
      name,
      image,
      price: parseFloat(price), // Ensure price is a number
    };

    // Send the new plant data to the backend
    fetch("https://my-json-server.typicode.com/Antony-Oloo/react-hooks-cc-plantshop/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        // Call the onAddPlant function passed down as a prop to add the new plant to the list
        onAddPlant(data);

        // Clear form fields after submission
        setName("");
        setImage("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Error adding new plant:", error);
      });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;