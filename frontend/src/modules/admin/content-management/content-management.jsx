import React from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import ContentManagementComponent from './content-management-component/content-management-component'
import './content-management.css'

const ContentManagement = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <h1 className='text-center text-uppercase mt-5 page-title'>
        Content Management
      </h1>
      <div className='container content-management-page'>
        <ContentManagementComponent/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default ContentManagement
