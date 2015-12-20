var Vue = require('vue');
var vmdl = require('vue-mdl');
vmdl.registerAll(Vue);

var App = require('./components/app.vue');

new Vue({
	el: 'body',
	components: {
        mdlButton: vmdl.components['mdl-button'],
		app: App
	}
})