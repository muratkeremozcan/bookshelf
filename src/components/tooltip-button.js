/** @jsx jsx */
import {jsx} from '@emotion/core'

import {FaTimesCircle} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import {CircleButton, Spinner} from './lib'

export default function TooltipButton({
  label,
  highlight,
  onClick,
  icon,
  ...rest
}) {
  const {isLoading, isError, error, run, reset} = useAsync()

  function handleClick() {
    if (isError) {
      reset()
    } else {
      run(onClick())
    }
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}
