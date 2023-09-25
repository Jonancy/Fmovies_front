import { userHttp } from "../userService/mainUserService";

const addUserComments = ({ user_id, movie_id, comments }) => {
  const res = userHttp.post(
    `/addComment/${user_id}/${movie_id}`, comments);
    console.log(comments);
  return res;
};

const getUserComments = ({movie_id }) => {

  const res = userHttp.get(`/getUserComments/${movie_id}`,
 
  );

  return res;
};

const deleteUserComment=({userId,commentId})=>{

  const res = userHttp.delete(`/deleteUserComments/${userId}/${commentId}`)
  return res
}

export { addUserComments, getUserComments, deleteUserComment };
