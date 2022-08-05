import * as React from 'react'
import {formatDate} from 'utils/misc'
import {FaRegCalendarAlt} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'

export default function ListItemTimeFrame({listItem}) {
  const timeFrameLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeFrameLabel}>
      <div aria-label={timeFrameLabel} css={{marginTop: 6}}>
        <FaRegCalendarAlt css={{marginTop: -2, marginRight: 5}} />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}
