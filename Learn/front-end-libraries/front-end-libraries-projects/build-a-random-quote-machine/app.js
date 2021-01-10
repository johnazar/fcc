const API = 'https://jsonplaceholder.typicode.com/todos/1';
const API2 ='https://api.quotable.io/random';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content:'',
      author: ''
    };
    this.updatecontent = this.updatecontent.bind(this);
    this.fetchcontent = this.fetchcontent.bind(this);
  }
  componentDidMount() {
    this.fetchcontent(); 
  }
  fetchcontent(){
    fetch(API2)
      .then(response => response.json())
      .then(response => this.updatecontent(response));
  }
    updatecontent(response) {
      this.setState({
        content:response.content,
        author: response.author
      });
      //console.log(this.state.quote);
    }

  render() {
      const {content, author} = this.state;
    return (
      <div id="quote-box">
          <p id="text">{content}</p>
           <div className="quote-author">
            <span id="author">{author}</span>
        </div>
        <hr/>
        <div>
          <a class="button" id="tweet-quote" title="Tweet this quote!" target="_top" 
          href={'https://twitter.com/intent/tweet?url=https://twitter.com?text=' + content}>
              <i class="fa fa-twitter"></i>Tweet</a>
          <button id="new-quote" onClick={this.fetchcontent}>Get quote</button>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
