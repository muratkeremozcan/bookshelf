import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
} from 'react-icons/fa'
import {
  useListItem,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
} from 'utils/list-items'
import * as colors from 'styles/colors'
import TooltipButton from './tooltip-button'

function StatusButtons({book}) {
  const listItem = useListItem(book.id)

  const [mutate] = useUpdateListItem({throwOnError: true})
  const [handleRemoveClick] = useRemoveListItem({throwOnError: true})
  const [handleAddClick] = useCreateListItem({throwOnError: true})

  return (
    <>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Mark as unread"
            highlight={colors.yellow}
            onClick={() => mutate({id: listItem.id, finishDate: null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => mutate({id: listItem.id, finishDate: Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => handleRemoveClick({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => handleAddClick({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </>
  )
}

export {StatusButtons}
