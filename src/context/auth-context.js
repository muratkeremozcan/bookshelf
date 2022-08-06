/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import {setQueryDataForBook} from 'utils/books'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'

// [4] Authentication  https://kentcdodds.com/blog/authentication-in-react-applications
// the user doesn't want to submit their password every time they need to make a request
// we don't want to store the user's password and send that with every request.
// So we use a special limited use "token" which represents the user's current session
// Every request the client makes must include this token to make authenticated requests.
// This is one reason it's so nice to have a small wrapper around http utilities (ex: bootstrapAppData)
// (1) Call some API to retrieve a token
// (2) If there's a token, then send it along with the requests you make

async function bootstrapAppData() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('bootstrap', {token})
    queryCache.setQueryData('list-items', data.listItems, {
      staleTime: 5000,
    })
    for (const listItem of data.listItems) {
      setQueryDataForBook(listItem.book)
    }
    user = data.user
  }
  return user
}

// [7] Context
// Context api lets us pass a value deep into the component tree
// without explicitly threading it through every component (prop drilling)
// [7.0] create the context with createContext()
const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

// [7.1] wrap the UI with the context’s Provider component, using the state as a prop
// the values that the hook gets (useAuth) are enabled here
function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  )
  const register = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    queryCache.clear()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({user, login, logout, register}),
    [login, logout, register, user],
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

// [7.2] utilize the useContext(theContext) hook
// identify what components may need in common (ex: Auth)
// Manage state and effects related to a hook’s functionality within the hook and return only the value(s) that components need
// note: it's annoying to have to pass the AuthContext around to React.useContext
// and if someone were to accidentally use React.useContext(AuthContext) without rendering AuthContext.Provider,
// they would get a pretty unhelpful error message about not being able to destructure undefined.
function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const {user} = useAuth()
  const token = user?.token
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
