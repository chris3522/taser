import React from 'react'
import ReactDOM from 'react-dom'
import 'skeleton-css/css/skeleton.css'
import { App } from "components"
import * as serviceWorker from './serviceWorker'
import { SWRConfig } from 'swr'
const options = {
  revalidateOnFocus: false,
  revalidateOnMount:true,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0
}

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={options}>
          <App />
    </SWRConfig>
  </React.StrictMode>
,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
