const API = 'https://jsonplaceholder.typicode.com/todos/1';
const API2 ='https://api.quotable.io/random';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: '',
      isOn:false,
      breaklength:300,
      breakleft:300,
      sessionlength: 1500,
      sessionleft:1500,
      timeleft:1500
    };
    this.breakhandler = this.breakhandler.bind(this);
    this.sessionhandler = this.sessionhandler.bind(this);
    this.reset = this.reset.bind(this);
    this.startstop = this.startstop.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  componentDidMount() {
    
  }
  startstop(){
    let {isOn} =this.state;
    if(!isOn){
      let intervalId = setInterval(this.countDown, 1000);
      this.setState({
        intervalId: intervalId,
        isOn:true
      });
    
      
    }else{
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: undefined,
        isOn:false
      });

    }
    
    
  }
  breakhandler(e){
    const {breaklength,breakleft} = this.state;
    const {id} = e.target;
    switch(id){
      case 'break-decrement':{
        this.setState({
          breaklength: breaklength - 60
        });

        break;
      }
      case 'break-increment':{
        this.setState({
          breaklength: breaklength + 60
        });

        break;
      }
      default:
        break;

    }

    this.setState({
      breakleft:breaklength,
      timeleft: breakleft
    });
  }

  sessionhandler(e){
    const {timeleft,sessionlength} = this.state;
    const {id} = e.target;
    switch(id){
      case 'session-decrement':{
        this.setState({
          sessionlength: sessionlength - 60,
          timeleft: this.state.sessionlength -60
        });

        break;
      }
      case 'session-increment':{
        this.setState({
          sessionlength: sessionlength + 60,
          timeleft: this.state.sessionlength + 60
        });
        break;
      }
    }

  }
  reset(){
    clearInterval(this.state.intervalId);
    this.setState({
      isOn:false,
      intervalId: undefined,
      breaklength:300,
      sessionlength: 1500,
      timeleft:1500
    });

  }

  countDown(){
    this.setState({
      timeleft:this.state.timeleft - 1
    });
    if(this.state.timeleft < 0) { 
      clearInterval(this.state.intervalId);
    }

    console.log(this.state.intervalId);
    console.log('countDown');
  }


  render() {
      const {isOn,breaklength,sessionlength,timeleft} = this.state;
      let mm = Math.floor(timeleft/60)+"";

      if(mm.length<2){
        mm="0"+mm;
      }
      let ss = timeleft%60+"";
      if(ss.length<2){
        ss="0"+ss;
      }
      //console.log(ss);

    return (
      <div id="pomodoro-timer" className="container-sm text-center">
        <h2>Pomodoro timer</h2>
        <div className="row justify-content-md-center text-center">
          <div id="break" className="col col-sm-4">
            <h2 className="text-center" id="break-label">Break Length</h2>
              <a id="break-decrement" 
              className={"btn btn-sm btn-outline-secondary "+(isOn? 'disabled':'')}
              onClick={this.breakhandler} 
              href="#" 
              role="button">-</a>
              <span id="break-length">{breaklength/60}</span>
              <a id="break-increment" 
              className={"btn btn-sm btn-outline-secondary " +(isOn? 'disabled':'')} onClick={this.breakhandler} href="#" role="button">+</a>
          </div>
          <div id="session" className="col col-sm-4">
            <h2 id="session-label">Session Length</h2>
              <a id="session-decrement" className={"btn btn-sm btn-outline-secondary " +(isOn? 'disabled':'')}  onClick={this.sessionhandler} href="#" role="button">-</a>
              <span id="session-length">{sessionlength/60}</span>
              <a id="session-increment" className={"btn btn-sm btn-outline-secondary " +(isOn? 'disabled':'')}  onClick={this.sessionhandler} href="#" role="button">+</a>
          </div>
        </div>
        <div className="row justify-content-md-center text-center">
          <div id="break" className="col col-sm-8">
            <h2 id="timer-label">Session</h2>
            <h1 id="time-left">{`${mm}:${ss}`}</h1>
            <a id="start_stop" className="btn btn-sm btn-outline-secondary" onClick={this.startstop} href="#" role="button">Start/Stop</a>
            <a id="reset" className="btn btn-sm btn-outline-secondary" onClick={this.reset} href="#" role="button">Reset</a>
            
            
          </div>

        </div>

      </div>
    );
  }
}

const domContainer = document.getElementById('app');
ReactDOM.render(<App />, domContainer);
