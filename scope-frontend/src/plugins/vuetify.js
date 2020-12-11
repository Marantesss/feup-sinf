import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#205662', // dark greenish blue
        secondary: '#4caf50', // material green
        accent: '#ffc857', // gold
      },
    },
  },
});
