import { createContext, useEffect } from 'react'
import useSWR from 'swr'
import { toast } from 'react-toastify'

export enum FeatureStatus {
  Active = 'new',
  Released = 'released'
}

export type Feature = {
  createdAt: number
  score: number
  title: string
  status: FeatureStatus
  user: { name: string; sub: string }
}

export interface IGlobalStore {
  data: Feature[]
  loadingData: boolean
  onPublish: (item: Feature) => void
  onRemove: (item: Feature) => void
  onVote: (item: Feature) => void
  onCreate: (title: string, callback?: () => void) => void
}

const GlobalStoreContext = createContext<IGlobalStore>(null)

export function GlobalStoreProvider({ children }) {
  const { data, isValidating, mutate, error, } = useSWR<Feature[]>('api/list', {
    fallbackData: []
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const onPublish = async (item) => {
    fetch('api/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          mutate()
        }
      })
  }

  const onRemove = async (item) => {
    fetch('api/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          mutate()
        }
      })
  }

  const onVote = async (item) => {
    fetch('api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          mutate()
        }
      })
  }

  const onCreate = async (title, callback = () => {}) => {
    fetch('api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.info('Your feature has been added to the list.')
          mutate()
          callback()
        }
      })
  }

  return (
    <GlobalStoreContext.Provider
      value={{
        data,
        loadingData: isValidating,
        onPublish,
        onRemove,
        onVote,
        onCreate
      }}
    >
      {children}
    </GlobalStoreContext.Provider>
  )
}

export default GlobalStoreContext
