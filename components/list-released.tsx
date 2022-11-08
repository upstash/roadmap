import { useContext } from 'react'
import { FEATURE_TYPE } from 'lib/const'
import CardReleased from './card-released'
import GlobalStoreContext, { Feature } from '../store'

export default function ListReleased() {
  const { data } = useContext(GlobalStoreContext)

  const dataFilterAndSort: Feature[] = data
    .filter((item) => item.status === FEATURE_TYPE.RELEASE)
    .sort((a, b) => b.createdAt - a.createdAt)

  if (data.length === 0) return null

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
