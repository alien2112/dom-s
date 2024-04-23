import React from 'react'
import Form from '../components/Form'
import Admin from './admin';
import { useState } from 'react';
const Account = ({theme}) => {

   var signedin = true;
   var admin  = true;
    return (
    signedin? admin? <Admin/>:<User/> : <Form theme={theme}></Form>
   
  )
}
export default Account;