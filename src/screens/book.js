/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useParams} from 'react-router-dom'
import {useBook} from 'utils/books'

import {useListItem} from 'utils/list-items'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'

import {Rating} from 'components/rating'
import {Profiler} from 'components/profiler'
import {StatusButtons} from 'components/status-buttons'
import ListItemTimeFrame from './list-item-time-frame'
import NotesTextarea from './notes-text-area'

function BookScreen() {
  const {bookId} = useParams()
  const book = useBook(bookId)
  const listItem = useListItem(bookId)

  const {title, author, coverImageUrl, publisher, synopsis} = book

  return (
    <Profiler id="Book Screen" metadata={{bookId, listItemId: listItem?.id}}>
      <div>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gridGap: '2em',
            marginBottom: '1em',
            [mq.small]: {
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            css={{width: '100%', maxWidth: '14rem'}}
          />
          <div>
            <div css={{display: 'flex', position: 'relative'}}>
              <div css={{flex: 1, justifyContent: 'space-between'}}>
                <h1>{title}</h1>
                <div>
                  <i>{author}</i>
                  <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                  <i>{publisher}</i>
                </div>
              </div>
              <div
                css={{
                  right: 0,
                  color: colors.gray80,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  minHeight: 100,
                }}
              >
                {book.loadingBook ? null : <StatusButtons book={book} />}
              </div>
            </div>
            <div css={{marginTop: 10, minHeight: 46}}>
              {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
              {listItem ? <ListItemTimeFrame listItem={listItem} /> : null}
            </div>
            <br />
            <p css={{whiteSpace: 'break-spaces', display: 'block'}}>
              {synopsis}
            </p>
          </div>
        </div>
        {!book.loadingBook && listItem ? (
          <NotesTextarea listItem={listItem} />
        ) : null}
      </div>
    </Profiler>
  )
}

export {BookScreen}
