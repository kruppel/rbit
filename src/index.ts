import {Command, flags} from '@oclif/command'

const {Engine} = require('json-rules-engine')

class RBit extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    rules: flags.string({
      char: 'r',
      description: 'rules to evaluate',
      required: true
    })
  }

  static args = [
    {name: 'data', required: true}
  ]

  async run() {
    const {args: {data}, flags: {rules}} = this.parse(RBit)
    const engine = new Engine()

    for (let rule of JSON.parse(rules)) {
      engine.addRule(rule)
    }

    engine.run(JSON.parse(data)).then((events: any[]) => {
      this.log(JSON.stringify(events))
    })
  }
}

export = RBit
