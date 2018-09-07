const path = require('path')
const {Engine} = require('json-rules-engine')

import {Command, flags} from '@oclif/command'

class RBit extends Command {
  static description = 'CLI for JSON rule evaluation'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    rules: flags.string({
      char: 'r',
      description: 'rules to evaluate'
    }),
    include: flags.string({
      char: 'i',
      description: 'include libraries',
      multiple: true
    })
  }

  static args = [
    {name: 'data', required: true}
  ]

  async run() {
    const {args: {data}, flags: {rules, include}} = this.parse(RBit)
    const engine = new Engine()

    if (Array.isArray(include)) {
      include.forEach(lib => require(path.join(process.cwd(), lib))(engine))
    }

    if (!!rules) {
      for (let rule of JSON.parse(rules)) {
        engine.addRule(rule)
      }
    }

    engine.run(JSON.parse(data)).then((events: any[]) => {
      this.log(JSON.stringify(events))
    })
  }
}

export = RBit
