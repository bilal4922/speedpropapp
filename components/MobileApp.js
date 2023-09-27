import React, { useState, useEffect,useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';




import { View, ActivityIndicator, StyleSheet } from 'react-native';


import { IoPartlySunnyOutline } from 'react-icons/io5';
import { BiMoon } from 'react-icons/bi';

import { GiKnifeFork } from 'react-icons/gi';
import { GiBed } from 'react-icons/gi';


import { BsSun } from 'react-icons/bs';
import { GiPathDistance } from 'react-icons/gi';
import { BsAirplane } from 'react-icons/bs';
import { BsTrainFreightFront } from 'react-icons/bs';
import { BiBus } from 'react-icons/bi';

import { fetchData } from "./redux/actions";

const DIYOverviewPage = () => {
  const items = Array.from({ length: 20 }, (_, index) => index + 1);
 
  const [startDate, setStartDate] = useState(new Date());

  const [ltext, setltext] = useState('Hold on, generating your itenaries');

  const [myArray1, setMyArray1] = useState([]);
  const [datam, setDatam] = useState([]);

  var myArray = [];


  const messages = [
   "Hold up, we're putting together your travel plan...",
   "Figuring out the cities you'll hit...",
"Sorting out the attractions for you to check out...",
"Grabbing the travel routes for your journey...",
"Fine-tuning your itinerary to make it even better...",
"Hang tight while we make sure your trip is top-notch"
  ];

  const [text, setText] = useState(messages[0]);
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [grid, setGrid] = useState('grid-cols-1');




 var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];
  useEffect(() => {
   
    handleNavigate689();


   
    const timer = setInterval(() => {
      // const newIndex = (prevIndex + 1) % messages.length;
      // setText(messages[newIndex]);
      setIndex(prevIndex => {
       const newIndex = (prevIndex + 1) % messages.length;
         setText(messages[newIndex]);
 

      });
    }, 6000);
  
    // Clean up the interval on component unmount
   
    return () => {
      clearInterval(timer);

    };

  }, []);



 

 


  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const data1 = useSelector((state) => state.data.data1);
 const data3 = useSelector((state) => state.data.data3);


  const loading = useSelector((state) => state.data.loading);
  
  const error = useSelector((state) => state.data.error);

  function findThumbnailURLIndex(data3, title) {
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].title === title) {
        return i;
      }
    }
    
    return -1; // If title is not found
  }

  function findThumbnailURLIndex1(data3, title) {
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].title === title) {
        return i;
      }
    }
    
    return -1; // If title is not found
  }

 
  function findThumbnailURLIndex2(data3, title) {
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].title === title) {
        return i;
      }
    }
    
    return -1; // If title is not found
  }

 
  


  const  receivedData = {
    theme: 2,
    message: 'kualalumpur',
    days: 5,
    date: startDate,
  };




