import { createApp } from './vendor/vue.esm-browser.js';

const App = createApp({
	name: 'calculator',
	data() {
		return {
			firstNum: 0,
			secondNum: 0,
			currentOperand: 'sum'
		}
	},
	computed: {
		total(){
			if(this.currentOperand === "sum") return this.firstNum + this.secondNum
			if(this.currentOperand === "subtract") return this.firstNum - this.secondNum
			if(this.currentOperand === "multiply") return this.firstNum * this.secondNum
			if(this.currentOperand === "divide") return this.firstNum / this.secondNum
		},
	},

}).mount('#apps')