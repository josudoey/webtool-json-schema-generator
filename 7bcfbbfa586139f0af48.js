"use strict";(self.webpackChunkwebtool_json_schema_generator=self.webpackChunkwebtool_json_schema_generator||[]).push([[693],{9693:(a,e,t)=>{t.r(e),t.d(e,{default:()=>b});var s=t(1090),r=t.n(s),o=t(1272),n=t(8718),l=t.n(n),d=t(1142),i=t.n(d);const c="state",m=["type","sample","result"],b={template:'<div class="container-fluid px-0"><nav class="navbar navbar-dark bg-dark"><div class="navbar-brand d-flex"><div>JSON Schema Generator</div></div></nav><div class="container-fluid px-0"><b-form-radio-group class="ml-2 p-0" v-model="type" @input="translate" size="sm"><b-form-radio value="json">JSON</b-form-radio><b-form-radio value="yaml">YAML</b-form-radio></b-form-radio-group><b-card no-body><b-card-body><textarea class="w-50" v-model="sample" @input="translate" style="min-height: calc(60vh)"></textarea><textarea class="w-50" v-model="result" style="min-height: calc(60vh)"></textarea></b-card-body></b-card></div></div>',data:()=>({type:"json",sample:'{"hello":"world"}',result:""}),mounted(){this.load(),this.translate()},updated(){this.save()},methods:{save:function(){const a=JSON.stringify(l()(this.$data,m));window.sessionStorage.setItem(c,a)},load(){const a=window.sessionStorage.getItem(c);if(!a)return;const e=l()(JSON.parse(a),m);Object.assign(this.$data,e)},translate(){const a=r()(i().parse(this.sample)),e="json"===this.type?JSON.stringify(a,null,4):o.ZP.dump(a);this.result=e}}}}}]);