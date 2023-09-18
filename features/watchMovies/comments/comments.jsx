import React, { useEffect, useState } from 'react';
import bill from '../../../assets/bill.jpg';
import { addUserComments, getUserComments } from '../../../services/Comments/userComments';
import { useSelector } from 'react-redux';
import { userHttp } from '../../../services/userService/mainUserService';

export default function Comments() {
  const userid = useSelector((state) => state.user.userId);
  const [comment, setComment] = useState('');
  const [userComment, setUserComment] = useState([]);

  const postUserComments = async (e) => {
    e.preventDefault();
    try {
      const res = await addUserComments({ id: userid, comment: comment });
      console.log(res.data);

      const response = await getUserComments({ id: userid });
      setUserComment(response.data.data.userComm);

      // Clear the input field
      setComment('');
    } catch (e) {
      console.log(e);
    }
  };

 
    const fetchUserComments = async () => {
      try {
        const response = await getUserComments({ id: userid });
        setUserComment(response.data.data.userComm);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(()=>{
        fetchUserComments()
    },[])

 

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex '>
          <img className='w-1/6' src={bill}></img>
          <input
            className='text-black'
            placeholder='Write something'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={(e) => postUserComments(e)}>Post</button>
        </div>
        <div className='flex'>
          <img className='w-1/6' src={bill}></img>
          {userComment.map((comment, index) => (
            <div className='flex flex-col text-white' key={index}>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
