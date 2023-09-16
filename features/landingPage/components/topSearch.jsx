import React from "react";
import { useNavigate } from "react-router-dom";


export default function TopSearch() {

    const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <p className="text-white">
          Top search: One Piece The Nun II Barbie The Walking Dead: Daryl Dixon Jawan Meg 2: The Trench Game of Thrones Modern Family Power Book IV:Force The Rookie
        </p>
      <button onClick={()=>navigate('/home')} className="broder-2 bg-cyan-600 p-2 rounded-[6px]">
        <p>Go to Home page</p>
      </button>
      </div>
    </>
  );
}
