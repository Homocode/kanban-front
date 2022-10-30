import React, {  useState } from 'react';
import './App.css';
import CardsContainer from './components/Cards-container';

function App({globalState, userInfo}) {
  const userName = userInfo.name
  const [cardHolders, setCardsContainers] = useState(globalState)

  const handleChange = () => {
    fetch('http://ec2-54-207-162-78.sa-east-1.compute.amazonaws.com:3001/api/cards-container', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
    .then((resp) => resp.json())
    .then((data) => {
    setCardsContainers(data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  const handleDeleteContainer = (event) => {
    const cardscontainerId = event.target.parentNode.parentNode.getAttribute("id")
    fetch(`http://ec2-54-207-162-78.sa-east-1.compute.amazonaws.com:3001/api/cards-container/${cardscontainerId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    })
    .then((resp) => resp.json())
    .then(data => {
        setCardsContainers(data)
    })
    .catch((error) => {
        console.error('Error:', error)
      })
}

  return (
    <div className="App">
      <header>
        <h1 id="header-title">Kanban Board</h1>
        <p>{userName.charAt().toUpperCase() + userName.slice(1)} Kanban Board</p>
      </header>
      <main>
          <button onClick={handleChange} id='add-container'><span className='plus-sign'>+</span>Add</button>
        <section id='even-containers'>
          {
            cardHolders.map(cardHolder => <>
              <CardsContainer 
                key={cardHolder._id} 
                id={cardHolder._id} 
                title={cardHolder.title}
                assignmentCards={cardHolder.cards}
                userInfo={userInfo}
                handleDelete={handleDeleteContainer}
              />
            </>)
          }
        </section>      
      </main>
    </div>
  );
}

export default App;