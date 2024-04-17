import React, { useState } from 'react';
import axios from 'axios';
const URL="http://localhost:3001/api/v1"

const NoticeModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (file) {
      formData.append('file', file);
    }
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

  // Append date and time to formData
    formData.append('date', currentDate);
    formData.append('time', currentTime);
    try {
      console.log(formData)
        // Send a POST request to the backend
        const response = await axios.post(`${URL}/noticeboard/create`, formData);
    
        if (response.status === 200) {
          console.log('File uploaded successfully');
          // Reset form fields and close the modal
          setTitle('');
          setText('');
          setFile(null);
          onClose();
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Notice on Board</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="text" className="block text-gray-700">Content:</label>
                <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} rows="4" className="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-gray-700">Upload File:</label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeModal;
