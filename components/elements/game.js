import { useState, useRef, useEffect } from "react";

export default function Game() {
  const [totalFlips, setTotalFlips] = useState(0)
  const [flippedCards, setFlippedCards] = useState(0)
  const [games, setGames] = useState([])
  const [won, setWon] = useState(false)
  const board = useRef()

  const bitcoin = (
    <svg height="64" width="64" version="1.1">
<g transform="translate(0.00630876,-0.00301984)">
<path fill="#f7931a" d="m63.033,39.744c-4.274,17.143-21.637,27.576-38.782,23.301-17.138-4.274-27.571-21.638-23.295-38.78,4.272-17.145,21.635-27.579,38.775-23.305,17.144,4.274,27.576,21.64,23.302,38.784z"/>
<path fill="#FFF" d="m46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768-3.511-0.875-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653-3.509-0.875-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018-4.842-1.209-0.934,3.75s2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834,0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019,4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834,3.507,0.875,1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745,3.511,0.875,1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739,1.527-4.36-0.076-6.875-3.226-8.515,2.294-0.529,4.022-2.038,4.483-5.155zm-8.022,11.249c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729c2.38,0.594,10.012,1.77,8.878,6.317zm1.086-11.312c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.01c1.982,0.494,8.365,1.416,7.334,5.553z"/>
</g>
</svg>
  )
  const twep = (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="56" viewBox="0 0 44 56" fill="none"><path d="M14.4662 25.402L11.1579 22.0799L21.9308 11.26L32.7109 22.0835L29.4026 25.4074L21.9308 17.9043L14.4662 25.402ZM43.6855 33.9503L22.4397 55.2851C22.3732 55.3532 22.2939 55.4072 22.2063 55.4441C22.1188 55.481 22.0249 55.5 21.9299 55.5C21.835 55.5 21.7411 55.481 21.6535 55.4441C21.566 55.4072 21.4867 55.3532 21.4202 55.2851L0.174341 33.9503C0.0627006 33.838 0 33.6858 0 33.5272C0 33.3685 0.0627006 33.2164 0.174341 33.1041L5.64471 27.6216L0.567124 22.5227C0.499105 22.4559 0.445057 22.3762 0.408159 22.2881C0.37126 22.2 0.352257 22.1055 0.352257 22.01C0.352257 21.9144 0.37126 21.8199 0.408159 21.7318C0.445057 21.6437 0.499105 21.564 0.567124 21.4972L21.1328 0.838243C21.2376 0.731129 21.3627 0.646058 21.5006 0.587984C21.6385 0.529911 21.7866 0.5 21.9362 0.5C22.0858 0.5 22.2338 0.529911 22.3718 0.587984C22.5097 0.646058 22.6347 0.731129 22.7396 0.838243L43.3909 21.585C43.4465 21.6407 43.4906 21.7068 43.5206 21.7795C43.5507 21.8523 43.5662 21.9303 43.5662 22.0091C43.5662 22.0878 43.5507 22.1658 43.5206 22.2386C43.4906 22.3113 43.4465 22.3774 43.3909 22.4331L38.2241 27.6216L43.6855 33.1059C43.7966 33.2181 43.859 33.3699 43.859 33.5281C43.859 33.6863 43.7966 33.8381 43.6855 33.9503ZM8.94585 24.2976L10.2867 25.6494L21.4184 36.826C21.4849 36.8941 21.5642 36.9481 21.6517 36.985C21.7393 37.0219 21.8332 37.0409 21.9281 37.0409C22.0231 37.0409 22.117 37.0219 22.2046 36.985C22.2921 36.9481 22.3714 36.8941 22.4379 36.826L36.6833 22.5209C36.7513 22.4541 36.8054 22.3744 36.8423 22.2863C36.8792 22.1983 36.8982 22.1037 36.8982 22.0082C36.8982 21.9126 36.8792 21.8181 36.8423 21.73C36.8054 21.642 36.7513 21.5622 36.6833 21.4954L22.4379 7.19208C22.3714 7.12405 22.2921 7.07002 22.2046 7.03313C22.117 6.99624 22.0231 6.97723 21.9281 6.97723C21.8332 6.97723 21.7393 6.99624 21.6517 7.03313C21.5642 7.07002 21.4849 7.12405 21.4184 7.19208L7.17298 21.4954C7.10496 21.5622 7.05091 21.642 7.01402 21.73C6.97712 21.8181 6.95811 21.9126 6.95811 22.0082C6.95811 22.1037 6.97712 22.1983 7.01402 22.2863C7.05091 22.3744 7.10496 22.4541 7.17298 22.5209L8.94585 24.2976ZM36.9761 33.0144L34.9247 30.9437L22.3629 43.5582C22.3075 43.6139 22.2417 43.6582 22.1692 43.6884C22.0968 43.7186 22.0191 43.7341 21.9406 43.7341C21.8622 43.7341 21.7845 43.7186 21.7121 43.6884C21.6396 43.6582 21.5738 43.6139 21.5184 43.5582L8.95477 30.9437L6.89268 33.0144C6.82466 33.0812 6.77061 33.161 6.73371 33.249C6.69681 33.3371 6.67781 33.4317 6.67781 33.5272C6.67781 33.6227 6.69681 33.7173 6.73371 33.8053C6.77061 33.8934 6.82466 33.9731 6.89268 34.0399L21.5184 48.7269C21.5738 48.7827 21.6396 48.827 21.7121 48.8572C21.7845 48.8874 21.8622 48.9029 21.9406 48.9029C22.0191 48.9029 22.0968 48.8874 22.1692 48.8572C22.2417 48.827 22.3075 48.7827 22.3629 48.7269L36.9779 34.0399C37.0459 33.9731 37.1 33.8934 37.1369 33.8053C37.1738 33.7173 37.1928 33.6227 37.1928 33.5272C37.1928 33.4317 37.1738 33.3371 37.1369 33.249C37.1 33.161 37.0459 33.0812 36.9779 33.0144H36.9761ZM16.6747 27.6216L19.9848 30.9437L21.9308 28.9877L23.884 30.9491L27.1941 27.6216L21.9308 22.3362L16.6747 27.6216Z" fill="url(#paint0_linear_285_483)"/><defs><linearGradient id="paint0_linear_285_483" x1="21.9295" y1="-8.00035" x2="21.9295" y2="63.714" gradientUnits="userSpaceOnUse"><stop stopColor="#0338D1"/><stop offset="0.354167" stopColor="#1CFCFC"/><stop offset="0.885417" stopColor="#0338D1"/></linearGradient></defs></svg>
  )
  const bnb = (
    <svg xmlns="http://www.w3.org/2000/svg" height="88" width="88" fill="none" viewBox="-14.4 -24 124.8 144"><circle fill="#0b0e11" r="48" cy="48" cx="48"/><path fill="#f0b90b" d="M34.5355 42.4676l13.4647-13.4644 13.4715 13.4715 7.8346-7.835-21.3061-21.3064-21.2995 21.2995zm-13.3672-2.303l7.8347 7.8347-7.8351 7.8351-7.8346-7.8347zm13.3672 13.3676l13.4647 13.464 13.4712-13.4708 7.8391 7.8308-.0042.004-21.3061 21.3064-21.2998-21.2994-.0109-.0108zm48.1319-5.5315l-7.8347 7.8346-7.8346-7.8346 7.8346-7.8347z"/><path fill="#f0b90b" d="M55.9466 47.996h.0036l-7.9503-7.9504-7.9542 7.9542.0108.0111 7.9434 7.9434 7.954-7.9545z"/></svg>
  )

  const eth = (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#627EEA"/><g fill="#FFF" fill-rule="nonzero"><path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/><path d="M16.498 4L9 16.22l7.498-3.35z"/><path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/><path d="M16.498 27.995v-6.028L9 17.616z"/><path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg>
  )

  const doge = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="44" height="44"><g fill="#c2a633"><path d="M1024 659H881.12v281.69h224.79v117.94H881.12v281.67H1031c38.51 0 316.16 4.35 315.73-327.72S1077.44 659 1024 659z"/><path d="M1000 0C447.71 0 0 447.71 0 1000s447.71 1000 1000 1000 1000-447.71 1000-1000S1552.29 0 1000 0zm39.29 1540.1H677.14v-481.46H549.48V940.7h127.65V459.21h310.82c73.53 0 560.56-15.27 560.56 549.48 0 574.09-509.21 531.41-509.21 531.41z"/></g></svg>
  )
  const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const shuffle = array => {
  const clonedArray = [...array]

  for (let index = clonedArray.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      const original = clonedArray[index]

      clonedArray[index] = clonedArray[randomIndex]
      clonedArray[randomIndex] = original
  }

  return clonedArray
}

  const emojis = [bitcoin, twep, eth, bnb, doge, '🍇', '🍉', '🍌', '🥭', '🍍']
  const picks = pickRandom(emojis, 16 / 2) 
  const items = shuffle([...picks, ...picks])

  useEffect(() => {
    const f = (() => {
        const x = []
        items.map(item => {x.push(item);}).join('')
        return x
      })
      setGames(f())
  }, [])

