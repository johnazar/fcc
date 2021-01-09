class DisplayMessages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        messages: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.submitMessage = this.submitMessage.bind(this)
    }
    // Add handleChange() and submitMessage() methods here
    handleChange(event){
       this.setState({
         input: event.target.value,
         messages: this.state.messages
         });
         //console.log(this.state.input);
    }
    submitMessage(event){
      event.preventDefault();
      console.log(this.state.input);
      this.setState({
        input: '',
         messages: [...this.state.messages,this.state.input]
         });
         //let mylist= messages.map(item=> `<li>${item}</li>`);
      //console.log(this.state.messages);
    }
  
    render() {
      return (
        <div>
          <h2>Type in a new Message:</h2>
          { /* Render an input, button, and ul below this line */ }
          <input
          type='text'
          value={this.state.input}
          onChange={this.handleChange}
          />
          <button onClick={this.submitMessage}>Add</button>
          <ul>{this.state.messages.map(item => <li>{item}</li>)}</ul>
  
          { /* Change code above this line */ }
        </div>
      );
    }
  };