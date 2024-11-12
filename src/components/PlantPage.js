import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]); // Holds all plants
  const [filteredPlants, setFilteredPlants] = useState([]); // Holds filtered list for search

  // Fetch plants from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then((response) => response.json())
      .then((data) => {
        // Add an inStock field to each plant
        const plantsWithStock = data.map((plant) => ({
          ...plant,
          inStock: true, // Default to 'inStock' being true
        }));
        setPlants(plantsWithStock);
        setFilteredPlants(plantsWithStock); // Initially, no search, so display all plants
      })
      .catch((error) => console.error('Error fetching plants:', error));
  }, []);

  // Function to add a new plant to the list
  const addPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
    setFilteredPlants((prevPlants) => [...prevPlants, newPlant]); // Add to filtered list as well
  };

  // Function to handle search and filter plants
  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredPlants(plants); // If search query is empty, show all plants
    } else {
      const filtered = plants.filter((plant) =>
        plant.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlants(filtered);
    }
  };

  // Function to toggle the "inStock" status of a plant
  const toggleStock = (id, newInStockStatus) => {
    // Update the plant status locally
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, inStock: newInStockStatus } : plant
    );
    setPlants(updatedPlants);
    setFilteredPlants(updatedPlants);

    // Send a PATCH request to update the status on the backend
    fetch(`http://my-json-server.typicode.com/Antony-Oloo/react-hooks-cc-plantshop/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: newInStockStatus }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        console.log("Plant stock updated:", updatedPlant);
      })
      .catch((error) => {
        console.error("Error updating plant stock:", error);
      });
  };

  return (
    <main>
      {/* Pass addPlant to NewPlantForm */}
      <NewPlantForm onAddPlant={addPlant} />

      {/* Pass handleSearch to Search */}
      <Search onSearch={handleSearch} />

      {/* Pass filteredPlants and toggleStock to PlantList */}
      <PlantList plants={filteredPlants} onToggleStock={toggleStock} />
    </main>
  );
}

export default PlantPage;