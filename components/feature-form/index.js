import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

export default function FeatureForm({ onSubmitNewFeature, inputNewFeature }) {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return isAuthenticated ? (
    <form onSubmit={onSubmitNewFeature}>
      {/*<button type="button" onClick={() => logout()}>*/}
      {/*  Logout*/}
      {/*</button>*/}

      <input
        className="input"
        type="text"
        ref={inputNewFeature}
        placeholder="Enter a new feature request?"
      />
    </form>
  ) : (
    <div className="bg-blue-50 p-6 rounded">
      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  )
}
