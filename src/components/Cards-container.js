import React, {useState} from "react";
import Card from "./Card";

function CardsContainer (props) {

    const {id, title, assignmentCards, handleDelete} = props
    const [cards, setCards] = useState(assignmentCards) 
    const [header, setHeader] = useState(title)
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => setHeader(event.target.value)

    const handleNewCard = (event) => {
        const cardscontainerId = event.target.parentNode.getAttribute("id")
        fetch("http://ec2-54-207-162-78.sa-east-1.compute.amazonaws.com:3001/api/card", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cardscontainerId: cardscontainerId}),
        })
        .then((resp) => resp.json())
        .then(data => {
            setCards(data[0].cards)
        })
        .catch((error) => {
            console.error('Error:', error)
          })

    }

    const handleDeleteCard = (event) => {
        const cardscontainerId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id")
        const cardId = event.target.parentNode.parentNode.getAttribute("id")
        console.log(cardscontainerId)
        fetch(`http://ec2-54-207-162-78.sa-east-1.compute.amazonaws.com:3001/api/card/${cardscontainerId}/${cardId}`, {
            method: 'DELETE'
        })
        .then((resp) => resp.json())
        .then(data => {
            setCards(data[0].cards)
        })
        .catch((error) => {
            console.error('Error:', error)
          })
    }

    return (
        <div className="container" id={id}>
            <div className="container-header">
                <form onSubmit={handleSubmit} id="header-form">
                    <input onChange={handleChange} value={header} id="container-header" type="text" name="container-header"></input>
                </form>
                <button type="button" onClick={handleDelete} className="delete-button">X</button>  
            </div>    
            <div className="container-content">
                {
                    cards.map(card => <>
                        <Card 
                            key={card._id} 
                            id={card._id}
                            cardAssignment={card.assignment}
                            cardPriority={card.priority}
                            cardStatus={card.status}
                            handleDelete={handleDeleteCard}
                        />
                    </>)
                } 
            </div>
            <button type="button" onClick={handleNewCard} className="container-footer-button"><span className="plus-sign">+</span>Add new card</button>
        </div>
    )
}
export default CardsContainer