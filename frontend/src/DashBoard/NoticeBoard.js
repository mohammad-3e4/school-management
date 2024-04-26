import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import {getListOfNotice} from '../redux/noticeSlice'

const ListItem = ({ notice }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const handleDownload = async (fileName) => {
    try {
        const response = await axios.get(`/api/v1/noticeboard/download/${fileName}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <li className="flex flex-col mb-2 ">
      <div className=" ml-4">
        <span className="text-gray-400 text-[12px]">{notice.date}</span><br/>
        <span className='text-indigo-500 text-[16px]'>{notice.title}</span> <span className="text-gray-400 text-[12px]">{notice.time}</span>
      </div>
      <div className="ml-4 ">
        <span className="text-black text-[16px]">{isReadMore ? notice?.content?.slice(0, 40) : notice.content}</span>
        {notice?.content?.length > 40 && (
          <button onClick={toggleReadMore} className="text-red-500 text-sm">
            {isReadMore ? '(Read more)' : '(Show less)'}
          </button>
        )}
      </div>
      {notice.file && (
        <div className="ml-4 mt-2">
          <button onClick={()=>{handleDownload(notice.file)}} className="text-blue-600 hover:underline">Download File</button>
        </div>
      )}
      <hr className='mt-1'/>
    </li>
  );
};

const NoticeBoard = ({refresh,setRefresh}) => {

  const {notices} = useSelector((state)=>state.notices)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getListOfNotice())

  }, []);


  return (
    <div>
      <ul className="list-none pl-0">
        {notices?.map((notice, index) => (
          <ListItem key={index} notice={notice} />
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
