import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
     <div class="table center">
      <div class="monitor-wrapper center">
        <div class="monitor center">
          <p>
            Welcome to Arcadia! Please choose a game you would like to
            play!
          </p>
        </div>
      </div>
    </div>
    <h1 class="flicker-fast">Arcadia</h1>
    <div class="main">
      <div>
        <Link class="neon-button" to={'/guess the number'}>Guess the Number </Link>
      </div>
      <div>
        <Link class="neon-button" >Tic Tac Toe </Link>
      </div>
      <div>
        <Link class="neon-button" to={'/stone paper scissors'}>Rock Paper Scissors </Link>
      </div>
    </div>
    </>
  )
}

export default Home