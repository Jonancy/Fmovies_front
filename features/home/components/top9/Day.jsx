import React, { useState } from 'react'
import DayList from './dayList'
import Button from './button/button';
import Week from './weekList';
import Month from './month';
import Top9cards from '../../../../components/top9/top9cards';
import MainTop9 from '../../../../hooks/useTop9';
import useMainTop9 from '../../../../hooks/useTop9';

export default function Day() {
    const[selectedOption,setSelectedOption] = useState('day');

    // const forDay=()=>{
    //     setSelectedOption('day')
    // }

    // const forWeek=()=>{
    //     setSelectedOption('week')
    // }

    // const forMonth=()=>{
    //     setSelectedOption('month')
    // }
    
    const{hera} = useMainTop9();
    console.log(hera)

    //!For Week List
    const week = hera.slice(0,7)

    //!For Month List 
    const month = hera.slice(0,10)


    //?After props is passed from children like day or month it will change according to it 
  return (
    <div >
        <div className='flex flex-col p-8'>
        <div className='flex'>
        <div className='p-2 border-2 border-blue-600'>

            <p>Top 9 </p>
        </div>
            <Button selectedItem={setSelectedOption} />
        </div>
            <div>
                {selectedOption==='day'?<Top9cards  top9={hera} />:null}
                {selectedOption==='week'?<Top9cards  top9={week} />:null}
                {selectedOption==='month'?<Top9cards  top9={month} />:null}
            </div>
        </div>
    </div>
  )
}
