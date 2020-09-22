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

function Column ({ column }) {
  console.log("Loading column 3Box");
  const settings = useSelector(state => state.retrospective.settings3box)
  const [game3Box, setGame3Box] = useState([])
  const [gameThread, setGameThread] = useState([])
  const [cards3Box, setCards3Box] = useState([])

  const [description, setDescription] = useState('')
  const { gameId } = useParams()
  const firebase = useFirebase()

  //useFirebaseConnect([
  //  `retrospectives/${gameId}`
  //])

  useEffect(() => {
    async function loading3BoxData () {
      const storage = new Storage();
      const retrospective = await storage.getRetrospective(settings.box, gameId);
      setGame3Box(retrospective);

      let column3Box = await storage.createColumn(settings.account, settings.box, gameId, column.title);
      setGameThread(column3Box);
      console.log("Column loaded");
      console.log(column3Box);
      console.log("Column address");
      console.log(column3Box['_address']);

      let tmpCards = [];
      let posts = await storage.getCards(column3Box);
      console.log("Posts stored");
      console.log(posts);
      posts.forEach((item, index) => {
        item['message']['id'] = item['postId']
        tmpCards = [...tmpCards, item['message']]
      });
      console.log("Cards in " + gameId);
      console.log(tmpCards);
      setCards3Box(tmpCards);
    }

    loading3BoxData();
  }, []);

  //const cards = useSelector(({ firebase: { data } }) => data.retrospectives && data.retrospectives[gameId] && data.retrospectives[gameId].cards)

  const handleSubmit = event => {
    const newCard = {
      columnId: column.id,
      description: description,
      votes: 0
    }

    event.preventDefault();
    gameThread.post(newCard);
    let newCards = [...cards3Box, newCard];
    setCards3Box(newCards);
    //firebase.push(`retrospectives/${gameId}/cards`, newCard)
    setDescription('')
  }

  return (
    <div className='d-flex flex-column flex-fill p-5 column'>
      <h5>{column.title}</h5>
      <span>{`${gameThread['_address']}`.substr(10,20)}....{`${gameThread['_address']}`.substr(`${gameThread['_address']}`.length - 5)}</span>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className="form-control mb-2"
          value={description}
          placeholder='Write an idea'
          onChange={event => setDescription(event.target.value)}
        />
      </form>
      {!isLoaded(cards3Box) ? (
        <div>Loading...</div>
      ) : isEmpty(cards3Box) ? (
        <div>Todos List Is Empty</div>
      ) : (
        Object.keys(cards3Box).map(key => {
          if (cards3Box[key].columnId === column.id ) {
            return <Card card={cards3Box[key]} cardId={key} columnTitle={column.title} key={key} />
          }
          return null
        })
      )}
    </div>
  )
}

export default Column