import Head from 'next/head'
import { toast } from 'react-toastify'
import React, { useState, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import FeatureList from '../components/feature-list'
import FeatureForm from '../components/feature-form'
import Header from '../components/header'
// import FormNotification from '../components/form-notification'

function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const inputNewFeature = useRef()
  // const inputEmail = useRef()
  const [loaded, setLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    fetch('api/list')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result)
          setLoaded(true)
        },
        (error) => {
          setLoaded(true)
        }
      )
  }

  const getToken = (func) => {
    return async (props) => {
      if (!isAuthenticated) {
        toast.error('Login olman gerekli', {
          hideProgressBar: true,
          autoClose: 3000
        })
        return false
      }

      const token = await getAccessTokenSilently()

      if (!token) {
        toast.error('User not found', {
          hideProgressBar: true,
          autoClose: 3000
        })
        return false
      }

      return func(token, props)
    }
  }

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
          toast.error(data.error, { hideProgressBar: true, autoClose: 3000 })
        } else {
          refreshData()
        }
      })
  })

  const onSubmitNewFeature = getToken(async (token, event) => {
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
          toast.error(data.error, { hideProgressBar: true, autoClose: 3000 })
        } else {
          toast.info('Your feature has been added to the list.', {
            hideProgressBar: true,
            autoClose: 3000
          })
          inputNewFeature.current.value = ''
          refreshData()
        }
      })
    event.preventDefault()
  })

  // const handleNewEmail = (event) => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email: inputEmail.current.value })
  //   }
  //   fetch('api/addemail', requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.error) {
  //         toast.error(data.error, { hideProgressBar: true, autoClose: 3000 })
  //       } else {
  //         toast.info('Your email has been added to the list.', {
  //           hideProgressBar: true,
  //           autoClose: 3000
  //         })
  //         inputEmail.current.value = ''
  //         refreshData()
  //       }
  //     })
  //   event.preventDefault()
  // }

  return (
    <>
      <Head>
        <title>Roadmap Voting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <FeatureForm
          onSubmitNewFeature={onSubmitNewFeature}
          inputNewFeature={inputNewFeature}
        />
        <div className="mt-10">
          <FeatureList data={items} loaded={loaded} onVote={onVote} />
        </div>
      </main>

      {/*<FormNotification*/}
      {/*  handleNewEmail={handleNewEmail}*/}
      {/*  inputEmail={inputEmail}*/}
      {/*/>*/}
    </>
  )
}

export default Home
