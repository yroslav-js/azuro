"use client"

import {useState} from "react";

const Odd = () => {
  const [active, setActive] = useState(false)
  return (
    <div style={active ? {color: 'white'} : {}} onClick={() => setActive(true)}><span>4</span> $137K</div>
  );
};

export default Odd;