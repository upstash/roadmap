import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import FeatureList from '../components/feature-list'
import FeatureForm from '../components/feature-form'
import useSWR from 'swr'
import { FEATURE_TYPE } from '../lib/const'

function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const inputNewFeature = useRef()

  const { data, isValidating, mutate } = useSWR('api/list', {
    initialData: { [FEATURE_TYPE.NEW]: [], [FEATURE_TYPE.RELEASED]: [] },
    revalidateOnMount: true,
    revalidateOnFocus: false
  })

  const getToken = (func) => {
    return async (props) => {
      if (!isAuthenticated) {
        toast.error('Please login')
        return false
      }

      const token = await getAccessTokenSilently()

      if (!token) {
        toast.error('User not found')
        return false
      }

      return func(token, props)
    }
  }

  const onPublish = getToken(async (token, item) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }
    fetch('api/publish', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          mutate()
        }
      })
  })

  const onRemove = getToken(async (token, item) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }
    fetch('api/remove', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          mutate()
        }
      })
  })

  const onVote = getToken(async (token, item) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }
    fetch('api/vote', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          mutate()
        }
      })
  })

  const onSubmitNewFeature = getToken(async (token) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: inputNewFeature.current.value })
    }

    fetch('api/create', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.info('Your feature has been added to the list.')
          inputNewFeature.current.value = ''
          mutate()
        }
      })
  })

  return (
    <main>
      <FeatureForm
        onSubmitNewFeature={onSubmitNewFeature}
        inputNewFeature={inputNewFeature}
      />
      <div className="mt-10">
        <FeatureList
          data={data}
          dataLoading={isValidating}
          onVote={onVote}
          onPublish={onPublish}
          onRemove={onRemove}
        />
      </div>
    </main>
  )
}

export default Home
