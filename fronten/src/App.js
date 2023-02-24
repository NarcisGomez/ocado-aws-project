import React from 'react';
import './App.css';
import { Button, Typography, TextField, CircularProgress } from '@mui/material'
import { useState } from 'react';
import { getProductQuery } from './queries/graphqlQueries';
import { useLazyQuery } from '@apollo/client'

function App() {

  const [productInput, setProductInput] = useState()
  const [fetch, setFetch] = useState(false)
  const [response, setResponse] = useState('')
  const [getProduct] = useLazyQuery(getProductQuery)

  const handleFetch = async () => {
    try {
      setFetch(true)
      const { data } = await getProduct({ variables: { name: productInput } })
      setFetch(false)
      setResponse(data.getProduct)
    } catch (err) {
      console.log('fetch error:', err)
    }
  }

  return (
    <div className="App-header">
      <header>
        <title>Ocado AWS</title>
        <link rel="icon" href="/favicon.ico" />
      </header>

      <main>
        <h1 className="App-link">
          BENTO BOX AWS SAMPLE
        </h1>

        <div className="App-link">
          <a href="https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html" className="App-link">
            <h3>AWS SDK Docs &rarr;</h3>
          </a>
          <a href="https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html" className="App-link">
            <h3>AWS CDK Docs &rarr;</h3>
          </a>
        </div>
        {fetch ? <CircularProgress /> :
          <div>
            <Typography>Fetch your product</Typography>
            <TextField disabled={fetch} value={productInput} onChange={(event) => setProductInput(event.target.value)} />
            <Button onClick={handleFetch}>Fetch</Button>
            <Typography>{response || ''}</Typography>
          </div>
        }
      </main>
    </div>
  )
}

export default App;
