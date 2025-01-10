import React from 'react'
import "../../styles/shimmer.css";

const Shimmerproducts = () => {
    const skeletonItems = Array.from({ length: 18 });

    return (
      <div className="products-component">
        {skeletonItems.map((_, index) => (
          <div className="product-item shimmer" key={index}>
            <div className="shimmer-image"></div>
            <div className="shimmer-details">
              <div className="shimmer-title"></div>
              <div className="shimmer-price"></div>
              <div className="shimmer-button"></div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Shimmerproducts
