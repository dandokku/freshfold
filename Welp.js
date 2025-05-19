// ! Controlled Form
// import { useState } from "react";

// import React from 'react'

// const Welp = () => {
//     const [name, setName] = useState("")

//     const handleChange = (event) => {
//         setName(event.target.value)
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         alert(`Submitted: ${name}`)
//     }
//   return (
//     <div>
//         <form action={handleSubmit}>

//             <input type="text" required value={name} onChange={handleChange} />
//             <button type="submit">Submit</button>
//         </form>
//     </div>
//   )
// }

// export default Welp

// ! Uncontrolled Form
// import React from 'react'
// import { useRef } from 'react'

// const Welp = () => {
//     const nameRef = useRef("")

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         alert(`Submitted: ${nameRef.current.value}`)
//     }
//   return (
//     <div>
//         <form action={handleSubmit}>
//             <input type="text" ref={nameRef} required />
//             <button type="submit">Submit</button>
//         </form>
//     </div>
//   )
// }

// export default Welp

//! Mutliform
import React from "react";
import { useState } from "react";

const Welp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`submitted: ${formData.email} and ${formData.password}`)
  }
  return <div>
    <form action={handleSubmit}>
        <input type="email" value={formData.email} onChange={handleChange} required />
        <input type="password" value={formData.password} required />
        <button type="submit">Submit</button>
    </form>
  </div>;
};

export default Welp;
