const SessionON = 'Session';
const BreakON ='Break';
const audiouri = 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: '',  // the counter
      isOn:false, // Start stop counter , disable all buttons
      typeON:SessionON, // what is running
      breaklength:300,  // break length
      breakleft:300,  // break left
      sessionlength: 1500,  //
      sessionleft:1500, //
      timeleft:1500 // for display
    };
    this.breakhandler = this.breakhandler.bind(this);
    this.sessionhandler = this.sessionhandler.bind(this);
    this.reset = this.reset.bind(this);
    this.startstop = this.startstop.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  componentDidMount() {
    
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
    console.table(this.state);
    
    
  }
  startstop(){
    let {isOn} =this.state;
    if(!isOn){
      let intervalId = setInterval(this.countDown, 1000); // run a counter on 1 sec interval 
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
    
    

    const {id} = e.target;

    console.table(this.state);
    
    switch(id){
      case 'break-decrement':{
        let Bmin= Math.max(parseInt(this.state.breaklength - 60), 60);
        this.setState({
          breaklength: Bmin,
          timeleft: Bmin
        });
        break;
      }
      case 'break-increment':{
        let Bmax= Math.min(parseInt(this.state.breaklength + 60),3600);
        this.setState({
          breaklength: Bmax,
          timeleft: Bmax
        });

        break;
      }
      default:
        break;
    }
    
  }

  sessionhandler(e){
    const {id} = e.target;
    switch(id){
      case 'session-decrement':{
        let Smin= Math.max(parseInt(this.state.sessionlength - 60), 60);
        this.setState({
          sessionlength: Smin,
          timeleft: Smin
        });

        break;
      }
      case 'session-increment':{
        let Smax= Math.min(parseInt(this.state.sessionlength + 60),3600);
        this.setState({
          sessionlength: Smax,
          timeleft: Smax
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
      typeON:SessionON,
      breaklength:300,
      sessionlength:1500,
      timeleft:1500
    });
    const audio = document.getElementById('beep');
    if(audio){
      audio.pause();
      audio.currentTime = 0; // rewind to start
    }else{
      return;
    }

  }

  countDown(){
    const {typeON} = this.state;
    const audio = document.getElementById('beep');

    this.setState({
      timeleft:this.state.timeleft - 1
    });
    if(this.state.timeleft < 0 ) {
      if(audio){
        audio.currentTime = 0; // rewind to start
      audio.play();
      }else{
        return;
      }
      switch (typeON) {
        case SessionON:
          this.setState({
            typeON:BreakON,
            timeleft:this.state.breaklength
          });
          
          break;
        
        case BreakON:
          this.setState({
            typeON:SessionON,
            timeleft:this.state.sessionlength
          });
          
          break;
        
        default:
          
      }
      //clearInterval(this.state.intervalId);
    }

    console.table(this.state);
    
  }


  render() {
      const {isOn,breaklength,sessionlength,timeleft,typeON} = this.state;
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
            <h2 id="timer-label">{typeON}</h2>
            <h1 id="time-left">{`${mm}:${ss}`}</h1>
            <a id="start_stop" className="btn btn-sm btn-outline-secondary" onClick={this.startstop} href="#" role="button">Start/Stop</a>
            <a id="reset" className="btn btn-sm btn-outline-secondary" onClick={this.reset} href="#" role="button">Reset</a>
            
            
          </div>

        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />

      </div>
    );
  }
}

const domContainer = document.getElementById('app');
ReactDOM.render(<App />, domContainer);
