import React, { useState, useContext } from "react";
import axios from "axios";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  //const [error, setError] = useState('')
  const { error, sendRequest } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (isLoginMode) {
      const payload = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };
      // axios
      // .post("http://localhost:5000/api/users/login", payload, options)
      // .then((res) => {
      //   console.log(res.data, "Succesfully login");
      //   auth.login();
      // })
      // .catch((err) => {
      // //  setError(err.response.data.message)
      // });
      sendRequest("http://localhost:5000/api/users/login", payload).then(
        (res) => {
         // console.log(res.data.message, "Succesfully login");
          auth.login();
        }
      ).catch(
        err => console.log(err.data)
      );
    } else {
      const payload = {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };
      axios
        .post("http://localhost:5000/api/users/signup", payload, options)
        .then((res) => {
          console.log(res.data, "Succesfully registered");
          auth.login();
        })
        .catch((err) => {
          //      setError(err.response.data.message)
        });
    }
  };

  return (
    <Card className='authentication'>
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        <p style={{ color: "red" }}>{error}</p>
        {!isLoginMode && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Your Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name.'
            onInput={inputHandler}
          />
        )}
        <Input
          element='input'
          id='email'
          type='email'
          label='E-Mail'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email address.'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid password, at least 5 characters.'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;

// const response = await fetch("http://localhost:5000/api/users/signup", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: {
//     name: formState.inputs.name.value,
//     email: formState.inputs.email.value,
//     password: formState.inputs.password.value,
//   },
// });
// const responseData = response.json();
// console.log(responseData)
// /

// const Auth = () => {
//   const [name, setName] = useState("");
//   const [mail, setMail] = useState("");
//   const [password, setPassword] = useState("");

//   const nameChange = (e) => {
//     setName(e.target.value);
//   };
//   const passwordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const emailChange = (e) => {
//     setMail(e.target.value);
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       username: name,
//       email: mail,
//       password,
//     };
//     const options = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     axios
//       .post("http://localhost:5000/api/users/signup", payload, options)
//       .then((res) => {
//         console.log("RESPONSE ==== : ", res);
//       });
//     console.log(payload);
//   };
//   return (
//     <Card className="authentication">
//     <h2>Login Required</h2>
//     <hr />
//     <form onSubmit={authSubmitHandler}>
//       {!isLoginMode && (
//         <Input
//           element="input"
//           id="name"
//           type="text"
//           label="Your Name"
//           validators={[VALIDATOR_REQUIRE()]}
//           errorText="Please enter a name."
//           onInput={inputHandler}
//         />
//       )}
//       <Input
//         element="input"
//         id="email"
//         type="email"
//         label="E-Mail"
//         validators={[VALIDATOR_EMAIL()]}
//         errorText="Please enter a valid email address."
//         onInput={inputHandler}
//       />
//       <Input
//         element="input"
//         id="password"
//         type="password"
//         label="Password"
//         validators={[VALIDATOR_MINLENGTH(5)]}
//         errorText="Please enter a valid password, at least 5 characters."
//         onInput={inputHandler}
//       />
//       <Button type="submit" disabled={!formState.isValid}>
//         {isLoginMode ? 'LOGIN' : 'SIGNUP'}
//       </Button>
//     </form>
//     <Button inverse onClick={switchModeHandler}>
//       SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
//     </Button>
//   </Card>
//   );
// };

// export default Auth;

// // try {
// //   const response = await fetch("http://localhost:5000/api/users/signup", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: {
// //       name: name,
// //       email: mail,
// //       password
// //     },
// //   });
// //   const responseData = response.json();
// //   console.log(responseData)

// // } catch (err) {
// //   console.log(err);
// // }
