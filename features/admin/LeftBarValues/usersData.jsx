import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { getAllUser, userDelete } from "../../../services/admin/adminServices";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ProfilePic from "../../../components/profilePic/profilePic";
import Popup from "reactjs-popup";
import { RxCross1 } from "react-icons/rx";
import Swal from 'sweetalert2'
import { clearData } from "../../../redux/slice/userSlice";

export default function UsersData() {
  //!Need to update when user is deleted
  //!When one user is deleted the user which has commented out the movies all gets deleted with others comments
  //!Like other comments also gets deleted will fix it next
  const [user, setUser] = useState([]);

  const dispatch = useDispatch()

  const userOnline = useSelector((state) => state.user.userId);
  console.log(userOnline);
  const getUsers = async () => {
    try {
      const resp = await getAllUser();
      console.log(resp.data);
      setUser(resp.data.data.User);
    } catch (e) {
      console.log(e);
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const userDeleteId = async (id) => {
    try {
      const res = await userDelete(id);
      // console.log(res);
      const message = res.data.message
      if(res.data.success){

        Swal.fire({
          icon:'success',
          text:message
        })
      }else{
        Swal.fire({
          icon:'error',
          text:message
        })
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="w-full ">
        <div className="flex flex-col  pl-[5rem] pr-[5rem] ">
          <div className="flex justify-between pb-6">
            <div className="flex">
              <BsPlus />
              <p>Manage User</p>
            </div>
            <div className="">
              <p>Recently Active</p>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <table className="w-full max-w-screen-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2">Image</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Last Active</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user) => (
                  <tr className="text-center">
                    <td className="py-2 ">
                      <ProfilePic
                        image={`http://localhost:5000/${user.image}`}
                      />
                    </td>
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    {userOnline === user.id ? (
                      <td className="py-2">online</td>
                    ) : (
                      <td className="py-2">offline</td>
                    )}
                    <td className="py-2">{user.role}</td>
                    <div className="flex justify-between cursor-pointer pt-8 ">
                      <AiFillEdit />
                      {/* <AiFillDelete
                        onClick={() => {
                          userDeleteId(user.id);
                        }}
                      /> */}
                      <div>
                        <Popup trigger={<AiFillDelete />} modal nested>
                          {(close) => (
                            <div className="modal border-2 border-black bg-white">
                              <div className="p-6">
                                <RxCross1
                                  className="float-right cursor-pointer hover:text-red-800 text-xl"
                                  onClick={() => close()}
                                />
                                <div className="pt-6">
                                  Are you sure you want to delete this user?
                                </div>
                                <div className="flex justify-around pt-6">
                                  <button className="bg-green-500 p-2 w-[6rem]"
                                    onClick={() => {
                                      userDeleteId(user.id); 
                                      //dispatch(clearData())
                                    }}
                                  >Yes</button>
                                  <button className="bg-red-800 p-2 w-[6rem]" onClick={() => close()}>No</button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Popup>
                      </div>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
