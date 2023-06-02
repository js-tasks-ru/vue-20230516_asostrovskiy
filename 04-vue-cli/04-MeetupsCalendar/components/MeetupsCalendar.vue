<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="changeLastMonth"></button>
        <div class="calendar-view__date">{{ currentMonthYear }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="changeNextMonth"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
		<div v-for="i in datesLastMonth" :key="'lastM'+ i"  class="calendar-view__cell calendar-view__cell_inactive" tabindex="0">
			<div class="calendar-view__cell-day">{{ i }}</div>
			<div class="calendar-view__cell-content"></div>
		</div>

      	<div v-for="i in quantityDaysInCurrentMonth" :key="i" class="calendar-view__cell" tabindex="0">
			<div class="calendar-view__cell-day">{{ i }}</div>
			<div class="calendar-view__cell-content">
				<!-- // вопрос оптимальности массива через метод mettups(i)??? (см след. строчку)  может есть лучше решения -->
				<a v-for="meetup in mettups(i) " :key="meetup.id" :href="'/meetups/' + meetup.id" class="calendar-event">
					{{ meetup.title }}
				</a>
			</div>
      	</div>


			<div v-for="i in datesNextMonth" :key="'nextM' + i" class="calendar-view__cell calendar-view__cell_inactive" tabindex="0">
				<div class="calendar-view__cell-day">{{ i }}</div>
				<div class="calendar-view__cell-content"></div>
			</div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data() {
	return {
		date: new Date()
	}
  },

  computed: {
	currentMonthYear() {
		return this.date.toLocaleDateString(navigator.language, {
			month: 'long',
			year: 'numeric',
		});
	},
	quantityDaysInLastMonth() {
		return new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate()
	},
	quantityDaysInCurrentMonth() {
		return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
	},
	quantityDaysInNextMonth() {
		return new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate()
	},
	firstDayInMonth() {
		return new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay()
	},
	datesLastMonth() {
		const dates = []
		const startDate = this.quantityDaysInLastMonth - this.firstDayInMonth + 2
		for (let index = startDate; index < this.quantityDaysInLastMonth + 1 ; index++) {
			dates.push(index)
		}
		return dates
	},
	datesNextMonth() {   // вопрос оптимальности???  может есть лучше решения
		const sumDays = this.datesLastMonth?.length + this.quantityDaysInCurrentMonth
		if (sumDays <= 35) return 35 - sumDays
		else return 42 - sumDays
	},
	meetupsInCurrentMonth(){
		return this.meetups.filter(el => {
			return	new Date(el.date).getMonth() === this.date.getMonth() &&
					new Date(el.date).getFullYear() === this.date.getFullYear()
		})
	},
  },
  methods: {
	changeNextMonth() {
		this.date = new Date(this.date.setMonth(this.date.getMonth() + 1))
	},
	changeLastMonth() {
		this.date = new Date(this.date.setMonth(this.date.getMonth() - 1))
	},
	mettups(day) {
		const meetups = []
		for (let index = 0; index < this.meetupsInCurrentMonth.length; index++) {
			const date = new Date(this.meetupsInCurrentMonth[index].date)
			if(day === date.getDate())  meetups.push(this.meetupsInCurrentMonth[index])
		}
		return meetups
	}
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
