import React from 'react';
import { useSelector } from 'react-redux';

const StoryList = ({ onCardClick }) => { // Accepting onCardClick as a prop
  const stories = useSelector((state) => state.stories.storiesList); 

  if (!Array.isArray(stories) || stories.length === 0) {
    return <div>No stories available.</div>;
  }

  return (
    <div>
      <ul>
        {stories.map((story) => (
          <li 
            key={story._id} 
            onClick={() => onCardClick(story._id)} // Adding onClick event to trigger the navigation
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
          >
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