const flipBackCards = () => {
  document.querySelectorAll('.card-game:not(.matched)').forEach(card => {
      card.classList.remove('flipped')
  })

  setFlippedCards(0)
}
const [show, setShow] = useState([99,99])
const [selected, setSelected] = useState([99,99])
const [showed, setShowed] = useState([])

const flipCard = (e,i, result) => {
    if(show[0] == i) return
    if(showed.includes(i)) return
    const child = document.getElementById(i);
    child.classList.add('flipped'); 
  setFlippedCards(flippedCards+1)
  if (flippedCards < 2) {
      setTotalFlips(totalFlips+1)
  }
  if(flippedCards == 0){
      show[0] = i
      selected[0] = result.props.children
}else{
      show[1] = i
      selected[1] = result.props.children
} 
if (flippedCards == 1) {
    const flippedCards = document.querySelectorAll('.flipped:not(.matched)')
    if (selected[0] === selected[1]) {
      flippedCards[0].classList.add('matched')
      flippedCards[1].classList.add('matched')
      showed.push(show[0])
      showed.push(show[1])
    }
    
      setTimeout(() => {
        show[0] = 99
        show[1] = 99
        selected[0] = 99
        selected[1] = 99
          flipBackCards()
      }, 1000)
  }

  if (!document.querySelectorAll('.card-game:not(.flipped)').length) {
      setTimeout(() => {
          board.current.classList.add('flipped')
          setWon(true)

      }, 1000)
  }
}

return (
    <div className="game">
    <div className="controls">
        <div className="stats">
            <div className="moves">{totalFlips} moves</div>
        </div>
    </div>
    <div className="board-container">
        <div className="board" style={{gridTemplateColumns: 'repeat(4, auto)'}} ref={board}>
          {games.map((item, i) => {
                const result = <span>{item}</span>
            return (
                <div id={i}  className="card-game" onClick={(e) => flipCard(e,i, result)} key={i}>
                <div className="card-front">
                    {/* {result} */}
                </div>
                <div className="card-back">{show[0] == i || show[1] == i ? result : showed.includes(i) ? result : ""}</div>
            </div>
              )
          })}
   
</div>
{won ? (
<span className="win-text text-center">
          You won!<br />
          with <span className="highlight">{totalFlips}</span> moves
      </span>

) : ""}
    </div>
</div>
)
}