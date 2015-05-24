# formative - react forms that work for you
because LMHTSFY (let me handle that state for you) was too hard to pronounce.

Sometimes you just want state to take care of itself.

### Simple Example
```js
import {Form} from 'formative'

let NoteEditor = React.createClass({
  handleSubmit(data) {
    console.log(data)
  },
  render() {
    return <Form
        onSubmit={this.handleSubmit}
        initialData={{text: '', name: ''}}>
      <input name="name" placeholder="Enter your name"/>
      <textarea name="text"/>
      <button type="submit">Save Note</button>
    </Form>
  }
})
```

Compare that to the following (which we've all done way to often):

```js
let NoteEditor = React.createClass({
  getInitialState() {
    return {text: '', name: ''}
  },
  handleNameChange(e) {
    this.setState({name: e.target.value})
  },
  handleTextChange(e) {
    this.setState({text: e.target.value})
  },
  handleSubmit() {
    console.log(this.state)
  },
  render() {
    return <div>
      <input value={this.state.name} onChange={this.handleNameChange} placeholder="Enter your name"/>
      <textarea value={this.state.text} onChange={this.handleTextChange}/>
      <button onClick={this.handleSubmit}>Save Note</button>
    </div>
  }
})
```

As forms get more complicated, you'll be even more grateful that `formative` takes
care of the state.

