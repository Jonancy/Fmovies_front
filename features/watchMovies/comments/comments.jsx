import React, { useEffect, useState } from "react";
import bill from "../../../assets/bill.jpg";
import {
  addUserComments,
  deleteUserComment,
  getUserComments,
  updateUserComment,
} from "../../../services/Comments/userComments";
import { useSelector } from "react-redux";
import { userHttp } from "../../../services/userService/mainUserService";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Comments() {
  //!data-fns library to change the date like raw format to redable format

  //?This one is for extracting id from redux
  const id = useSelector((state) => state.user.userId);

  //?This is for adding first comment
  const [comment, setComment] = useState("");

  //?This is for setting the response of the comment for displaying it
  const [userComment, setUserComment] = useState([]);

  //?This one is for editing Comment Tab
  const [editComment, setEditComment] = useState(null);

  //?This one is for updating comments
  const [updatedComment, setUpdatedComment] = useState("");

  //!This is used for view more view less comments 
  const [showAllComments, setShowAllComments] = useState(false);

  //!Have to get the id from the params cuz its an object
  const movie_id = useParams();
  const movieId = movie_id.id;
  console.log(movie_id.id);

  console.log(comment);

  const navigate = useNavigate();

  const editOpen = (index) => {
    setEditComment(index);
    console.log("clicked");
  };

  const editClose = () => {
    setEditComment(null);
  };

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
      const response = await getUserComments({ movie_id: movieId });
      setUserComment(response.data.data.usersAllComnments);
      setComment(" ");

    } catch (e) {
      console.log(e);
    }
  };

  //!Again the api is called cuz when the page reloads or mounts the state remains the same or the comments are shown
  const fetchUserComments = async () => {
    try {
      const response = await getUserComments({ movie_id: movieId });
      setUserComment(response.data.data.usersAllComnments);
      console.log(response.data.data);
      // console.log(userComment);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUserCom = async (id, commentId) => {
    try {
      //!This is used to update the state of the website when user deletes the comments
      //!So the if the id is not equal to the state id then it will not display
      setUserComment((prevUserComment) =>
        prevUserComment.filter((comment) => comment.commentId !== commentId)
      );

      const res = await deleteUserComment({ userId: id, commentId: commentId });
      console.log(res.data.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  //!So for the user update comments at first  id and comm id and comm are send and updated and in response it gives
  //!Every comments of the collection as there the updated comments is updated and similarly every other comments appears also
  //! And is used to update the state of the previous comments so that the update will show when user updates it immediately
  const updateUserComments = async (movieId, commentId) => {
    try {
      const res = await updateUserComment(movieId, commentId, updatedComment);
      console.log(res.data);
      setUserComment(res.data.data.usersAllComnments);
      setUpdatedComment(" ")
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserComments();
  }, []);

  const limitComments = userComment.slice(0, 3);

  return (
    <>
      <div className="pl-4 w-full mr-4">
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
              // value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {id ? (
              <button
                className="rounded-[20px] bg-cyan-700 p-6 ml-4"
                onClick={(e) => postUserComments(e)}
              >
                Post
              </button>
            ) : (
              <button
                className="rounded-[20px] bg-cyan-700 p-6 ml-4"
                onClick={() => navigate("/login")}
              >
                Post
              </button>
            )}
          </div>
          <div className="flex flex-col ">
            {showAllComments
              ? userComment.map((comment, index) => (
                  <>
                    <div className="flex text-white pt-2 pb-2" key={index}>
                      <img
                        className="w-[5rem] rounded-[20px]"
                        src={`http://localhost:5000/${comment.image}`}
                      ></img>
                      <div className="flex flex-col pl-2">
                        <p>{comment.name}</p>
                        <p className="text-sm text-neutral-500 font-bold">
                          {formatDistanceToNow(parseISO(comment.createdAt))} ago
                        </p>
                        <p>{comment.comment}</p>
                        <div
                          className={`flex justify-center items-center justify-between ${
                            id === comment.userId ? "w-[17rem]" : "w-[10rem]"
                          } font-bold text-neutral-500`}
                        >
                          <AiOutlineLike />
                          <AiOutlineDislike />
                          <p>Reply</p>
                          <p>Share</p>
                          {id === comment.userId && (
                            <>
                              <button
                                className=""
                                onClick={() => editOpen(index)}
                              >
                                Edit
                              </button>
                              <button
                                className=""
                                onClick={() =>
                                  deleteUserCom(id, comment.commentId)
                                }
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {editComment === index && (
                        <div className="flex ml-[5rem]">
                          <div className=" flex ">
                            <img
                              className="w-[4rem] rounded-[20px]"
                              src={`http://localhost:5000/${comment.image}`}
                            ></img>
                            <input
                              className=" rounded-[20px] ml-4 pl-5 outline-none text-black"
                              placeholder="Write Something"
                              onChange={(e) =>
                                setUpdatedComment(e.target.value)
                              }
                            ></input>
                            <div className="flex flex-col ml-2">
                              <RxCross1
                                onClick={editClose}
                                className="cursor-pointer"
                              />
                              <button
                                className="p-1 mt-2 bg-cyan-600 rounded-[10px]"
                                onClick={() =>
                                  updateUserComments(
                                    comment.movieId,
                                    comment.commentId
                                  )
                                }
                              >
                                Change
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ))
              : limitComments.map((comment, index) => (
                  <>
                    <div className="flex text-white pt-2 pb-2" key={index}>
                      <img
                        className="w-[5rem] rounded-[20px]"
                        src={`http://localhost:5000/${comment.image}`}
                      ></img>
                      <div className="flex flex-col pl-2">
                        <p>{comment.name}</p>
                        <p className="text-sm text-neutral-500 font-bold">
                          {formatDistanceToNow(parseISO(comment.createdAt))} ago
                        </p>
                        <p>{comment.comment}</p>
                        <div
                          className={`flex justify-center items-center justify-between ${
                            id === comment.userId ? "w-[17rem]" : "w-[10rem]"
                          } font-bold text-neutral-500`}
                        >
                          <AiOutlineLike />
                          <AiOutlineDislike />
                          <p>Reply</p>
                          <p>Share</p>
                          {id === comment.userId && (
                            <>
                              <button
                                className=""
                                onClick={() => editOpen(index)}
                              >
                                Edit
                              </button>
                              <button
                                className=""
                                onClick={() =>
                                  deleteUserCom(id, comment.commentId)
                                }
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {editComment === index && (
                        <div className="flex ml-[5rem]">
                          <div className=" flex ">
                            <img
                              className="w-[4rem] rounded-[20px]"
                              src={`http://localhost:5000/${comment.image}`}
                            ></img>
                            <input
                              className=" rounded-[20px] ml-4 pl-5 outline-none text-black"
                              placeholder="Write Something"
                              onChange={(e) =>
                                setUpdatedComment(e.target.value)
                              }
                            ></input>
                            <div className="flex flex-col ml-2">
                              <RxCross1
                                onClick={editClose}
                                className="cursor-pointer"
                              />
                              <button
                                className="p-1 mt-2 bg-cyan-600 rounded-[10px]"
                                onClick={() =>
                                  updateUserComments(
                                    comment.movieId,
                                    comment.commentId
                                  )
                                }
                              >
                                Change
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ))}
            {userComment.length > 3 && (
              <div
                className="cursor-pointer mt-4"
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? (
                  <div className="w-full border-2 border-white text-center rounded-[10px] border-neutral-700 hover:bg-neutral-600">
                    <p className="p-2 text-sm font-bold text-neutral-400">
                      View Less
                    </p>
                  </div>
                ) : (
                  <div className="w-full border-2 border-white text-center rounded-[10px] border-neutral-700 hover:bg-neutral-600">
                    <p className="p-2 text-sm font-bold text-neutral-400">
                      View More
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
