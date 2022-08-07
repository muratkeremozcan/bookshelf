import * as React from 'react'
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'

// [4.1] https://kentcdodds.com/blog/authentication-in-react-applications

// [9] performance: lazy loading & suspense
// lazy load the components instead of importing them at the top

// [9.2] use webpack magic comments to prefetch the authenticated app while filling in the login
// https://webpack.js.org/api/module-methods/#magic-comments
const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

// [9.1] Use the Suspense component to wrap UI that contains one or more lazy components in its tree
// React provides an easy way to specify fallback UI: the Suspense component
function App() {
  const {user} = useAuth()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export {App}
