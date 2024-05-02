import { useEffect, useState } from "react"; 

import './Board.css';
import Data from "../data"; 
import Card from "../Card/Card"; 


function GameBoard() { 
	const [cardsArray, setCardsArray] = useState([]); 
	const [moves, setMoves] = useState(0); 
	const [firstCard, setFirstCard] = useState(null); 
	const [secondCard, setSecondCard] = useState(null); 
	const [stopFlip, setStopFlip] = useState(false); 
	const [won, setWon] = useState(0); 


	function NewGame() { 
		setTimeout(() => { 
			const randomOrderArray = Data.sort(() => 0.5 - Math.random()); 
			setCardsArray(randomOrderArray); 
			setMoves(0); 
			setFirstCard(null); 
			setSecondCard(null); 
			setWon(0); 
		}, 1200); 
	} 


	function handleSelectedCards(item) { 
		console.log(typeof item); 
		if (firstCard !== null && firstCard.id !== item.id) { 
			setSecondCard(item); 
		} else { 
			setFirstCard(item); 
		} 
	} 

    useEffect(() => { 
		NewGame(); 
	}, []); 

	useEffect(() => { 
		if (firstCard && secondCard) { 
			setStopFlip(true); 
			if (firstCard.name === secondCard.name) { 
				setCardsArray((prevArray) => { 
					return prevArray.map((unit) => { 
						if (unit.name === firstCard.name) { 
							return { ...unit, matched: true }; 
						} else { 
							return unit; 
						} 
					}); 
				}); 
				setWon((preVal) => preVal + 1); 
				removeSelection(); 
			} else { 
				setTimeout(() => { 
					removeSelection(); 
				}, 1000); 
			} 
		} 
	}, [firstCard, secondCard]); 


	function removeSelection() { 
		setFirstCard(null); 
		setSecondCard(null); 
		setStopFlip(false); 
		setMoves((prevValue) => prevValue + 1); 
	}

	const elems = cardsArray.map((item) => ( 
		<Card 
			item={item} 
			key={item.id} 
			handleSelectedCards={handleSelectedCards} 
			toggled={ 
				item === firstCard || 
				item === secondCard || 
				item.matched === true
			} 
			stopflip={stopFlip} 
		/> 
	)) 
	return ( 
		<div className="container"> 
			<div className="header"> 
				<h1>Memory Game</h1> 
			</div> 
			<div className="board"> 
				{elems}
			</div> 

			{won !== 6 ? ( 
				<div className="comments">Moves : {moves}</div> 
			) : ( 
				<div className="comments"> 
					???????? You Won in {moves} moves ???????? 
				</div> 
			)} 
			<button className="button" onClick={NewGame}> 
				New Game 
			</button> 
		</div> 
	); 
} 

export default GameBoard; 
