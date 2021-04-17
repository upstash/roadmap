import { useAuth0 } from '@auth0/auth0-react'

export default function FeatureForm({ onSubmitNewFeature, inputNewFeature }) {
  const {
    user,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0()

  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitNewFeature()
  }

  if (isLoading) return null

  return isAuthenticated ? (
    <form className="flex items-center space-x-4" onSubmit={onSubmit}>
      <img src={user.picture} alt={user.name} width={40} className="rounded" />
      <input
        className="input"
        type="text"
        ref={inputNewFeature}
        placeholder="Enter a new feature request?"
      />
      {/*isAuthenticated && (
        <button className="button" type="button" onClick={() => logout()}>
          Logout
        </button>
      )*/}
    </form>
  ) : (
    <div className="flex flex-col items-center space-y-2 bg-green-50 text-green-800 px-3 py-6 rounded">
      <p>Please login to request or vote for a new feature</p>
      <button
        className="button bg-green-700"
        type="button"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </div>
  )
}
