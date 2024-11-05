import React from "react";
import "./PlayerPageSkeleton.css";

const PlayerPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="skeleton-box-1 default-shimmer"></div>
      <div className="skeleton-box-2 default-shimmer"></div>
      <div className="skeleton-box-3 default-shimmer"></div>
      <div className="skeleton-box-4 default-shimmer"></div>
      <div className="skeleton-box-5 default-shimmer"></div>
    </div>
  );
};

export default PlayerPageSkeleton;
