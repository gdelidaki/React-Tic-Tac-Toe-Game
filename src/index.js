import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

function Square(props) {
  return (
    <button
      style={{ background: props.nextColor }}
      className="square"
      onClick={props.onClick}
    >
      {props.nextValue}
    </button>
  );
}
// ========================================
// ========================================
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Array(9).fill(null),
      colors: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i) {
    const values = this.state.values.slice();
    const colors = this.state.colors.slice();
    if (calculateWinner(values) || values[i]) {
      return;
    }
    values[i] = this.state.xIsNext ? "X" : "O";
    colors[i] = this.state.xIsNext ? "#49beb7" : "#226089";
    this.setState({
      values: values,
      colors: colors,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        onClick={() => this.handleClick(i)}
        nextColor={this.state.colors[i]}
        nextValue={this.state.values[i]}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.values);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (this.state.values.every(v => v !== null)) {
      status = "Game Over";
    } else {
      status = `Next Player: ${this.state.xIsNext ? "X" : "O"}`;
    }
    return (
      <div className="boardmain">
        <div className="status-container">
          <div className="status">{status}</div>
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
// ========================================
// ========================================
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
// ========================================
// ========================================
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================
// ========================================
ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);
