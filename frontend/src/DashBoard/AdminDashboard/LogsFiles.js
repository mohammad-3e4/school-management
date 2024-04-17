import React, { useState } from 'react';

const Logs = [
  { action: "change1 xsdfgnfbvscfdghjgsfdghj", name: "John Doe", time: "1" },
  { action: "change2", name: "inderjeet1", time: "2" },
  { action: "change2", name: "inderjeet2", time: "3" },
  { action: "change3", name: "inderjeet3", time: "4" },
  { action: "change1 xsdfgnfbvscfdghjgsfdghj", name: "John Doe", time: "1" },
  { action: "change2", name: "inderjeet1", time: "2" },
  { action: "change2", name: "inderjeet2", time: "3" },
  { action: "change3", name: "inderjeet3", time: "4" },
  { action: "change1 xsdfgnfbvscfdghjgsfdghj", name: "John Doe", time: "1" },
  { action: "change2", name: "inderjeet1", time: "2" },
  { action: "change2", name: "inderjeet2", time: "3" },
  { action: "change3", name: "inderjeet3", time: "4" },
  { action: "change1 xsdfgnfbvscfdghjgsfdghj", name: "John Doe", time: "1" },
  { action: "change2", name: "inderjeet1", time: "2" },
  { action: "change2", name: "inderjeet2", time: "3" },
  { action: "change3", name: "inderjeet3", time: "4" }
];

const LogsItem = ({ log }) => {
    const [isReadMore, setIsReadMore] = useState(false);
  
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
  
    return (
      <li className="mb-4">
        <div className="flex items-center">
          {/* <div className="w-1 h-1 bg-black rounded-full mr-2"></div> */}
          <div>
            <span className="text-gray-700">{log.name} did {log.action} at {log.time}</span>
            {log.text && (
              <div className="ml-8 text-gray-600">
                {isReadMore ? log.text : log.text.slice(0, 50)}
                {log.text.length > 50 && (
                  <button onClick={toggleReadMore} className="text-blue-500 ml-2 focus:outline-none">
                    {isReadMore ? 'Read less' : 'Read more'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <hr className='mt-2'/>
      </li>
      
    );
  };
  
  const LogsFiles = ({ logs }) => {
    return (
      <div className="max-w-lg mx-auto pl-4">
        <ul className="list-disc pl-0 ">
          {Logs.map((log, index) => (
            <LogsItem key={index} log={log} />
          ))}
        </ul>
      </div>
    );
  };

export default LogsFiles;
