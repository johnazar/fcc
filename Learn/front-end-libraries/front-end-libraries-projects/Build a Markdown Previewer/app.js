class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      text:placeholder
    }
      this.handleChange = this.handleChange.bind(this);
    }
  handleChange(e){
    this.setState({
      text: e.target.value
    })
  }
  render(){
    const {text} = this.state;

    const markdown = marked(text);
    return(
      <div className="bg-secondary">
        <h1 className="text-center">Convertor</h1>
        <div className="row">
          <div className="col-6">
            <h5>Editor</h5>
            <textarea id="editor" className="form control w-100 bg-white" value={text} onChange={this.handleChange}/>
          </div>
          <div className="col-6" >
            <h5>Previewer</h5>
            <div id="preview" className="bg-white" dangerouslySetInnerHTML={{__html: markdown}}></div>
          </div>
        </div>
      </div>);
  }
}


const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;



ReactDOM.render(<App />, document.getElementById('app'));