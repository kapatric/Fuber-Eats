import { useEffect, useState } from "react";
import sha256 from 'js-sha256'
import axios from 'axios';
import "./loginregister.css"
import Cookies from 'js-cookie'

export default function LoginRegister(props) {
  const [RegisterUser, setRegisterUser] = useState("");
  const [RegisterPassword, setRegisterPassword] = useState("");
  const [RegisterConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [LoginUser, setLoginUser] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [LoginConfirmPassword, setLoginConfirmPassword] = useState("")

  const ResetParameters = async () => {
    document.getElementById("username-register").value = "";
    document.getElementById("password-register").value = "";
    document.getElementById("confirmpassword-register").value = "";
    setRegisterConfirmPassword("");
    setRegisterPassword("");
    setRegisterUser("");
    document.getElementById("username-login").value = "";
    document.getElementById("password-login").value = "";
    document.getElementById("confirmpassword-login").value = "";
    setLoginConfirmPassword("");
    setLoginPassword("");
    setLoginUser("");
  };
  const HandleRegister = (event) => {
    if (event.target.id === "username-register") {
      setRegisterUser(event.target.value);
    }
    if (event.target.id === "password-register") {
      setRegisterPassword(event.target.value);
    }
    if (event.target.id === "confirmpassword-register") {
      setRegisterConfirmPassword(event.target.value);
    }
    props.setEncrypted(sha256(RegisterUser + RegisterPassword))
  };
  const HandleLogin = (event) => {
    if (event.target.id === "username-login") {
      setLoginUser(event.target.value);
    }
    if (event.target.id === "password-login") {
      setLoginPassword(event.target.value);
    }
    if (event.target.id === "confirmpassword-login") {
      setLoginConfirmPassword(event.target.value);
    }
    props.setEncrypted(sha256(LoginUser + LoginPassword))
  };

  const doRegister = async (event) => {
    await event.preventDefault();
    console.log("Registering...");
    if (Cookies.get("Status") === "true") {
      alert("You are logged in, log out to make an account!");
      ResetParameters();
    } else {
      if (
        RegisterPassword === RegisterConfirmPassword &&
        RegisterUser.length > 0
      ) {
        fetch("https://fubereats-backend-production.up.railway.app/users")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let userHashes = []
            data.map((element) => {
              userHashes.push(element.hash)
            })
            if (userHashes.includes(props.Encrypted)) {
              alert("This account has already been created")
              ResetParameters();
            } else {
              axios
                .post("https://fubereats-backend-production.up.railway.app/users", { hash: props.Encrypted })
                .then((response) => {
                  console.log(response.data);
                  props.setLoginStatus(true);
                  props.setuserHash(props.Encrypted)
                  Cookies.set("Username", RegisterUser)
                  ResetParameters();
                  alert("Registered and Logged in ...");
                });
            }
          })
      } else {
        alert("Passwords do not match, or username field is empty");
        ResetParameters();
      }
    }
  };

  const doLogin = (event) => {
    event.preventDefault();
    console.log("Logging in....");
    if (Cookies.get("Status") === "true") {
      alert("You are logged in already!");
      ResetParameters();
      return
    }
    if (LoginConfirmPassword !== LoginPassword || LoginUser.length < 1) {
      alert("Passwords do not match or Username is blank!");
    } else {
      fetch("https://fubereats-backend-production.up.railway.app/users")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let userHashes = []
          data.map((element) => {
            userHashes.push(element.hash)
          })
          userHashes.map((element) => {
            if (element === props.Encrypted) {
              props.setuserHash(props.Encrypted)
              Cookies.set("Username", LoginUser)
              props.setLoginStatus(true);
            }
          })
          alert("Logged in!")
        })

      ResetParameters();
    }
  };

  const doLogOut = (event) => {
    if (Cookies.get("Status") === "false") {
      Cookies.set("Username", "Not logged in")
      alert("Already logged out");
    }
    if (Cookies.get("Status") === "true") {
      props.setLoginStatus(false);
      props.setEncrypted("");
      props.setuserHash("");
      props.setuserID("")
      Cookies.set("UserID", "Not logged in")
      Cookies.set("Status", false)
      Cookies.set("Username", "Not logged in")
      alert("Logged out sucessfully");
    }
  };

  return (
    <div className='LoginRegister'>
      <br></br>
      <h3 class ="Welcome">
        Welcome : {Cookies.get("Username")}
      </h3>
      <br></br>
      <br></br>
      <div class="forms">
      <form onSubmit={doRegister}>
        Register Account :
        <br></br>
        <label htmlFor="doRegister">Username: </label>
        <input type="text" id="username-register" onChange={HandleRegister}></input>
        <br></br>
        <label htmlFor="doRegister">Password: </label>
        <input type="password" id="password-register" onChange={HandleRegister}></input>
        <br></br>
        <label htmlFor="doRegister">Confirm: </label>
        <input type="password" id="confirmpassword-register" onChange={HandleRegister}></input>
        <br></br>
        <input type="submit" />
      </form>
      <br></br>
      <form onSubmit={doLogin}>
        Login To Account :
        <br></br>
        <label htmlFor="doLogin">Username: </label>
        <input type="text" id="username-login" onChange={HandleLogin}></input>
        <br></br>
        <label htmlFor="doLogin">Password: </label>
        <input type="password" id="password-login" onChange={HandleLogin}></input>
        <br></br>
        <label htmlFor="doLogin">Confirm: </label>
        <input type="password" id="confirmpassword-login" onChange={HandleLogin}></input>
        <br></br>
        <input type="submit" />
      </form>
        <br></br>
        </div>
      <button class ="logOut" onClick={doLogOut}>
        Log Out
      </button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}