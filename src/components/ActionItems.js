import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

function ActionItems () {
  const [description, setDescription] = useState('')
  const { gameId } = useParams()
  const firebase = useFirebase()

  useFirebaseConnect([
    `retrospectives/${gameId}`
  ])

  const actionItems = useSelector(({ firebase: { data } }) => data.retrospectives && data.retrospectives[gameId] && data.retrospectives[gameId].actionItems)

  const handleSubmit = event => {
    const actionItem = {
      description: description,
      done: false
    }

    event.preventDefault()
    firebase.push(`retrospectives/${gameId}/actionItems`, actionItem)
    setDescription('')
  }

  return (
    <div className='d-flex flex-column flex-fill p-5'>
      <h5>Action Items</h5>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className="form-control mb-2"
          value={description}
          placeholder='Write an idea'
          onChange={event => setDescription(event.target.value)}
        />
      </form>
      {!isLoaded(actionItems) ? (
        <div>Loading...</div>
      ) : isEmpty(actionItems) ? (
        <div>Action items Is Empty</div>
      ) : (
        <ol>
          {
            Object.keys(actionItems).map(key => {
              return <li className="action-item" key={key}>{actionItems[key].description}</li>
            })
          }
        </ol>
      )}
    </div>
  )
}

export default ActionItems
