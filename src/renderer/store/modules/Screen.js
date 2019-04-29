/* eslint-disable no-console */
import * as SerialPort from 'serialport';

import {
  END_Q,
  OUTCOME,
  ROCK_PAPER_SCISSORS,
  SELECT_PLAY,
  SIMON_SAYS,
  TIC_TAC_TOE,
  TRIVIA,
  TIME_AND_DOWN,
} from '../../constants/screens';

// const program = () => require('commander');
// global.program = program;

const getArduinoPort = (ports) =>
  ports.find((port) => port.manufacturer === 'Arduino (www.arduino.cc)');

// const getLaunchpadPort = (ports) =>
// ports.find((port) => port.manufacturer === 'FTDI');
// ports.find((port) => port.comName === 'COM4');

// const Readline = require('@serialport/parser-readline')
/* eslint-disable import/no-extraneous-dependencies */
const Delimiter = require('@serialport/parser-delimiter');

const connectToSerialPort = () =>
  new Promise((resolve, reject) => {
    console.log('connecting to serial port');
    SerialPort.list((err, ports) => {
      console.log('ports', ports);
      if (err) {
        reject(err);
      }

      // const port = getLaunchpadPort(ports);
      const port = getArduinoPort(ports);

      if (port === undefined) {
        console.log('Port not found.');
      } else {
        const serialPort = new SerialPort(port.comName, {
          baudRate: 9600,
        });

        serialPort.on('open', () => {
          console.log('Opened Port', port);

          window.onunload = () => {
            if (serialPort) {
              serialPort.close();
            }
          };

          setTimeout(() => {
            serialPort.write('1\n2\n3\n');
          }, 1000);

          resolve(serialPort);
        });

        // Open errors will be emitted as an error event
        serialPort.on('error', (err) => {
          reject(err);
        });
      }
    });
  });

const state = {
  screen: END_Q,
  // serialPort: undefined,
};

const mutations = {
  // The MSP432 will handle the game logic.
  SET_SCREEN(state, payload) {
    const { screen } = payload;
    state.screen = screen;
  },
};

let serialPort;

const actions = {
  setScreen({ commit }, screen) {
    commit('SET_SCREEN', { screen });
  },
  async startPortRead({ dispatch, state }) {
    serialPort = await connectToSerialPort();
    const parser = serialPort.pipe(new Delimiter({ delimiter: '\n' }));
    parser.on('data', (data) => {
      let line = data.toString('ascii');
      line = line.slice(0, line.length - 1); // Remove new line character.
      const [cmd, ...args] = line.match(/\w+|"[^"]+"/g);

      switch (cmd) {
        case TIC_TAC_TOE:
          if (state.screen !== TIC_TAC_TOE) {
            dispatch('setScreen', TIC_TAC_TOE);
          }
          break;
        case SIMON_SAYS: {
          const [color] = args;
          if (state.screen !== SIMON_SAYS) {
            dispatch('setScreen', SIMON_SAYS);
          }
          dispatch('setSSColor', color);
          break;
        }
        case ROCK_PAPER_SCISSORS:
          if (state.screen !== ROCK_PAPER_SCISSORS) {
            dispatch('setScreen', ROCK_PAPER_SCISSORS);
          }
          break;
        case TRIVIA: {
          const question = args;
          if (state.screen !== TRIVIA) {
            dispatch('setScreen', TRIVIA);
          }
          // May include answer (let component handle it)
          dispatch('setQuestion', question);
          break;
        }
        case SELECT_PLAY: {
          if (state.screen !== SELECT_PLAY) {
            dispatch('setScreen', SELECT_PLAY);
          }
          break;
        }
        case OUTCOME: {
          const [html] = args;
          if (state.screen !== OUTCOME) {
            dispatch('setScreen', OUTCOME);
          }
          // TODO: add this action
          dispatch('setOutcome', html);
          break;
        }
        case TIME_AND_DOWN: {
          const [quarter, minutes, seconds, down, distance] = args;
          if (state.screen !== TIME_AND_DOWN) {
            dispatch('setScreen', TIME_AND_DOWN);
          }
          const time =
            Number(seconds) < 10 && Number(seconds) !== 0
              ? `${minutes}:0${seconds}`
              : `${minutes}:${seconds}`;
          dispatch('setTimeAndDown', { quarter, time, down, distance });
          break;
        }
        default:
          console.log('Bad Command: %s', cmd);
      }

      // program.command('MAIN').action(() => {
      //   if (state.screen !== MAIN) {
      //     dispatch('setScreen', MAIN);
      //   }
      // });

      // program
      //   .command('TIME_AND_DOWN')
      //   .option('-q, --quarter <quarter>', 'Quarter')
      //   .option('-m, --minutes <minutes>', 'Minutes')
      //   .option('-s, --seconds <seconds>', 'Seconds')
      //   .option('-o, --down <down>', 'Down')
      //   .option('-i, --distance <distance>', 'Distance')
      //   .parse(['TIME_AND_DOWN', '-q', '2'])
      //   .action(
      //     ({
      //       quarter = state.quarter,
      //       minutes = state.minutes,
      //       seconds = state.seconds,
      //       down = state.down,
      //       distance = state.distance,
      //     }) => {
      //       if (state.screen !== TIME_AND_DOWN) {
      //         dispatch('setScreen', TIME_AND_DOWN);
      //       }
      //       const time =
      //         Number(seconds) < 10
      //           ? `${minutes}:0${seconds}`
      //           : `${minutes}:${seconds}`;
      //       dispatch('setTimeAndDown', { quarter, time, down, distance });
      //     },
      //   );

      // program.command('WELCOME').action(() => {
      //   if (state.screen !== WELCOME) {
      //     dispatch('setScreen', WELCOME);
      //   }
      // });

      // program.command('SELECT_PLAY').action(() => {
      //   if (state.screen !== SELECT_PLAY) {
      //     dispatch('setScreen', SELECT_PLAY);
      //   }
      // });

      // program
      //   .command('OUTCOME')
      //   .option('-h', '--html', 'HTML string to display')
      //   .action(({ html }) => {
      //     if (state.screen !== OUTCOME) {
      //       dispatch('setScreen', OUTCOME);
      //     }
      //     // TODO: add this action
      //     dispatch('setOutcome', html);
      //   });

      // program.command('END_Q').action(() => {
      //   if (state.screen !== END_Q) {
      //     dispatch('setScreen', END_Q);
      //   }
      // });
      // program.command('*').action((env) => {
      //   console.error('unknown command: %s', env);
      // });

      // console.log(argv);
      // program.parse(argv);
    }); // emits data after every '\n'
  },
  // Sending 1 or 2 for player 1 and player 2
  // Sending a 0 means a tie.
  async sendWin(player) {
    serialPort.write(`${player}`);
  },
};

const getters = {
  getScreen(state) {
    return state.screen;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
