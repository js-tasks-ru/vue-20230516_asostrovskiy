<template>
  <div class="pagination-container">
    <template v-for="i in viewArray" :key="i">
      <slot :item="i" />
    </template>

    <!-- Контент страницы -->
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
	startForSlice() {
		if (!this.page) return 0
		return (this.page-1)*this.perPage
	},
    viewArray() {
      return this.items.slice(this.startForSlice, this.startForSlice + this.perPage);
    },
  },
};
</script>

<style></style>
