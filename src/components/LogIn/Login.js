import React from 'react'

export default function LogIn() {
  return (
    <div>
      
    </div>
  )
}

















// import React from "react";


// const Login = (props) => {
//   const {
//     email,
//     setEmail,
//     password,
//     setPassword,
//     handleLogin,
//     handelSignup,
//     hasAccount,
//     setHasAccount,
//     emailError,
//     passwordError,
//   } = props;

//   return (
//     <section className="login">
//       <div className="loginContainer">
//         <label>Username</label>
//         <input
//           type="text"
//           autoFocus
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <p className="errorMsg">{emailError}</p>
//         <label>Password</label>
//         <input
//           type="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <p className="errorMsg">{passwordError}</p>
//         <div className="btnContainer">
//           {hasAccount ? (
//             <>
//               <button onClick={handleLogin}>Sign In</button>
//               <p>
//                 Do not have an account?
//                 <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
//               </p>
//             </>
//           ) : (
//             <>
//               <button onClick={handelSignup}>Sign Up</button>
//               <p>
//                 Have an a account?{" "}
//                 <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;