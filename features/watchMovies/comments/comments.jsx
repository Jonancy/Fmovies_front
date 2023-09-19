import React, { useEffect, useState } from 'react';
import bill from '../../../assets/bill.jpg';
import { addUserComments, getUserComments } from '../../../services/Comments/userComments';
import { useSelector } from 'react-redux';
import { userHttp } from '../../../services/userService/mainUserService';
import {useParams,useNavigate} from 'react-router-dom'

export default function Comments() {
  const id = useSelector((state) => state.user.userId);
  const [comment, setComment] = useState('');
  const [userComment, setUserComment] = useState([]);

  //!Have to get the id from the params cuz its an object
  const movie_id = useParams()
  const movieId = movie_id.id
  console.log(movie_id.id)

  console.log(comment)

  const navigate = useNavigate()

  // const onChange=(e)=>{
  //   setComment({...comments,[e.target.name]:e.target.value})
  // }

  const postUserComments = async (e) => {
    e.preventDefault();
    try {
      // const res = await addUserComments({ user_id: id,movie_id:movieId,comments:comments });
      const res = await userHttp.post(`/addComment/${id}/${movie_id.id}`,{comment:comment});
      console.log(res.data);

      //!So at first req is send so that when user post the comment this api also invokes and sends the comments to update the state without reloading the page
      const response = await getUserComments({ id: id,movie_id: movieId});
      setUserComment(response.data.data.usersAllComnments);
      
      // Clear the input field
    } catch (e) {
        console.log(e);
    }
};


//!Again the api is called cuz when the page reloads or mounts the state remains the same or the comments are shown 
const fetchUserComments = async () => {
    try {
        const response = await getUserComments({id, movie_id:movieId });
        setUserComment(response.data.data.usersAllComnments);
        console.log(response.data.data)
        console.log(userComment)
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
            onChange={(e)=>setComment(e.target.value)}
          />
        {id?
          (<button onClick={(e) => postUserComments(e)}>Post</button>):
          (<button onClick={() =>navigate('/login') }>Post</button>)
          }
        </div>
        <div className='flex'>
          <img className='w-1/6' src={bill}></img>
          {userComment.map((comment, index) => (
            <div className='flex flex-col text-white' key={index}>
              {/* <img src={`http://localhost:5000/uploads/${comment.userProfile}`}></img> */}
              <p>{comment.name}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