function handleNavigate689() {

 
  const  receivedData1 = {
    theme: 2,
    message: 'kualalumpur',
    days: 5,
    date: startDate,
   };
  
   try {
    
  if (loading){
  //  alert("aaa")
     
  }
  else{
    dispatch(fetchData(receivedData1));

  }
    } catch (error) {
     // alert(error)
      console.error('An error occurred:', error);
    }
    


  
    }
  return (
    
  
      <div id="myElement" className="bg-[#EAEBEF] flex flex-col font-ptsans items-center justify-start mx-[auto] w-[100%]">
     







 {/*mobile View*/}
 <div className="absolute visible lg:invisible lg:hidden">
 <div className="bg-[#EAEBEF] flex flex-col font-ptsans items-center justify-start mx-auto w-full">


{/* <div className='absolute visible lg:invisible  bg-gray-200'> */}





<div className='font-montserrat h-[100%] w-[100%]' style={{ backgroundColor: loading ? '#fff' : '#fff' }}>
  <div className="flex items-center justify-center" style={{ backgroundColor: loading ? '#fff' : '#fff' }}>
   


    
    {!loading ? (
      data && (
        <div className={`grid grid-cols-1 md:grid-cols-1 gap-2`}>
          {data.map((item,index) => (
            <div key={item} className="flex items-center justify-center p-2">
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <div
                    className={`bg-white p-3 mt-6 rounded-2xl grid grid-row-2 grid-flow-col w-full md:w-[750px] h-[70px]`}
                  >
                   



                   <div className="">
  <span className="font-semibold justify-center font-montserrat sm:text-[8px] md:text-[60px] lg:text-[9px]">
    Day {item.day}
  </span>

  {(() => {
    // Get the current date
    const currentDate = new Date(receivedData.date);
    const updatedDate = new Date(currentDate.getTime());
   
    updatedDate.setDate(updatedDate.getDate() + item.day- 1);
  //  updatedDate.setDate(updatedDate.getDate() + item.day-2);

    // Define the month names
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    // Format the date as "DD Month"
    const dayOfMonth = updatedDate.getDate();
    const startMonthString = monthNames[updatedDate.getMonth()];

    const formattedDate = `${dayOfMonth} ${startMonthString}`;

    return (
      
     receivedData.days !== null ? (
        <span style={{ color: '#008009' }} className="font-bold block font-semibold justify-center font-montserrat sm:text-[6px] md:text-[30px] lg:text-[6px]">
          &nbsp;&nbsp; {formattedDate}
        </span>
      ) : null
    );
  })()}
  {/* End of added code */}
</div>

          
        
                  </div>

                  <div className="mt-20  w-full md:w-[850px] flex flex-col items-start ">
                  <div className="flex items-center mb-2 mt-0">
    <GiPathDistance color="#008009"  size={50}
                        className="rounded-lg w-10 h-10" alt="route" />
    <text style={{  color: '#008009',marginLeft:11}} className="text-[37px] font-bold ml-2 font-montserrat">
    Transportation
    </text>
    <div className="flex" style={{ marginLeft: '30' }}>
          <a href="https://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fflights" target="_blank" rel="noopener noreferrer">

    <BsAirplane color="#008009"  size={50}
    
                        className="rounded-lg w-10 h-10" alt="route" style={{ marginLeft: '20px', marginRight: '20px' }} />
                        </a>
    <a href="https://online.ktmb.com.my" target="_blank" rel="noopener noreferrer">

    <BsTrainFreightFront color="#008009"  size={50}
                        className="rounded-lg w-10 h-10" alt="route" style={{ marginLeft: '0px', marginRight: '20px' }}/>
    </a>
    <a href="https://gohub.com.my" target="_blank" rel="noopener noreferrer">

    <BiBus color="#008009"  size={50}
                        className="rounded-lg w-10 h-10" alt="route" />
    </a>
  </div>
  </div>

                    <div className="flex items-center mb-2 mt-0 ">
                      <BsSun
                      color="#008009"
                        size={50}
                        className="rounded-lg w-10 h-10" // Set fixed width and height
                        alt="route"
                      />
                      <text style={{  color: '#008009',marginLeft:11}} className="text-[37px] font-bold ml-2 font-montserrat">
                      Morning
                      </text>
                    </div>
                    <div className="ml-4 mt-4" style={{ display: 'flex', alignItems: 'center' }}>
    <div className="dotted-line1"></div>
    <div style ={{marginLeft: '35px', }}>
    
                   
                        <text className="text-black font-montserrat">
                          <span style={{ fontSize: '37px',  fontWeight: '450' }}>
                            {/* <a
                              href={`https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.morningplace}, ${receivedData.message}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            > */}
                            {item.morningactivity && item.morningactivity.replace(item.morningplace, "")} <text className='text-[#008009] underline'> <a
                              href={`https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.morningplace}, ${receivedData.message}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.morningplace}
                              </a>
                              
                              </text>,  {item.mcomment}
                            {/* </a> */}
                          </span>
                          {/* <br /> */}
                          {/* <span style={{ fontSize: '37px', fontWeight: '400' }}>{item.morningactivity}</span> */}
                        </text>
                      </div>
         
                    </div>
                    {data3 && data3.length > 0 && (
  <div>
    {(() => {
      const thumbnailIndex = findThumbnailURLIndex1(data3, item.morningplace);

      if (thumbnailIndex >= 0 && data3[thumbnailIndex]?.thumbnailURL) {
        const thumbnailURL = data3[thumbnailIndex].thumbnailURL;
        const thumbnailURL1 = data3[thumbnailIndex].webURL;

        return (
          <div className="ml-2" style={{ display: 'flex', marginTop: 10, marginLeft: 16 }}>
            <div style={{ marginLeft: 0, height: 410 }} className="dotted-line1"></div>
            <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
              <img
                className="rounded rounded-3xl drop-shadow-2xl"
                src={thumbnailURL}
                alt="Display"
                style={{ marginLeft: 35, width: '460px', height: '360px', marginTop: 5 }}
              />
            </a>
          </div>
        );
      } else {
        return null;
      }
    })()}
  </div>
)}




</div>

                 
                  <div style={{marginLeft:10 }} className=" mt-2   w-full md:w-[700px] flex flex-col items-start">

<div className="flex items-center mb-2">

  <GiKnifeFork
  style={{marginLeft:-10 }}
    color="#008009"
    size={50}
    className="rounded-lg w-10 h-10" // Set fixed width and height
    alt="route"
  />
 
  <text style={{ color: '#008009', ontWeight: '600' }} className="text-[37px]  ml-2 font-montserrat">
    Lunch-&nbsp;&nbsp;
    <text  style={{ color: '#008009', ontWeight: '450' }}className=' text-[37px] underline'>
      <a
        href={`https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.lunch}, ${receivedData.message}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.lunch}
      </a>
    </text>
  </text>
  
</div>
</div>




<div style={{marginLeft:8,height:30 ,marginLeft:18}}className="dotted-line1"></div>




<div className="mt-0  w-full md:w-[850px] flex flex-col items-start ">
                    <div className="flex items-center mb-2 mt-4">
                      <IoPartlySunnyOutline
                      color="#008009"
                        size={50}
                        className="rounded-lg w-10 h-10" // Set fixed width and height
                        alt="route"
                      />
                      <text style={{  color: '#008009',marginLeft:11 }} className="text-[37px] font-bold ml-2 font-montserrat">
                      Afternoon
                      </text>
                    </div>
                    <div className="ml-4 mt-4" style={{ display: 'flex', alignItems: 'center' }}>
    <div className="dotted-line1"></div>
    <div style ={{marginLeft: '35px'}}>
                        <text className="text-black font-montserrat">
                          <span style={{ fontSize: '37px',  fontWeight: '450' }}>
                            {/* <a
                              href={`https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.morningplace}, ${receivedData.message}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            > */}
                             {  item.afternoonactivity && item.afternoonactivity.replace(item.afternoonplace, "")} <text className='text-[#008009] underline'> <a
                              href={`https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.afternoonplace}, ${receivedData.message}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                             {item.afternoonplace}
                              </a>
                      
                      
                      </text>,  {item.acomment}
                            {/* </a> */}
                          </span>
                          {/* <br /> */}
                          {/* <span style={{ fontSize: '37px', fontWeight: '400' }}>{item.morningactivity}</span> */}
                        </text>
                      </div>
                    </div>
                    {data3 && data3.length > 0 && (
  <div>
    {(() => {
      const thumbnailIndex = findThumbnailURLIndex1(data3, item.afternoonplace);

      if (thumbnailIndex >= 0 && data3[thumbnailIndex]?.thumbnailURL) {
        const thumbnailURL = data3[thumbnailIndex].thumbnailURL;
        const thumbnailURL1 = data3[thumbnailIndex].webURL;

        return (
          <div className="ml-2" style={{ display: 'flex', marginTop: 10, marginLeft: 16 }}>
            <div style={{ marginLeft: 0, height: 410 }} className="dotted-line1"></div>
            <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
              <img
                className="rounded rounded-3xl drop-shadow-2xl"
                src={thumbnailURL}
                alt="Display"
                style={{ marginLeft: 35, width: '460px', height: '360px', marginTop: 5 }}
              />
            </a>
          </div>
        );
      } else {
        return null;
      }
    })()}
  </div>
)}


                  </div>

                  <div style={{marginLeft:10 }} className=" mt-2   w-full md:w-[700px] flex flex-col items-start">

<div className="flex items-center mb-2">

  <GiKnifeFork
  style={{marginLeft:-10 }}
    color="#008009"
    size={50}
    className="rounded-lg w-10 h-10" // Set fixed width and height
    alt="route"
  />
 
  <text style={{ color: '#008009', ontWeight: '600' }} className="text-[37px]  ml-2 font-montserrat">
    Dinner-&nbsp;&nbsp;
    <text  style={{ color: '#008009', ontWeight: '450' }}className=' text-[37px] underline'>
      <a
        href={`https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.dinner}, ${receivedData.message}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.lunch}
      </a>
    </text>
  </text>
  
</div>
</div>

<div className="mt-0  w-full md:w-[850px] flex flex-col items-start ">
                    <div className="flex items-center mb-2 mt-4">
                      <BiMoon
                      color="#008009"
                        size={50}
                        className="rounded-lg w-10 h-10" // Set fixed width and height
                        alt="route"
                      />
                      <text style={{  color: '#008009' ,marginLeft:11}} className="text-[37px] font-bold ml-2 font-montserrat">
                      Evening
                      </text>
                    </div>
                    <div className="ml-4 mt-4" style={{ display: 'flex', alignItems: 'center' }}>
    <div className="dotted-line1"></div>
    <div style ={{marginLeft: '35px'}}>
                        <text className="text-black font-montserrat">
                          <span style={{ fontSize: '37px',  fontWeight: '450' }}>
                            {/* <a
                              href={`https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.morningplace}, ${receivedData.message}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            > */}
                         
                            { item.eveningactivity && item.eveningactivity.replace(item.eveningplace, "")}
                            
                             <text className='text-[#008009] underline'> <a
                              href={`https://www.viator.com/searchResults/all?pid=P00094549&mcid=42383&medium=link&text=${item.eveningplace}, ${receivedData.message}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                             {item.eveningplace}
                              </a>
                      
                      
                      </text>,  {item.ecomment}{findThumbnailURLIndex2(data3, item.eveningplace)}
                            {/* </a> */}
                          </span>
                          {/* <br /> */}
                          {/* <span style={{ fontSize: '37px', fontWeight: '400' }}>{item.morningactivity}</span> */}
                        </text>
                      </div>
                    </div>
                    {data3 && data3.length > 0 && (
  <div>
    {(() => {
      const thumbnailIndex = findThumbnailURLIndex1(data3, item.eveningplace);

      if (thumbnailIndex >= 0 && data3[thumbnailIndex]?.thumbnailURL) {
        const thumbnailURL = data3[thumbnailIndex].thumbnailURL;
        const thumbnailURL1 = data3[thumbnailIndex].webURL;

        return (
          <div className="ml-2" style={{ display: 'flex', marginTop: 10, marginLeft: 16 }}>
            <div style={{ marginLeft: 0, height: 410 }} className="dotted-line1"></div>
            <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
              <img
                className="rounded rounded-3xl drop-shadow-2xl"
                src={thumbnailURL}
                alt="Display"
                style={{ marginLeft: 35, width: '460px', height: '360px', marginTop: 5 }}
              />
            </a>
          </div>
        );
      } else {
        return null;
      }
    })()}
  </div>
)}


                  </div>



                  <div style={{marginLeft:10 }} className=" mt-0   w-full md:w-[700px] flex flex-col items-start">
 

  {(() => {
    // Get the current date
    const currentDate = new Date(receivedData.date);
    const updatedDate = new Date(currentDate.getTime());
    const updatedDate1 = new Date(currentDate.getTime());
    updatedDate.setDate(updatedDate.getDate() + item.day - 1);
    
    // Format the date as "YYYY-MM-DD"
    const year = updatedDate1.getFullYear();
    const month = String(updatedDate1.getMonth() + 1).padStart(2, '0');
    const day = String(updatedDate1.getDate()).padStart(2, '0');

    const year1 = updatedDate.getFullYear();
    const month1 = String(updatedDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(updatedDate.getDate()).padStart(2, '0');

    const formattedDate1 = `${year}-${month}-${day}`;
    const formattedDate2 = `${year1}-${month1}-${day1}`;

    return (
      // <span style={{ color: '#008009' }} className="font-bold block font-semibold justify-center font-montserrat sm:text-[6px] md:text-[30px] lg:text-[6px]">
      //   &nbsp;&nbsp; {formattedDate}
      // </span>


<div className="flex items-center mb-2">
  
<GiBed
  color="#008009"
  size={50}
  className="rounded-lg w-10 h-10" // Set fixed width and height
  alt="route"
/>

<text style={{ color: '#008009', ontWeight: '600' }} className="text-[37px]  ml-2 font-montserrat">
Bedtime-&nbsp;&nbsp;

<text  style={{ color: '#008009', ontWeight: '300' }}className=' text-[25px] '>
 Hotels Deals in&nbsp;
</text>
  <text  style={{ color: '#008009', ontWeight: '300' }}className=' text-[25px] underline'>
    <a

      href={`http://kayak.com.my/in?a=kan_262812_573418&lc=en&url=%2Fhotels/${receivedData.message}/${formattedDate1}/${formattedDate2}?sort=distance_a`}
      target="_blank"
      rel="noopener noreferrer"
    >
       {receivedData.message}
    </a>
  </text>
</text>

</div>



    );
  })()}
  {/* End of added code */}
</div>


          
                  
                
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    ) : (
      <div className="h-[100%] w-[100%] mt-30 flex items-center justify-center flex-col">
        <span style={{ fontSize: '30px', fontWeight: 'normal' }}>{text}</span>
        <ActivityIndicator size={30} sx={{ color: 'black' }} />
      </div>
    )}
  </div>
 

</div>


     
</div>
</div>




      </div>


    
  );
};

export default DIYOverviewPage;

