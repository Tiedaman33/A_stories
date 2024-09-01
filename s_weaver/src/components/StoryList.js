import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStory } from '../redux/storySlice'; // Import the deleteStory action

const StoryList = ({ onDelete }) => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);

  const handleDelete = (storyId) => {
    if (onDelete) {
      onDelete(storyId); // Call the onDelete prop function
    }
    dispatch(deleteStory(storyId)); // Dispatch the deleteStory action
  };

  if (!stories || stories.length === 0) {
    return (
      <div className="story-list p-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center">Story List</h2>
        <p>No stories available.</p>
      </div>
    );
  }

  return (
    <div className="story-list p-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center">Story List</h2>
      <ul className="space-y-4">
        {stories.map((story) => (
          <li
            key={story._id} // Ensure this matches the property in your story object
            className="p-4 border-b border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold">{story.title}</h3>
            <p className="text-gray-600">{story.description}</p>
            <button
              onClick={() => handleDelete(story._id)} // Pass the story ID to handleDelete
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
