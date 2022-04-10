# Console Client JS
Make console browser to custom output

## Usage

```js
import { consoleClient } from "./console.client"

function toConsoleOutput(code){
  // backup browser console
  const oldConsole = console

  const tmpLog = []
  const console = consoleClient(tmpLog)

  try {
      new Function(code)(); // execute code (came from input)
  } catch (err) {
      console.error(err);
  }

  // restore browser console to oldConsole
  console = oldConsole
  
  return tmpLog
}

const userCode = `
  console.log("halo")
`

const consoleOutput = toConsoleOutput(userCode)

// use consoleOutput to print log result
```
