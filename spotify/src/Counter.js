import React from 'react'

export default class Counter extends React.Component {
  state = {currentCount: 60}
  
  timer = () => {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if(this.state.currentCount < 1) { 
      clearInterval(this.intervalId);
      this.props.handleEnd()
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  render() {
    return(
      <div>{this.state.currentCount}</div>
    );
  }
}