/* eslint-disable no-console */
import * as SerialPort from 'serialport';
import * as program from 'commander';
import {
  ROCK_PAPER_SCISSORS,
  SIMON_SAYS,
  TIC_TAC_TOE,
  TRIVIA,
  MAIN,
  TIME_AND_DOWN,
  WELCOME,
  SELECT_PLAY,
  OUTCOME,
  END_Q,
} from '../../constants/screens';

// const program = () => require('commander');
global.program = program;

// const getArduinoPort = (ports) =>
//   ports.find((port) => port.manufacturer === 'Arduino (www.arduino.cc)');

const getLaunchpadPort = (ports) =>
  // ports.find((port) => port.manufacturer === 'FTDI');
  ports.find((port) => port.comName === 'COM4');

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
      const argv = line.split(' ');
      // eslint-disable-next-line no-unused-vars
      program
        .command('ROCK_PAPER_SCISSORS')
        .option('-1', '--player1 <move>', "Player 1's move")
        .option('-2', '--player2 <move>', "Player 2's move")
        .action(({ player1, player2 }) => {
          if (state.screen !== ROCK_PAPER_SCISSORS) {
            dispatch('setScreen', ROCK_PAPER_SCISSORS);
          }
        });
      program
        .command('SIMON_SAYS')
        .option('-c', '--color <color>', 'Color')
        .action(({ color = 'placeholder' }) => {
          if (state.screen !== SIMON_SAYS) {
            dispatch('setScreen', SIMON_SAYS);
          }
        });
      program
        .command('TIC_TAC_TOE')
        .option('-m', '--markers <player1> <player2>', "Player's markers")
        .action(({ markers: [player1, player2] }) => {
          if (state.screen !== TIC_TAC_TOE) {
            dispatch('setScreen', TIC_TAC_TOE);
          }
        });

      program
        .command('TRIVIA')
        .option(
          '-q',
          '--question <question> <choice1> <choice2> <choice3> <choice4>',
          'Question to display',
        )
        .option(
          '-a',
          '--answer <answer_number>',
          'Highlight the choice (must include the --question option)',
        )
        .action(() => {
          if (state.screen !== TRIVIA) {
            dispatch('setScreen', TRIVIA);
          }
        });

      program.command('MAIN').action(() => {
        if (state.screen !== MAIN) {
          dispatch('setScreen', MAIN);
        }
      });

      program
        .command('TIME_AND_DOWN')
        .option('-q, --quarter <quarter>', 'Quarter')
        .option('-m, --minutes <minutes>', 'Minutes')
        .option('-s, --seconds <seconds>', 'Seconds')
        .option('-o, --down <down>', 'Down')
        .option('-i, --distance <distance>', 'Distance')
        .parse(['TIME_AND_DOWN', '-q', '2'])
        .action(
          ({
            quarter = state.quarter,
            minutes = state.minutes,
            seconds = state.seconds,
            down = state.down,
            distance = state.distance,
          }) => {
            if (state.screen !== TIME_AND_DOWN) {
              dispatch('setScreen', TIME_AND_DOWN);
            }
            const time =
              Number(seconds) < 10
                ? `${minutes}:0${seconds}`
                : `${minutes}:${seconds}`;
            dispatch('setTimeAndDown', { quarter, time, down, distance });
          },
        );

      program.command('WELCOME').action(() => {
        if (state.screen !== WELCOME) {
          dispatch('setScreen', WELCOME);
        }
      });

      program.command('SELECT_PLAY').action(() => {
        if (state.screen !== SELECT_PLAY) {
          dispatch('setScreen', SELECT_PLAY);
        }
      });

      program.command('OUTCOME').action(() => {
        if (state.screen !== OUTCOME) {
          dispatch('setScreen', OUTCOME);
        }
      });

      program.command('END_Q').action(() => {
        if (state.screen !== END_Q) {
          dispatch('setScreen', END_Q);
        }
      });
      program.command('*').action(() => {
        console.error('unknown command:');
      });

      program.parse(argv);
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
