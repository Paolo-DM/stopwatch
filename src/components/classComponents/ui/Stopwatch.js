import React, { Component } from "react";
import "../../../styles/common.css";
import "../../../../src/styles/stopwatch/stopwacth.css";

export class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.timerId = null;

    this.state = {
      isTicking: false,
      laps: [],
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {}

  playTimer = () => {
    this.setState({ isTicking: true });
    this.timerID = setInterval(() => this.tick(), 10);
  };

  pauseTimer = () => {
    clearInterval(this.timerID);
    this.setState({ isTicking: false });
  };

  tick() {
    let { hours, minutes, seconds, milliseconds } = this.state.time;

    milliseconds++;

    if (minutes === 60) {
      minutes = 0;
      hours += 1;
    }
    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }

    if (milliseconds === 100) {
      milliseconds = 0;
      seconds += 1;
    }
    this.setState({
      time: {
        hours,
        minutes,
        seconds,
        milliseconds,
      },
    });
  }

  saveLap = () => {
    const { hours, minutes, seconds, milliseconds } = this.state.time;
    const lap = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    this.setState({ laps: [...this.state.laps, lap] });
  };

  mapLaps(lap, key) {
    return (
      <li className="lapsTime" key={key}>
        {lap}
      </li>
    );
  }

  resetTimer = () => {
    clearInterval(this.timerID);
    this.setState({
      isTicking: false,
      laps: [],
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
    });
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="flex  flex-column flex-align stopwatchContainer">
        <h1 className="time">Stopwatch</h1>
        <div className="timerText">
          {`${this.state.time.hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}:${this.state.time.minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}:${this.state.time.seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}:${this.state.time.milliseconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}`}
        </div>
        {this.state.isTicking && (
          <>
            <button className="timerButton" onClick={this.pauseTimer}>
              PAUSA
            </button>
            <p>
              <button className="timerButton" onClick={this.saveLap}>
                GIRO
              </button>
            </p>
          </>
        )}

        {!this.state.isTicking && (
          <>
            <button className="timerButton" onClick={this.playTimer}>
              START
            </button>
            <p>
              <button className="timerButton" onClick={this.resetTimer}>
                RESET
              </button>
            </p>
          </>
        )}

        {this.state.laps.length > 0 && <>{this.state.laps.map(this.mapLaps)}</>}
      </div>
    );
  }
}

export default Stopwatch;
