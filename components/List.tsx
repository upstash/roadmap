import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { FEATURE_TYPE } from 'lib/const'

import CardNew from './CardNew'
import CardNewSkeleton from './CardNewSkeleton'
import CardRelease from './CardRelease'

export default function List({
  dataLoading,
  data = [],
  onVote,
  onPublish,
  onRemove
}) {
  const auth = useAuth0()

  const NEW_DATA = data
    .filter((item) => item.status === FEATURE_TYPE.NEW)
    .sort((a, b) => b.score - a.score)

  const RELEASE_DATA = data
    .filter((item) => item.status === FEATURE_TYPE.RELEASE)
    .sort((a, b) => b.createdAt - a.createdAt)

  const [showAll, showAllSet] = useState(false)

  const MAX_SHOW_DATA = 10
  const HAS_HIDE_DATA = NEW_DATA.length > MAX_SHOW_DATA

  const SHOW_DATA = showAll ? NEW_DATA : NEW_DATA.slice(0, MAX_SHOW_DATA)

  if (dataLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((_, index) => (
          <CardNewSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <>
      <div>
        {NEW_DATA.length > 0 ? (
          <div className="space-y-6">
            {/* first 10 item */}
            {SHOW_DATA.map((item, index) => (
              <CardNew
                admin={auth?.user?.sub}
                key={index}
                item={item}
                onVote={onVote}
                onPublish={onPublish}
                onRemove={onRemove}
              />
            ))}
            {/* show all */}
            <button
              className="button-ghost"
              type="button"
              hidden={!HAS_HIDE_DATA || showAll}
              onClick={() => {
                showAllSet(true)
              }}
            >
              Show all features
            </button>
          </div>
        ) : (
          <div className="text-center text-zinc-400">
            <p>Empty state 👻</p>
          </div>
        )}
      </div>

      {/* RELEASE FEATURE LIST */}

      {RELEASE_DATA.length > 0 && (
        <div className="mt-10">
          <h2 className="font-bold">Release</h2>
          <div className="mt-4 space-y-2">
            {RELEASE_DATA.map((item, index) => (
              <CardRelease key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
