import React from 'react';
import { useSelector } from 'react-redux';

const FeaturedStories = () => {
  const stories = useSelector((state) => state.stories); // Assuming you have a way to identify featured stories

  // Handle case where stories is not defined or empty
  if (!stories || stories.length === 0) {
    return (
      <div className="featured-stories p-5 bg-white rounded-xl shadow-md text-gray-800 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Featured Stories</h2>
        <p className="text-gray-600">No featured stories available.</p>
      </div>
    );
  }

  return (
    <div className="featured-stories p-5 bg-white rounded-xl shadow-md text-gray-800 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Featured Stories</h2>
      <ul className="space-y-4">
        {stories.slice(0, 3).map((story) => (
          <li key={story.id} className="p-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{story.title}</h3>
            <p className="text-gray-600">{story.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedStories;
