import template from './template.pug'
import schemaGenerator from '@stoplight/json-schema-generator'
import YAML from 'js-yaml'
import pick from 'lodash/pick'
import JSON5 from 'json5'
const persistKey = 'state'
const persistProps = ['type', 'sample', 'result']
export default {
  template,
  data: () => {
    return {
      type: 'json',
      sample: '{"hello":"world"}',
      result: ''
    }
  },
  mounted () {
    this.load()
    this.translate()
  },
  updated () {
    this.save()
  },
  methods: {
    save: function () {
      const persisValue = JSON.stringify(pick(this.$data, persistProps))
      window.sessionStorage.setItem(persistKey, persisValue)
    },
    load () {
      const state = window.sessionStorage.getItem(persistKey)
      if (!state) {
        return
      }
      const persistState = pick(JSON.parse(state), persistProps)
      Object.assign(this.$data, persistState)
    },
    translate () {
      const schema = schemaGenerator(JSON5.parse(this.sample))
      const result = (this.type === 'json') ? JSON.stringify(schema, null, 4) : YAML.dump(schema)
      this.result = result
    }
  }
}
