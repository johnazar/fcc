const API = 'https://jsonplaceholder.typicode.com/todos/1';
const API2 ='https://api.quotable.io/random';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breaklength:5,
      sessionlength: 25,
      timeleft:1500
    };
    //this.updatecontent = this.updatecontent.bind(this);
  }
  componentDidMount() {
  }

/*     updatecontent(response) {
      this.setState({
        content:response.content,
        author: response.author
      });
      //console.log(this.state.quote);
    } */
  render() {
      const {breaklength, sessionlength,timeleft} = this.state;
    return (
      <div id="pomodoro-timer" class="container-sm text-center">
        <h2>Pomodoro timer</h2>
        <div class="row justify-content-md-center text-center">
          <div id="break" class="col col-sm-4">
            <h2 class="text-center" id="break-label">Break Length</h2>
              <a id="break-decrement" class="btn btn-sm btn-outline-secondary" href="#" role="button">-</a>
              <span id="break-length"> {breaklength} </span>
              <a id="break-increment" class="btn btn-sm btn-outline-secondary" href="#" role="button">+</a>
          </div>
          <div id="session" class="col col-sm-4">
            <h2 id="session-label">Session Length</h2>
              <a id="session-decrement" class="btn btn-sm btn-outline-secondary" href="#" role="button">-</a>
              <span id="session-length"> {sessionlength} </span>
              <a id="session-increment" class="btn btn-sm btn-outline-secondary" href="#" role="button">+</a>
          </div>
        </div>
        <div class="row justify-content-md-center text-center">
          <div id="break" class="col col-sm-8">
            <h2 id="timer-label">Session</h2>
            <h1 id="time-left">{timeleft}</h1>
            
          </div>

        </div>

      </div>
    );
  }
}

const domContainer = document.getElementById('app');
ReactDOM.render(<App />, domContainer);
