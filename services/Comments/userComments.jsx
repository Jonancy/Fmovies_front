import { userHttp } from "../userService/mainUserService";

const addUserComments = ({ user_id, movie_id, comments }) => {
  const res = userHttp.post(
    `/addComment/${user_id}/${movie_id}`, comments);
    console.log(comments);
  return res;
};

const getUserComments = ({ id,movie_id }) => {

  const res = userHttp.get(`/getUserComments/${id}/${movie_id}`,
 
  );

  return res;
};

export { addUserComments, getUserComments };
