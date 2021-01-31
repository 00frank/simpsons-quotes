import React from 'react'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      q: []
    }
  }
  componentDidMount() {
    fetch('https://simpsons-quotes-api.herokuapp.com/quotes')
      .then(data => data.json())
      .then(
        (q) => {
          this.setState({ isLoaded: true, q })
        },
        (error) => {
          console.log('mostrando el error:',error);
          this.setState({ isLoaded: false, error })
        })
  }
  render() {
    const { error, isLoaded, q } = this.state
    if (error) {
      return <div className="error">Error: {error}</div>
    } else if (!isLoaded) {
      return (
        <div className="loading">
          <Loader />
        </div>);
    } else {
      return (
        <div className="main">
          <div className="boxImg">
            <img src={q[0].image} alt={q[0].character} />
          </div>
          <h1 className="character">{q[0].character}</h1>
          <p className="quote">{q[0].quote}</p>
          <button className="getQuote" onClick={() => window.location.reload()}>Get random quote</button>
        </div>
      )
    }
  }
}

function Loader() {
  return (
    <div className="loader"></div>
  )
}

export default App;
