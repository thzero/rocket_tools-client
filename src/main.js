import 'animate.css';

import {
	Notify
} from 'quasar';

import app from '@/components/App.vue';
import router from '@/router';
import store from '@/store';

import bootStarter from '@thzero/library_client_firebase/boot/starter';
// import bootAsyncComputed from '@thzero/library_client_vue3/boot/asyncComputed';
import bootEventBus from '@thzero/library_client_vue3/boot/eventBus';
import booti18n from '@/boot/i18n';
import bootServices from '@/boot/services';
import bootUi from '@/library_vue_quasar/boot/ui';
import bootValidate from '@/boot/validate';
import bootWebComponents from '@thzero/library_client_vue3/boot/webComponents';

import start from '@thzero/library_client_vue3/boot/main';
// start(app, router, store, [ bootAsyncComputed, booti18n, bootEventBus, bootServices, bootValidate, bootUi, bootWebComponents ], bootStarter,
start(app, router, store, [ booti18n, bootEventBus, bootServices, bootValidate, bootUi, bootWebComponents ], bootStarter, {
    plugins: {
      Notify
    },
    config: {
      notify: { /* look at QuasarConfOptions from the API card */ }
    }
  });
