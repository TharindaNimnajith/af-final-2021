import React from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import UserManagementComponent from './user-management-component/user-management-component'
import './user-management.css'

const UserManagement = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className='container user-management-page'>
        <UserManagementComponent/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default UserManagement
