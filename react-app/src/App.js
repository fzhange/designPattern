import './App.css';
// import LogicFlowSample from './components/logic-flow-sample/index';

import React from 'react'
import { Trans } from '@lingui/macro'


export default function Inbox() {
  const messages = [{}, {}]
  const messagesCount = messages.length
  const lastLogin = new Date()
  const markAsRead = () => { alert('Marked as read.') }

  return (
    <div>
      {/* <h1>Message Inbox</h1> */}
      <h1><Trans>Message Inbox</Trans></h1>


      <p>
        <Trans>
          See all <a href="/unread">unread messages</a>{" or "}
          <a onClick={markAsRead}>mark them</a> as read.
        </Trans>
      </p>

      <p>
          {
            messagesCount === 1
              ?  <Trans>There's ${messagesCount} message in your inbox.</Trans>
              :  <Trans>There's ${messagesCount} messages in your inbox.</Trans>  
          }
      </p>

      <footer>
        Last login on {lastLogin.toLocaleDateString()}.
      </footer>
    </div>
  )
}


