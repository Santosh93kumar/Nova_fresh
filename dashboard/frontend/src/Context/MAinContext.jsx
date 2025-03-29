// import React, { createContext, useState } from "react";

// export let CountContext = createContext();

// export default function MainContext({ children }) {
  
//   const [count, setCount] = useState(0);
//   let obj={count,setCount} // Example state

// 
// }

import React, { createContext, useState, useEffect } from "react";

export let CountContext = createContext();

export default function MainContext({ children }) {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Store token in localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  let obj = { count, setCount, token, setToken };

  return (
        <CountContext.Provider value={obj}>
          {children}
        </CountContext.Provider>
      );
   
}
