import { useAuth0 } from '@auth0/auth0-react'

export default function FeatureForm({ onSubmitNewFeature, inputNewFeature }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitNewFeature()
  }

  return (
    <form className="flex items-center space-x-2" onSubmit={onSubmit}>
      <input
        className="input"
        type="text"
        ref={inputNewFeature}
        placeholder="Enter a new feature request?"
      />

      {!isAuthenticated && (
        <button
          className="button flex-shrink-0"
          type="button"
          onClick={() => loginWithRedirect()}
        >
          Login to Enter
        </button>
      )}

      {/*isAuthenticated && (
        <button className="button" type="button" onClick={() => logout()}>
          Logout
        </button>
      )*/}
    </form>
  )
}
