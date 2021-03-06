import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

import Storage from '../services/StorageService'
import Card from './Card'

function Column ({ column, rgbColor, iconCss }) {
  console.log("Loading column 3Box");
  const settings = useSelector(state => state.retrospective.settings3box)
  const [game3Box, setGame3Box] = useState([])
  const [gameThread, setGameThread] = useState([])
  // const [cards3Box, setCards3Box] = useState([])
  // const cards = cards3Box

  const [description, setDescription] = useState('')
  const { gameId } = useParams()
  const firebase = useFirebase()

  //useFirebaseConnect([
  //  `retrospectives/${gameId}`
  //])

  // useEffect(() => {
  //   async function loading3BoxData () {
  //     const storage = new Storage();
  //     const retrospective = await storage.getRetrospective(settings.box, gameId);
  //     setGame3Box(retrospective);

  //     let column3Box = await storage.createColumn(settings.account, settings.box, gameId, column.title);
  //     setGameThread(column3Box);
  //     console.log("Column loaded");
  //     console.log(column3Box);
  //     console.log("Column address");
  //     console.log(column3Box['_address']);

  //     let tmpCards = [];
  //     let posts = await storage.getCards(column3Box);
  //     console.log("Posts stored");
  //     console.log(posts);
  //     posts.forEach((item, index) => {
  //       item['message']['id'] = item['postId']
  //       tmpCards = [...tmpCards, item['message']]
  //     });
  //     console.log("Cards in " + gameId);
  //     console.log(tmpCards);
  //     setCards3Box(tmpCards);
  //   }

  //   loading3BoxData();
  // }, []);

  const cards = useSelector(({ firebase: { data } }) => data.retrospectives && data.retrospectives[gameId] && data.retrospectives[gameId].cards)

  const handleSubmit = event => {
    const newCard = {
      columnId: column.id,
      description: description,
      votes: 0
    }

    event.preventDefault();
    // gameThread.post(newCard);
    // let newCards = [...cards3Box, newCard];
    // setCards3Box(newCards);
    firebase.push(`retrospectives/${gameId}/cards`, newCard)
    setDescription('')
  }

  return (
    <div className='d-flex flex-column flex-fill p-2 column'>
      <div
        className='d-flex p-3 rounded-top'
        style={{ background: 'white', borderBottom: `5px solid ${rgbColor}` }}
      >
        <h5 style={{ flex: 1 }}>{column.title}</h5>
        <i
          class={iconCss}
          style={{ flex: 0, fontSize: '24px', color: rgbColor }}
        ></i>
      </div>
      <div className='p-3' style={{ background: 'white' }}>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control mb-2'
            value={description}
            placeholder='Write an idea'
            onChange={event => setDescription(event.target.value)}
            style={{
              border: 'dashed 2px lightgray'
            }}
          />
        </form>
      </div>
      <div className='px-3 pb-3 rounded-bottom' style={{ background: 'white' }}>
        {!isLoaded(cards) ? (
          <div>Loading...</div>
        ) : isEmpty(cards) ? (
          <div>Todos List Is Empty</div>
        ) : (
          Object.keys(cards).map(key => {
            if (cards[key].columnId === column.id) {
              return (
                <Card
                  card={cards[key]}
                  cardId={key}
                  key={key}
                  rgbColor={rgbColor}
                />
              )
            }
            return null
          })
        )}
      </div>
    </div>
  )
}

export default Column