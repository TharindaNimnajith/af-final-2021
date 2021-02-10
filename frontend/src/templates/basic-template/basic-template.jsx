import React, {Fragment} from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import './basic-template.css'

const BasicTemplate = props => {
  return (
    <div>
      <Fragment>
        <div>
          <Header/>
        </div>
        <div>
          {
            React.Children.map(props.children, (child) => {
              if (child) {
                return React.cloneElement(props.children)
              }
            })
          }
        </div>
        <div>
          <Footer/>
        </div>
      </Fragment>
    </div>
  )
}

export default BasicTemplate
