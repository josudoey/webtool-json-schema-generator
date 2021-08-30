import template from './template.pug'
import schemaGenerator from '@stoplight/json-schema-generator'
export default {
  template,
  data: () => {
    return {
      sample: '',
      result: ''
    }
  },
  methods: {
    translate () {
      this.result = JSON.stringify(schemaGenerator(JSON.parse(this.sample)), null, 4)
    }
  }
}
