import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://purple-scissors.onrender.com/review/allreviews");
        const data = await response.json(); // Extract JSON from the response
        setReviews(data); // Assuming the response is the array of reviews
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return <Loader/>;
  }

  if (error) {
    return <div className="text-center mt-12 text-lg font-bold text-red-600">{error}</div>;
  }

  return (
    <section className="p-6 lg:p-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-[#204E4A] text-center mb-8">Customer Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="ml-4">
                {/* Fixed width and alignment for consistent name size */}
                <h3
                  className="text-lg font-bold text-gray-800 truncate"
                  style={{ width: "150px" }}
                  title={review.Name}
                >
                  {review.Name}
                </h3>
                <p className="text-sm text-gray-500">{review.Email}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{review.Review}</p>
            <div className="flex items-center justify-between">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      i < review.Rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
