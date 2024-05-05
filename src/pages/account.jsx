import React from 'react'
import Form from '../components/Form'
import Admin from './admin';
import { useState } from 'react';
import Profile from './Profile';
const Account = ({theme,setTheme}) => {



   var signedin = true;
    return (
    signedin? <Profile user={user} theme={theme} setTheme={setTheme} /> : <Form theme={theme}></Form>
   
  )
}
export default Account;