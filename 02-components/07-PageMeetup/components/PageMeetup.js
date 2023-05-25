import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from './MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      error: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(newV) {
        this.error = null;
        this.meetup = null;
        fetchMeetupById(newV)
          .then((resp) => (this.meetup = resp))
          .catch((e) => (this.error = e.message));
      },
    },
  },

  template: `
    <div class="page-meetup">
      <UiContainer v-if="meetup && !error">
		<MeetupView :meetup="meetup" />
	  </UiContainer>

      <UiContainer v-else-if="!meetup && !error">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else="!meetup && error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
