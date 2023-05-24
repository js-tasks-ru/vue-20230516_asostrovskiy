import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupCover from "./MeetupCover.js";
import UiContainer from './UiContainer.js';
import MeetupDescription from "./MeetupDescription.js";
import MeetupAgenda from "./MeetupAgenda.js";
import UiAlert from './UiAlert.js';
import MeetupInfo from "./MeetupInfo.js";


export default defineComponent({
  name: 'MeetupView',

  components: {
	MeetupCover,
    UiContainer,
	MeetupDescription,
	MeetupAgenda,
    UiAlert,
	MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
        <MeetupCover :title="meetup.title" :image="meetup.image" />

		<UiContainer>
			<div class="meetup">
			<div class="meetup__content">
				<h3>Описание</h3>
				<MeetupDescription :description="meetup.description" />

				<h3>Программа</h3>
				<template v-if="meetup.agenda.length">
					<MeetupAgenda :agenda="meetup.agenda" />
				</template>
				<UiAlert v-else> Программа пока пуста... </UiAlert>
			</div>
			<div class="meetup__aside">
				<MeetupInfo
					:organizer="meetup.organizer"
  					:place="meetup.place"
  					:date="meetup.date"
					/>
			</div>
			</div>
		</UiContainer>
    </div>`,
});
