import * as React from 'react'
import debounceFn from 'debounce-fn'
import {useUpdateListItem} from 'utils/list-items'
import {Spinner, Textarea, ErrorMessage} from 'components/lib'

export default function NotesTextarea({listItem}) {
  const [mutate, {error, isError, isLoading}] = useUpdateListItem()

  const debouncedMutate = React.useMemo(
    () => debounceFn(mutate, {wait: 300}),
    [mutate],
  )

  function handleNotesChange(e) {
    console.log('yo')
    debouncedMutate({id: listItem.id, notes: e.target.value})
  }

  return (
    <>
      <div>
        <label
          htmlFor="notes"
          css={{
            display: 'inline-block',
            marginRight: 10,
            marginTop: '0',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Notes
        </label>
        {isError ? (
          <ErrorMessage
            variant="inline"
            error={error}
            css={{fontSize: '0.7em'}}
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
      </div>
      <Textarea
        id="notes"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
        css={{width: '100%', minHeight: 300}}
      />
    </>
  )
}
