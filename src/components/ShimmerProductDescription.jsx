import React from "react";
import "../styles/shimmer.css";

const ShimmerProductDescription = () => {
  return (
    <div className="product-description shimmer">
      <div className="shimmer-image"></div>
      <div className="shimmer-details">
        <div className="description-shimmer-title"></div>
        <div className="shimmer-price"></div>
        <div className="shimmer-description"></div>
        <div className="shimmer-category"></div>
        <div className="shimmer-rating"></div>
      </div>
    </div>
  );
};

export default ShimmerProductDescription;
