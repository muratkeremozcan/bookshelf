import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {ReadingListScreen} from './screens/reading-list'
import {FinishedScreen} from './screens/finished'
import {DiscoverBooksScreen} from './screens/discover'
import {BookScreen} from './screens/book'
import {NotFoundScreen} from './screens/not-found'

// [5] Routing
// https://blog.webdevsimplified.com/2022-07/react-router/
// [5.1] Setup your router : usually you import and wrap the app in the router,
//but in authenticated App we're just using the router directly.
// [5.2] Define your routes : define a single Route component for each route in your application
// and then put all those Route components in a single Routes component
// [5.3] Handle navigation: Normally in an application you would navigate with anchor tags,
// but React Router uses its own custom Link component to handle navigation

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<ReadingListScreen />} />
      <Route path="/finished" element={<FinishedScreen />} />
      <Route path="/discover" element={<DiscoverBooksScreen />} />
      <Route path="/book/:bookId" element={<BookScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}
