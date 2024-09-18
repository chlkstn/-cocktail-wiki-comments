import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types because of typescript. We ensure that all properties  are of type string

export interface Cocktail {
  id: string;
  name: string;
  image: string;
}

// We use favuriteCocktail to store our favorites. The Void is a default value for type

interface FavouriteCocktailContextProps {
  favouriteCocktails: Cocktail[];
  addFavourite: (cocktail: Cocktail) => void;
  removeFavourite: (id: string) => void;
}

// Creating a context that will be used in our Favorite page
// Setting undefined for Typescript initialization defining a "no value"

const FavouriteCocktailContext = createContext<
  FavouriteCocktailContextProps | undefined
>(undefined);

// hook use context
export const useFavouriteCocktails = () => {
  const context = useContext(FavouriteCocktailContext);
  if (!context) {
    throw new Error(
      "useFavouriteCocktails must be used within a FavouriteCocktailProvider"
    );
  }
  return context;
};

// Using the cocktail.id to add the cocktail to our favorite array.
// We are avoiding dublicates by checking that there is no id with the same value
export const FavouriteCocktailProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favouriteCocktails, setFavouriteCocktails] = useState<Cocktail[]>([]);

  const addFavourite = (cocktail: Cocktail) => {
    setFavouriteCocktails((prev) => {
      if (!prev.find((fav) => fav.id === cocktail.id)) {
        console.log("Adding to favorites:", cocktail); // Log added drink
        return [...prev, cocktail]; //  adding the new cocktail to the list of favorites
      }
      console.log("Duplicate found, not adding:", cocktail); // Log duplicate attempt
      return prev; // Return unchanged if duplicate
    });
  };

  // Removing the item based on its ID from the array using the filter method

  const removeFavourite = (id: string) => {
    setFavouriteCocktails((prev) =>
      prev.filter((cocktail) => cocktail.id !== id)
    );
  };

  // / We can now Add and remove our favorites in other components as long as they are in the
  // Context provider
  return (
    <FavouriteCocktailContext.Provider
      value={{ favouriteCocktails, addFavourite, removeFavourite }}
    >
      {children}
    </FavouriteCocktailContext.Provider>
  );
};
