import {useQuery, useMutation, queryCache} from 'react-query'
import {setQueryDataForBook} from './books'
import {useClient} from 'context/auth-context'

function useListItem(bookId, options) {
  const listItems = useListItems(options)
  return listItems?.find(li => li.bookId === bookId) ?? null
}

// [5] Caching
// We can drastically simplify our UI state management if we split out the server cache into something separate
// State can be lumped into two buckets:
// (1) UI state: Modal is open, item is highlighted, etc.
// (2) Server cache: User data, tweets, contacts, etc. -> React query

// Why react-query? https://react-query.tanstack.com/
// to prevent duplicated data-fetching, we want to move all the data-fetching code into a central store
// and access that single source from the components that need it.
// With React Query, we don’t need to do any of the work involved in creating such a store.
// It lets us keep the data-fetching code in the components that need the data,
// but behind the scenes it manages a data cache, passing already-fetched data to components when they ask for them

// useQuery is for fetching data (by key) and caching it, while updating cache
// const { data, status, error } = useQuery(key, () => fetch(url))
// the key arg is a unique identifier for the query / data in cache; string, array or object
// the 2nd arg an async function that returns the data
// useQuery can be called with a 3rd arg, a config object with initialData property
// queryCache.getQueryData() allows to access the already fetched cached data

// why useMutation?
// useParams and useQuery fetch state: UI state <- server/url , and caches it
// useMutation is just the opposite: UI state -> server , and still caches it
// yields data, status, error just like useQuery
// const { dataToMutate, status, error } = useMutation((url) => fetch(url) {.. non-idempotent (POST for example) ..})
// the first arg is a function that that executes a non-idempotent request
// the second arg is an object with onMutate property

function useListItems(options = {}) {
  const client = useClient()

  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () => client('list-items').then(data => data.listItems),
    ...options,
    config: {
      ...options.config,
      onSuccess: async listItems => {
        await options.config?.onSuccess?.(listItems)
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })
  return listItems ?? []
}

const defaultMutationOptions = {
  onError: (_err, _variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function onUpdateMutation(newItem) {
  const previousItems = queryCache.getQueryData('list-items')

  queryCache.setQueryData('list-items', old => {
    return old?.map(item => {
      return item.id === newItem.id ? {...item, ...newItem} : item
    })
  })

  return () => queryCache.setQueryData('list-items', previousItems)
}

function useUpdateListItem(options) {
  const client = useClient()

  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
      }),
    {
      onMutate: onUpdateMutation,
      ...defaultMutationOptions,
      ...options,
    },
  )
}

function useRemoveListItem(options) {
  const client = useClient()

  return useMutation(({id}) => client(`list-items/${id}`, {method: 'DELETE'}), {
    onMutate: removedItem => {
      const previousItems = queryCache.getQueryData('list-items')

      queryCache.setQueryData('list-items', old => {
        return old.filter(item => item.id !== removedItem.id)
      })

      return () => queryCache.setQueryData('list-items', previousItems)
    },
    ...defaultMutationOptions,
    ...options,
  })
}

function useCreateListItem(options) {
  const client = useClient()

  return useMutation(({bookId}) => client('list-items', {data: {bookId}}), {
    ...defaultMutationOptions,
    ...options,
  })
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
