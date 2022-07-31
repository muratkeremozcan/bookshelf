import React from 'react'
import {useAsync} from '../utils/hooks'
import {Input, Spinner, FormGroup, ErrorMessage} from './lib'

export default function LoginForm({onSubmit, submitButton}) {
  const {isLoading, isError, error, run} = useAsync()

  const handleSubmit = event => {
    event.preventDefault()
    const {username, password} = event.target.elements

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      }),
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{marginLeft: 5}} /> : null,
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}
