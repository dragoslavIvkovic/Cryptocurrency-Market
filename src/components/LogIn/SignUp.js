import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate 
} from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  
  return (
    <div>
      
    </div>
  )
}

export default SignUp






























// import Fire from "../../firebase-config";
// import Login from "./Login";


// const SignUp = () => {
//   const [user, setUser] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [hasAccount, setHasAccount] = useState("false");

//   const clearInput = () => {
//     setEmail("");
//     setPassword("");
//   };

//   const clearErrors = () => {
//     setEmailError("");
//     setPasswordError("");
//   };

//   const handleLogin = () => {
//     clearErrors();
//     Fire
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .catch((err) => {
//         switch (err.code) {
//           case "auth/invalid-email":
//           case "auth/user-disabled":
//           case "auth/user-not-found":
//             setEmailError(err.message);
//             break;
//           case "auth/wrong-password":
//             setPasswordError(err.message);
//             break;
//         }
//       });
//   };
//   const handelSignup = () => {
//     clearErrors();
//     Fire
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .catch((err) => {
//         switch (err.code) {
//           case "auth/email-already-in-use":
//           case "auth/invalid-email":
//             setEmailError(err.message);
//             break;
//           case "auth/weak-password":
//             setPasswordError(err.message);
//             break;
//         }
//       });
//   };

//   const handleLogout = () => {
//     Fire.auth().signOut();
//   };

//   const authListener = () => {
//     Fire.auth().onAuthStateChanged((user) => {
//       if (user) {
//         clearInput();
//         setUser(user);
//       } else {
//         setUser("");
//       }
//     });
//   };

//   useEffect(() => {
//     authListener();
//   }, []);

//   return (
//     <>
//     <div>{user}</div>
//     <div className="sign-up">
//       {user ? (
//         <div handleLogout={handleLogout} />
//       ) : (
//         <Login
//           email={email}
//           setEmail={setEmail}
//           password={password}
//           setPassword={setPassword}
//           handleLogin={handleLogin}
//           handelSignup={handelSignup}
//           hasAccount={hasAccount}
//           setHasAccount={setHasAccount}
//           emailError={emailError}
//           passwordError={passwordError}
//         />
//       )}
//     </div>
//     </>
//   );
// };

// export default SignUp;