import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import './admin-navigation-entries.css'

const AdminNavigationEntries = () => {
  return (
    <div>
      <Nav vertical>
        <div>
          <NavItem>
            <NavLink href='/dashboard'>
              <i className='fa fa-fw fa-home m-1'/>
              <label>Dashboard</label>
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink href='/home'>
              <i className='fa fa-fw fa-home m-1'/>
              <label>Home</label>
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink href='/login'>
              <i className='fa fa-fw fa-home m-1'/>
              <label>Login</label>
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink href='/register'>
              <i className='fa fa-fw fa-home m-1'/>
              <label>Register</label>
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink href='/'>
              <i className='fa fa-fw fa-home m-1'/>
              <label>Navigation Link</label>
            </NavLink>
          </NavItem>
        </div>
      </Nav>
    </div>
  )
}

export default AdminNavigationEntries
