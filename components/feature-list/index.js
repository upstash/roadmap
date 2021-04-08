import FeatureCardNew from '../feature-card/new'
import FeatureCardSkeleton from '../feature-card/skeleton'
import FeatureCardReleased from '../feature-card/released'
import { FEATURE_TYPE } from '../../lib/const'

export default function FeatureList({ dataLoading, data, onVote, onPublish }) {
  const NEW_DATA = data[FEATURE_TYPE.NEW]
  const RELEASED_DATA = data[FEATURE_TYPE.RELEASED]

  if (dataLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((_, index) => (
          <FeatureCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {NEW_DATA.length > 0 ? (
          NEW_DATA.map((item, index) => (
            <FeatureCardNew
              key={index}
              item={item}
              onVote={onVote}
              onPublish={onPublish}
            />
          ))
        ) : (
          <div className="text-center text-gray-400">
            <p>Empty state 👻</p>
          </div>
        )}
      </div>

      {/* RELEASED FEATURE LIST */}

      {RELEASED_DATA.length > 0 && (
        <div className="mt-10">
          <h2 className="font-bold">Released</h2>
          <div className="mt-4 space-y-2">
            {RELEASED_DATA.map((item, index) => (
              <FeatureCardReleased key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
