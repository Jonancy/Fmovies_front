import React from "react";
import { BsPlus } from "react-icons/bs";

export default function UsersData() {
  return (
    <>
      <div className="flex flex-col">
        <div className="">
          <div className="flex">
            <div className="flex">
              <BsPlus />
              <p>Manage User</p>
            </div>
            <div className="">
              <p>Recently Active</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
