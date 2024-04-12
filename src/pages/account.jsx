import React from 'react'
import Form from '../components/Form'
const Account = () => {
  
   var signedin = false;
    return (
    !signedin && <Form></Form>
  )
}
export default Account;