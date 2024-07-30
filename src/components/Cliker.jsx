import { useState } from 'react';
import React from 'react';
import '../App.css';

export default function Cliker(){
    //Variables 
    //NP = No Player
    //nuevo y ordenado 
    const [deck, setDeck] = useState([
        { id: 1, value: 1 },{id:2, value:2},{id:3, value:3}, 
        {id:4, value:4},{id:5, value:5},{id:6, value:6}, 
        {id:7, value:7},{id:8, value:8}, {id:9, value:9},  
        {id: 10, value: 10}, {id: 11, value: 10},  
        {id: 12, value: 10}, {id: 13, value: 10}
        ]);
    const [handNP, setHandNP] = useState([]);
    const [handPlayer, setHandPlayer] = useState([]);
    function Card(props){
        return(
            <div className="cards">
                <h1>{props.item.value}</h1>
            </div>
        )
    };
    const handNPMap = handNP.map(item => {
        return(
            <Card 
                key={item.id}
                item={item}
            />
        )
    });
    const handMap = handPlayer.map(item => {
        return(
            <Card 
                key={item.id}
                item={item}
            />
        )
    });
    //IA
    const sumaNP = handNP.reduce((total, item) => total + item.value, 0);
    //You
    const suma = handPlayer.reduce((total, item) => total + item.value, 0);
     //Card
     function moveObjectPlayer(){
        const randomNumber = Math.floor(Math.random() * deck.length);
        const randomObject = deck[randomNumber];
        setHandPlayer([...handPlayer, randomObject]);
        setDeck(deck.filter(obj => obj.id !== randomObject.id));
     };
        //Game
    function moveObject(){
        const randomNumber = Math.floor(Math.random() * deck.length);
        const randomObject = deck[randomNumber];
        setHandNP([...handNP, randomObject]);
        setDeck(deck.filter(obj => obj.id !== randomObject.id));
    };
    //points
    const [points, setPoints] = useState(0);
    //myPoints
    const [myPoints, setMypoints] = useState(100);
    //Bet
    function reset(){
        setDeck([
            { id: 1, value: 1 },{id:2, value:2},{id:3, value:3}, 
            {id:4, value:4},{id:5, value:5},{id:6, value:6}, 
            {id:7, value:7},{id:8, value:8}, {id:9, value:9},  
            {id: 10, value: 10}, {id: 11, value: 10},  
            {id: 12, value: 10}, {id: 13, value: 10}
        ]);
        setHandPlayer([]);
        setHandNP([]);
    }

    function bet() {
        if(handNP.length === 0 || handPlayer.length === 0){}else{
        if (sumaNP <= suma) {
            while (sumaNP <= suma) {
                moveObject();
                const newSuma = handPlayer.reduce((total, item) => total + item.value, 0);
                const newSumaNP = handNP.reduce((total, item) => total + item.value, 0);
                if (newSuma >= 21 || newSuma > newSumaNP) {
                    break;
                }
            }
        } else if (suma < sumaNP && sumaNP < 21) {
            setPoints(0);
            setApuesta([])
            reset();
        } else if (sumaNP > 21) {
            setMypoints(myPoints + points);
            reset();
        }
    }
    }
    // Ficha
    const [apuesta, setApuesta] = useState([]);
    
    const fichasData = [
        {id: 1, valor: 1, src:"https://toppng.com/uploads/preview/6-stripe-composite-poker-chips-green-poker-chips-clipart-115632468765ckiz2lhti.png"},
        {id: 2, valor: 5, src:"https://www.pinpng.com/pngs/m/83-835419_the-design-is-outside-the-printing-area-world.png"},
        {id: 3, valor:25, src:"https://img.favpng.com/3/7/5/ipad-cartoon-png-favpng-xnuF9aD6ZrsTTTCFB7eeXL5LH.jpg"},
        {id: 4, valor:50, src:"https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9zdGF0aWMvaW1hZ2VzL3dlYnNpdGUvMjAyMi0xMi9weDcwMjgzMi1pbWFnZS0wMi1qb2IxNDI3XzEucG5n.png"}
    
    ];
    const fichas = fichasData.map(item => {
        return(
            <Ficha
            key={item.id}
            item={item}
            />
    )
    });
    const apuestaFichas = apuesta.map(item => {
        return(
            <Apuesta 
                key={item.id}
                item={item}
            />
        )
    });    
    function Ficha(props){
        const newId = apuesta.length + 1
        const newFicha = {id: newId, src: props.item.src}
        function pluss(){
            setPoints(points + props.item.valor)
            setMypoints(myPoints - props.item.valor)
        }
        function dobleFunction(){
            if (myPoints >= props.item.valor){
            pluss();
            setApuesta([...apuesta, newFicha])
            } 
        }
        return(
            <div className="ficha-div" onClick={dobleFunction}>
                <img src={props.item.src} className="ficha" alt="ficha" />
                <h1 className="ficha-valor">{props.item.valor}</h1>
            </div>
        )
    }
    function Apuesta(props){
        const number = props.item.id*38 + 100
        const numberPx = number +'px'
        const style={
            borderRadius: '50%',
            height: '76px',
            width: '76px',
            position: 'absolute',
            left: numberPx

        }
        
        return(
            <img style={style} src={props.item.src} />
            
        )
    }   
    if (suma > 21){
        setpoints(0)
        setApuesta([])
        reset()
    }
    function retirar(){
        setApuesta([])
        setMyPoints(myPoints + points)
        setPoints(0)
        
    }
    //Estructura
   return(
        <div className="mesa">
            <div className="contenedor">
                
                <h1 className="ia">IA:{sumaNP}</h1>
                <h1 className="you">You:{suma}</h1>
                <button onClick={moveObject}>Game</button>
                <button onClick={moveObjectPlayer}>Card</button>
                <button onClick={bet}>Bet</button>
                <h1 className="points">Points: {points}</h1>
                <h1 className="myPoints">My Points:{myPoints}</h1>
            </div>
            <div className="contenedor">
                <h6 className="barajaNP">{handNPMap}</h6>
                <div className="baraja">{fichas}</div>
            </div>
            <div className="baraja">{handMap}</div>
            <div className="baraja" onClick={retirar}>{apuestaFichas}</div>
        </div>
    ) 
}
