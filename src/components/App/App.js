import React from "react";
import "./App.scss";
import Gallery from "../Gallery";

class App extends React.Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      tag: "art",
      numberOfImages: 100,
    };
    this.debounce.bind(this)
  }
  moreImages() {
    const addImage = this.state.numberOfImages + 100;
    this.setState({ numberOfImages: addImage });
  }
  
  componentDidMount() {
 
  }

  debounce(func,timeout=300){
    let timer;
    return(...args)=>{
      clearTimeout(timer);
      
      timer = setTimeout(() => {func.apply(this,args)}, timeout);
    }
  }
  
  render() {
    return (
      <div className="app-root" onScroll={this.handleScroll}>
        <div className="app-header">
          <h2>Flickr Gallery</h2>

          <input
            className="app-input"
            onChange={(event)=>this.setState({ tag: event.target.value })}
            value={this.state.tag}
          />
        </div>
        <Gallery
          tag={this.state.tag}
        />
      </div>
    );
  }
}

export default App;
