<template>

	<template v-if="result">
	  <slot name="fulfilled" :result="result" />
	</template>
    <template v-else-if="error">
      <slot name="rejected" :error="error" />
    </template>
    <template v-else>
      <slot name="pending" />
    </template>

</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },
  data() {
    return {
      result: null,
      error: null,
    };
  },
  watch: {
	promise: {
		immediate: true,
		handler(nV){
			this.result = null
			this.error = null
			nV.then(resp => {
				this.result = resp
			})
			.catch(e => {
				this.error = e})
		}
	}
}
};
</script>
