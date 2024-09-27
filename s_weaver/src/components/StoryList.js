import React from 'react';
import { useSelector } from 'react-redux';

const StoryList = () => {
  const stories = useSelector((state) => state.stories.storiesList); // Ensure you're accessing the right path

  if (!Array.isArray(stories) || stories.length === 0) {
    return <div>No stories available.</div>;
  }

  return (
    <div>
      <ul>
        {stories.map((story) => (
          <li key={story._id}>
            <h3>{story.title}</h3>
            <p>Genre: {story.genre}</p>
            <p>Published on: {new Date(story.datePublished).toLocaleDateString()}</p>
            <p>File Path: {story.filePath}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
