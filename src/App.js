import {
  // BrowserRouter as Router,
  Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'

import { useState, useLayoutEffect, lazy, Suspense } from 'react'
import { Spin } from 'antd'

// import Layout from './pages/Layout'
// import { Login } from './pages/Login'
// import { NotFound } from './pages/NotFound'
// import { ArticleList } from 'pages/ArticleList'
// import { ArticlePublish } from 'pages/ArticlePublish'
import Home from 'pages/Home'
import { AuthProvider } from 'components/AuthRoute/AuthProvider'
import { RequireAuth } from 'components/AuthRoute/RequireAuth'
import history from 'utils/history'

const Layout = lazy(() => import('./pages/Layout'))
const ArticleList = lazy(() => import('./pages/ArticleList'))
const ArticlePublish = lazy(() => import('./pages/ArticlePublish'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
          <Suspense fallback={<Spin size="large" />}>
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
                {/* 新增文章 */}
                <Route path="publish" element={<ArticlePublish />}></Route>
                {/* 编辑文章 */}
                <Route path="publish/:id" element={<ArticlePublish />}></Route>
              </Route>
              <Route path="/login" element={<Login />}></Route>
              {/* 配置404组件 */}
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </div>
      {/* </Router> */}
    </CustomRouter>
  )
}

export default App
