import React from 'react'
import login from "./assets/login.jpg";
import login2 from "./assets/login2.jpg";
import login3 from "./assets/login3.jpg";
import login4 from "./assets/login4.jpg";

const ImageCompo = () => {
  return (
    <>
         <img
        src={login2}
        alt=""
        className="absolute w-[150px] object-cover top-[-10%] right-[10%] rounded-full"
      />
      <img
        src={login3}
        alt=""
        className="absolute w-[150px] object-cover top-[60%] right-[10%] rounded-full"
      />
   
        <img
          src={login4}
          alt=""
          className="absolute w-[150px] object-cover top-[36%] right-[10%] rounded-full"
        />
      <img
        src={login}
        alt=""
        className="absolute w-[150px] object-cover top-[30%] right-[25%] rounded-full"
      />
      <img
        src={login3}
        alt=""
        className="absolute w-[150px] object-cover top-[-20%] right-[25%] rounded-full"
      />
         <img
        src={login4}
        alt=""
        className="absolute w-[150px] object-cover top-[78%] right-[25%] rounded-full"
      />
    </>
  )
}

export default ImageCompo
