/** @jsx jsx */
import {jsx} from '@emotion/react'

import {Button} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'
import {useAuth} from './context/auth-context'
import LoginForm from './components/login-form'

// [4.2] to manage displaying the right content to the user based on whether they've logged in,
// is to split your app into two parts: Authenticated, and Unauthenticated.
// Then you choose which to render based on whether you have the user's information.

function UnauthenticatedApp() {
  const {login, register} = useAuth()
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents
            data-cy="login-form"
            aria-label="Login form"
            title="Login"
          >
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents
            data-cy="register-form"
            aria-label="Registration form"
            title="Register"
          >
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
