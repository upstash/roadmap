export default function FeatureNewSkeletonCard() {
  return (
    <article className="flex items-center space-x-4 text-gray-100">
      <div className="flex flex-col items-center bg-gray-100 h-12 w-10 rounded" />
      <div>
        <h3 className="text-lg font-bold">
          <span className="bg-gray-100 rounded">
            New awesome feature request please
          </span>
        </h3>
        <div className="mt-1 flex items-center space-x-2 leading-4">
          <span className="bg-gray-100 rounded">Adem ilter</span>
          <span className="bg-gray-100 rounded">23 minutes ago</span>
        </div>
      </div>
    </article>
  )
}
