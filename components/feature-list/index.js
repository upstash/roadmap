import FeatureCard, { FeatureCardSkeleton } from '../feature-card'

export default function FeatureList({ loaded, data, onVote }) {
  return loaded ? (
    <div className="space-y-6">
      {data.map((item, index) => (
        <FeatureCard key={index} item={item} onVote={onVote} />
      ))}
    </div>
  ) : (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((_, index) => (
        <FeatureCardSkeleton key={index} />
      ))}
    </div>
  )
}
