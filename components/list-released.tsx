import { useContext } from 'react'
import CardReleased from './card-released'
import GlobalStoreContext, { Feature, FeatureStatus } from '@/store/index'
import { sortBy } from 'lodash-es'

export default function ListReleased() {
  const { data } = useContext(GlobalStoreContext)

  const dataFilterAndSort: Feature[] = sortBy(
    data.filter((item) => item.status === FeatureStatus.Released),
    ['score']
  ).reverse()

  if (dataFilterAndSort.length === 0) return null

  return (
    <div>
      <h2 className="font-bold">Release</h2>
      <div className="mt-4 space-y-2">
        {dataFilterAndSort.map((item, index) => (
          <CardReleased key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
