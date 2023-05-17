import { createApp } from './vendor/vue.esm-browser.js';

const App = createApp({
	data() {
		return {
			count: 0
		}
	},
	methods: {
		increment (){
			this.count += 1
		},
		reset (){
			this.count = 0
		}
	},
	template: `<button type='button' @click='increment'> {{ count }} </button> <br/>
	 <button type='button' @click='reset'>Reset</button>`

})

App.mount('#app')

