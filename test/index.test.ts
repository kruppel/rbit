import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('rbit', () => {
  const rules = [
    {
      conditions: {
        all: [
          {fact: 'status', operator: 'equal', value: 'ready'}
        ]
      },
      event: {type: 'notification'}
    }
  ]

  test
  .stdout()
  .do(() => cmd.run(['--rules', JSON.stringify(rules), JSON.stringify({status: 'ready'})]))
  .it('runs --rules with data', ctx => {
    expect(ctx.stdout).to.contain('[{"type":"notification"}]')
  })
})
