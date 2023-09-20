import React, { useEffect, useState } from "react";
import bill from "../../../assets/bill.jpg";
import {
  addUserComments,
  getUserComments,
} from "../../../services/Comments/userComments";
import { useSelector } from "react-redux";
import { userHttp } from "../../../services/userService/mainUserService";
import { useParams, useNavigate } from "react-router-dom";
import {AiOutlineLike} from 'react-icons/ai'
import { AiOutlineDislike } from "react-icons/ai";

export default function Comments() {
  const id = useSelector((state) => state.user.userId);
  const [comment, setComment] = useState("");
  const [userComment, setUserComment] = useState([]);

  //!Have to get the id from the params cuz its an object
  const movie_id = useParams();
  const movieId = movie_id.id;
  console.log(movie_id.id);

  console.log(comment);

  const navigate = useNavigate();

  // const onChange=(e)=>{
  //   setComment({...comments,[e.target.name]:e.target.value})
  // }

  const postUserComments = async (e) => {
    e.preventDefault();
    try {
      // const res = await addUserComments({ user_id: id,movie_id:movieId,comments:comments });
      const res = await userHttp.post(`/addComment/${id}/${movie_id.id}`, {
        comment: comment,
      });
      console.log(res.data);

      //!So at first req is send so that when user post the comment this api also invokes and sends the comments to update the state without reloading the page
      const response = await getUserComments({ id: id, movie_id: movieId });
      setUserComment(response.data.data.usersAllComnments);

      // Clear the input field
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  //!Again the api is called cuz when the page reloads or mounts the state remains the same or the comments are shown
  const fetchUserComments = async () => {
    try {
      const response = await getUserComments({ id, movie_id: movieId });
      setUserComment(response.data.data.usersAllComnments);
      console.log(response.data.data);
      // console.log(userComment);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserComments();
  }, []);

  return (
    <>
      <div className="pl-4">
        <div className="">
          <p className="text-2xl font-bold">COMMENT</p>
        </div>
        <div className="border-b-2 border-b-white pt-6 pb-4 mb-6">
          <p className="font-bold">{userComment.length} Comments</p>
        </div>
        <div className="flex flex-col ">
          <div className="flex">
            <input
              className="text-black w-1/2 p-4 rounded-[20px] text-xl outline-none"
              placeholder="Write something"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {id ? (
              <button className="rounded-[20px] bg-cyan-700 p-6 ml-4" onClick={(e) => postUserComments(e)}>Post</button>
            ) : (
              <button className="rounded-[20px] bg-cyan-700 p-6 ml-4" onClick={() => navigate("/login")}>Post</button>
            )}
          </div>
          <div className="flex flex-col ">
            {userComment.map((comment, index) => (
              <div className="flex text-white pt-2 pb-2" key={index}>
                <img
                  className="w-[5rem] rounded-[20px]"
                  src={`http://localhost:5000/${comment.image}`}
                ></img>
                <div className="flex flex-col pl-2">
                  <p>{comment.name}</p>
                  <p>{comment.comment}</p>
                  <div className="flex justify-center items-center justify-between w-[9rem] font-bold text-neutral-500">
                    <AiOutlineLike />
                    <AiOutlineDislike />
                    <p >Reply</p>
                    <p >Share</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
