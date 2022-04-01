import {
  // BrowserRouter as Router,
  Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'

import { useState, useLayoutEffect } from 'react'

import Layout from './pages/Layout'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import { ArticleList } from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'
import Home from 'pages/Home'
import { AuthProvider } from 'components/AuthRoute/AuthProvider'
import { RequireAuth } from 'components/AuthRoute/RequireAuth'
import history from 'utils/history'
function App() {
  const CustomRouter = ({ history, ...props }) => {
    const [state, setState] = useState({
      action: history.action,
      location: history.location
    })

    useLayoutEffect(() => history.listen(setState), [history])

    return (
      <Router
        {...props}
        location={state.location}
        navigationType={state.action}
        navigator={history}
      />
    )
  }
  return (
    // <Router history={history}>
    <CustomRouter history={history}>
      <div className="App">
        <AuthProvider>
          {/* <Link to={'/login'}>登陆</Link>
        <Link to={'/home'}>首页</Link> */}
          {/* 配置路由的规则 */}
          <Routes>
            <Route path="/" element={<Navigate to={'/login'} />}></Route>
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route path="" element={<Home />}></Route>
              <Route path="list" element={<ArticleList />}></Route>
              <Route path="publish" element={<ArticlePublish />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            {/* 配置404组件 */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </AuthProvider>
      </div>
      {/* </Router> */}
    </CustomRouter>
  )
}

export default App
