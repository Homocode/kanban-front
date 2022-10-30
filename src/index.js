import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const userInfo = {
  name: "german",
  password: "123",
  isNew: false
}

const getInitialState = async() => {
  try {
   const resp = await fetch("http://ec2-54-207-162-78.sa-east-1.compute.amazonaws.com/:3001/api/user", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
   })
   const data = await resp.json()
   root.render(
    <App globalState={data} userInfo={userInfo}/>
  )
  } catch (error) {
    console.log(error)
  }

}


const root = ReactDOM.createRoot(document.getElementById('root'));
getInitialState()