import React, {Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {admin, all, user} from './constants/enumerations/user-types'
import RouteFilter from './routes/route-filter'
import Login from './modules/shared/login/login'
import Register from './modules/shared/register/register'
import Home from './modules/user/home/home'
import Dashboard from './modules/admin/dashboard/dashboard'
import UserManagement from './modules/admin/user-management/user-management'
import QuizList from './modules/admin/content-management/quiz-list/quiz-list'
import AddQuiz from './modules/admin/content-management/add-quiz/add-quiz'
import SingleQuiz from './modules/admin/content-management/single-quiz/single-quiz'
import NotFound from './modules/shared/not-found/not-found'
import './App.css'

const App = () => {
  return (
    <div>
      <Fragment>
        <div>
          <BrowserRouter>
            <Switch>
              <RouteFilter path={'/'}
                           exact={true}
                           needAuthentication={false}
                           userType={all}
                           component={Login}/>
              <RouteFilter path={'/login'}
                           exact={true}
                           needAuthentication={false}
                           userType={all}
                           component={Login}/>
              <RouteFilter path={'/register'}
                           exact={true}
                           needAuthentication={false}
                           userType={all}
                           component={Register}/>
              <RouteFilter path={'/home'}
                           exact={true}
                           needAuthentication={true}
                           userType={user}
                           component={Home}/>
              <RouteFilter path={'/dashboard'}
                           exact={true}
                           needAuthentication={true}
                           userType={admin}
                           component={Dashboard}/>
              <RouteFilter path={'/user-management'}
                           exact={true}
                           needAuthentication={true}
                           userType={admin}
                           component={UserManagement}/>
              <RouteFilter path={'/content-management'}
                           exact={true}
                           needAuthentication={true}
                           userType={admin}
                           component={QuizList}/>
              <RouteFilter path={'/add-quiz'}
                           exact={true}
                           needAuthentication={true}
                           userType={admin}
                           component={AddQuiz}/>
              <RouteFilter path={'/single-quiz/:id'}
                           exact={true}
                           needAuthentication={true}
                           userType={admin}
                           component={SingleQuiz}/>
              <Route component={NotFound}/>
            </Switch>
          </BrowserRouter>
        </div>
      </Fragment>
    </div>
  )
}

export default App
