import React ,{useState} from "react";
import { authWithAxios } from "../utils/authWithAxios";

const Login = (props) => {
  const [ user, setUser] = useState(
    {username:'',
    password:''}
  )
  const login = (event) =>{
    event.preventDefault()
    authWithAxios()
    .post('/login', user)
    .then(response=>{
      localStorage.setItem('token',response.data.payload)
      props.history.push('/private')

    })
    .catch(error=> console.log('error', error))
  }
  const handleChange =(event)=>{
    setUser({...user, [event.target.name] : event.target.value}
  );
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
      <input type="text" name='username' value={user.username} placeholder='username' onChange={handleChange}/>
      <input type="password" name='password' value={user.password} placeholder='password' onChange={handleChange}/>
      <button type="submit">Login</button>
      </form>

    </>
  );
};

export default Login;
