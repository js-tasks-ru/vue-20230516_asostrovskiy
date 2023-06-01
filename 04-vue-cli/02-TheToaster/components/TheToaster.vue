<template>
  <div class="toasts">
	<UiTransitionGroupFade>
		<div v-for="t in toastList" :key="t.id" class="toast" :class="t.class">
			<UiIcon v-if="showClose" class="toast__close" icon="chevron-down" @click="closeToast(t.id)" />
			<UiIcon class="toast__icon" :icon="t.icon" />
			<span>{{ t.text }}</span>
		</div>
	</UiTransitionGroupFade>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiTransitionGroupFade from './UiTransitionGroupFade.vue'

export default {
  name: 'TheToaster',
  props: {
	showClose: Boolean,
	delay: {
		type: Number,
		default: 5000
	}
  },

  data() {
	return {
		toastList: [],
	}
  },
  components: { UiIcon, UiTransitionGroupFade },

  methods: {
	closeToast(id) {
		this.toastList = this.toastList.filter(el => el.id != id)
	},

	delayDeleteToast() {
		setTimeout(() => this.toastList.shift(), this.delay)
	},

	success(text) {
		this.toastList.push({
			id: new Date(),
			text,
			class: 'toast_success',
			icon: 'check-circle',
		})
		this.delayDeleteToast()
	},

	error(text) {
		this.toastList.push({
			id: new Date(),
			text,
			class: 'toast_error',
			icon: 'alert-circle',
		})
		this.delayDeleteToast()
	}
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
  position: relative;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__close {
	position: absolute;
	top: 4px;
	right: 4px;
	width: 15px;
    height: 15px;
	cursor: pointer;
	border-radius: 50%;
	background-color: var(--grey-2);
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
