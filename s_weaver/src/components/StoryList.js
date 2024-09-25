import React from 'react';
import { useSelector } from 'react-redux';

const StoryList = () => {
  // Assuming the stories are stored in Redux
  const stories = useSelector((state) => state.stories); // Adjust the state path if necessary

  // Check if stories is defined and is an array
  if (!Array.isArray(stories)) {
    return <div>No stories available.</div>; // Handle case where stories is not defined
  }

  return (
    <div>
      <h2>Story List</h2>
      {stories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        <ul>
          {stories.map((story) => (
            <li key={story._id}>
              <h3>{story.title}</h3>
              <p>{story.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoryList;
