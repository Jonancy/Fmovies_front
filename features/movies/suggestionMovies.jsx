import React, { useState } from "react";
import useMainTop9 from "../../hooks/useTop9";
import { BsPlayBtnFill } from "react-icons/bs";
import Top9cards from "../../components/top9/top9cards";


export default function SuggestedMovies() {
  const [selectedOption, setSelectedOption] = useState("day");

  // const forDay=()=>{
  //     setSelectedOption('day')
  // }

  // const forWeek=()=>{
  //     setSelectedOption('week')
  // }

  // const forMonth=()=>{
  //     setSelectedOption('month')
  // }

  const { hera } = useMainTop9();
  console.log(hera);

  //!For Week List
  const week = hera.slice(0, 7);

  //!For Month List
  const month = hera.slice(0, 10);

  //?After props is passed from children like day or month it will change according to it
  return (
    <div className="w-full  lg:w-[40%]">
      <div className="flex flex-col ">
        <div className="flex">
          <div className="p-2 text-2xl font-bold flex items-center gap-2">
            <BsPlayBtnFill className="text-cyan-600"/>
            <p>Suggestions </p>
          </div>
          {/* <Button selectedItem={setSelectedOption} /> */}
        </div>
        <div>
          {selectedOption === "week" ? <Top9cards top9={week} /> : null}
          {selectedOption === "day" ? <Top9cards top9={hera} /> : null}
          {selectedOption === "month" ? <Top9cards top9={month} /> : null}
        </div>
      </div>
    </div>
  );
}
