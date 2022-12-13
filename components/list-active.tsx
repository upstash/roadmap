import { useContext, useState } from 'react'
import CardActive from './card-active'
import CardActiveLoading from './card-active-loading'
import GlobalStoreContext, { FeatureStatus } from '@/store/index'
import { sortBy } from 'lodash-es'

export default function ListActive() {
  const { data, loadingData, } = useContext(GlobalStoreContext)

  const dataFilterAndSort = sortBy(
    data.filter((item) => item.status === FeatureStatus.Active),
    ['score', 'createdAt']
  ).reverse()

  const [showAll, showAllSet] = useState(false)

  const MAX_SHOW_DATA = 10
  const HAS_HIDE_DATA = dataFilterAndSort.length > MAX_SHOW_DATA
  const SHOW_DATA = showAll
    ? dataFilterAndSort
    : dataFilterAndSort.slice(0, MAX_SHOW_DATA)

  if (loadingData) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((_, index) => (
          <CardActiveLoading key={index} />
        ))}
      </div>
    )
  }

  return (
    <>
      {dataFilterAndSort.length > 0 ? (
        <div className="space-y-6">
          {/* first 10 item */}
          {SHOW_DATA.map((item, index) => (
            <CardActive key={index} item={item} />
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
    </>
  )
}
