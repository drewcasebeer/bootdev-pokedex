import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .split(" ")
    .map((str) => str.trim().toLowerCase())
    .filter((str) => str !== "");
}

async function executeCommand(state: State, commandInput: string[]) {
  const command = commandInput[0];
  const { commands } = state;

  if (commands[command] === undefined) {
    console.log("Unknown command");
  } else {
    try {
      await commands[command].callback(state, ...commandInput.slice(1));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  }
}

function readLine(state: State): (line: string) => Promise<void> {
  const { rl } = state;

  return async (line: string) => {
    const input = cleanInput(line);

    if (input.length !== 0) {
      await executeCommand(state, input);
    }

    rl.prompt();
  };
}

export function startREPL(state: State) {
  const { rl } = state;
  rl.on("line", readLine(state));
  rl.prompt();
}
