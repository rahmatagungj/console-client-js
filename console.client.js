export const consoleClient = (consoleMessages) => {
  return {
    formatArgsOutput: function (arg) {
      let outputArgMessage

      // Deal with different data types
      switch (this.getType(arg)) {
        case "string":
          outputArgMessage = `"${arg}"`
          break
        case "object":
          outputArgMessage = `Object ${JSON.stringify(arg)}`
          break
        case "array":
          outputArgMessage = `Array ${JSON.stringify(arg)}`
          break
        default:
          outputArgMessage = arg
          break
      }

      return outputArgMessage
    },
    getType: function (arg) {
      if (typeof arg === "string") return "string"
      if (typeof arg === "boolean") return "boolean"
      if (typeof arg === "function") return "function"
      if (typeof arg === "number") return "number"
      if (typeof arg === "undefined") return "undefined"
      if (typeof arg === "object" && !Array.isArray(arg)) return "object"
      if (typeof arg === "object" && Array.isArray(arg)) return "array"
    },
    logMultipleArguments: function (args) {
      let currentLog = ""

      // Deal with multiple arguments
      args.forEach((arg) => {
        currentLog += this.formatArgsOutput(arg) + " "
      })

      consoleMessages.push({
        message: currentLog,
        class: `log log--default`,
      })
    },
    logSingleArgument: function (logItem) {
      consoleMessages.push({
        message: this.formatArgsOutput(logItem),
        class: `log log--${this.getType(logItem)}`,
      })
    },
    log: function (text) {
      let argsArray = Array.from(arguments)
      return argsArray.length !== 1
        ? this.logMultipleArguments(argsArray)
        : this.logSingleArgument(text)
    },
    info: function (text) {
      consoleMessages.push({
        message: text,
        class: `log log--info`,
      })
    },
    warn: function (text) {
      consoleMessages.push({
        message: text,
        class: `log log--warning`,
      })
    },
    error: function (err) {
      if (typeof err !== "object") {
        consoleMessages.push({
          message: err,
          class: `log log--error`,
        })
      } else {
        consoleMessages.push({
          message: `${err.name}: ${err.message}`,
          class: "log log--error",
        })
      }
    },
  }
}
