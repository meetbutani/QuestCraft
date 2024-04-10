// useSorting.js
import { useState } from "react";

export const useSorting = () => {
  const [order, setOrder] = useState("ASC");
  const [number, setNumber] = useState("ASC");

  const handleSorting = (col, sortOrder, data, setData) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      } else {
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      }
    });
    setData(sortedData);
    setOrder(sortOrder === "ASC" ? "DSC" : "ASC");
  };

  const handleNumberSorting = (col, sortOrder, data, setData) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[col] - b[col];
      } else {
        return b[col] - a[col];
      }
    });
    setData(sortedData);
    setNumber(sortOrder === "ASC" ? "DSC" : "ASC");
  };

  return { order, number, handleSorting, handleNumberSorting };
};
