import * as SerialPort from 'serialport';

import {
  ROCK_PAPER_SCISSORS,
  SIMON_SAYS,
  TIC_TAC_TOE,
  TRIVIA,
  MAIN,
  TIME_AND_DOWN,
} from '../../constants/screens';

// const getArduinoPort = (ports) =>
//   ports.find((port) => port.manufacturer === 'Arduino (www.arduino.cc)');

const getLaunchpadPort = (ports) =>
  ports.find((port) => port.manufacturer === 'FTDI');

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

      const port = getLaunchpadPort(ports);

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

        // serialPort.on('data', (data) => {
        //   console.log('Data:', data);
        // });

        // Open errors will be emitted as an error event
        serialPort.on('error', (err) => {
          reject(err);
        });
      }
    });
  });

const state = {
  screen: TIME_AND_DOWN,
  // serialPort: undefined,
};

const mutations = {
  // The MSP432 will handle the game logic.
  SET_SCREEN(state, payload) {
    const { screen } = payload;
    state.screen = screen;
  },
  // SET_SERIAL_PORT(state, payload) {
  //   const { serialPort } = payload;
  //   state.serialPort = serialPort;
  // },
};

let serialPort;

const actions = {
  setScreen({ commit }, screen) {
    commit('SET_SCREEN', { screen });
  },
  async startPortRead({ dispatch }) {
    console.log('startPortRead');
    serialPort = await connectToSerialPort();
    const parser = serialPort.pipe(new Delimiter({ delimiter: '\n' }));
    parser.on('data', (data) => {
      let cmd = data.toString('ascii');
      cmd = cmd.slice(0, cmd.length - 1); // Remove new line character.
      console.log(cmd);

      switch (cmd) {
        case ROCK_PAPER_SCISSORS:
          dispatch('setScreen', ROCK_PAPER_SCISSORS);
          break;
        case SIMON_SAYS:
          dispatch('setScreen', SIMON_SAYS);
          break;
        case TIC_TAC_TOE:
          dispatch('setScreen', TIC_TAC_TOE);
          break;
        case TRIVIA:
          dispatch('setScreen', TRIVIA);
          break;
        case MAIN:
          dispatch('setScreen', MAIN);
          break;
        case TIME_AND_DOWN:
          dispatch('setScreen', TIME_AND_DOWN);
          break;
        default:
          console.log('unknown command:');
      }
    }); // emits data after every '\n'
  },
  // Sending 1 or 2 for player 1 and player 2
  // Sending a 0 means a tie.
  async sendWin(player) {
    serialPort.write(`${player}\n`);
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
