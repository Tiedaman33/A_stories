import React from 'react';
import { useSelector } from 'react-redux';

const FeaturedStories = () => {
  const stories = useSelector((state) => state.stories.storiesList); // Ensure path is correct

  // Handle case where stories is not defined or not an array
  if (!Array.isArray(stories) || stories.length === 0) {
    return <div>No stories available.</div>;
  }

  const featuredStories = stories.slice(0, 5); // Feature the first 5 stories

  return (
    <div className="featured-stories p-5 bg-white rounded-xl shadow-md text-black-800 mb-8">
      <div className="flex flex-wrap gap-4">
        {featuredStories.map((story) => (
          <div key={story.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-100">
              <h3 className="text-lg font-semibold">{story.title}</h3>
              <p className="text-gray-600">{story.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FeaturedStories;
