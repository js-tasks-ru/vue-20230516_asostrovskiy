<template>
  <button @click="this.localCount += 1">
		{{ localCount }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
	count: {
		type: Number,
		default: 0
	}
  },
  data(){
	return {
		localCount: 0
	}
  },
  emits: ['update:count'],
  watch: {
	count: {
		immediate: true,
		handler() {
			if(this.count) {
				this.localCount = this.count
			}
		}
	},
	localCount() {
		this.$emit('update:count', this.localCount)
	}
  }

};
</script>
