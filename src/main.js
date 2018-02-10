// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-ydui/dist/ydui.rem.css'
import domain from '../static/js/domain.js'
import md5 from '../static/js/vmd5.js'
global.domain = domain
global.md5 = md5
import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider';
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
import { Button, ButtonGroup } from 'vue-ydui/dist/lib.rem/button';
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
import { CellGroup, CellItem } from 'vue-ydui/dist/lib.rem/cell';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
import { Popup } from 'vue-ydui/dist/lib.rem/popup';
Vue.component(Popup.name, Popup);
import { InfiniteScroll } from 'vue-ydui/dist/lib.rem/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
import { SendCode } from 'vue-ydui/dist/lib.rem/sendcode';
Vue.component(SendCode.name, SendCode);
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import { ListTheme, ListItem, ListOther } from 'vue-ydui/dist/lib.rem/list';
Vue.component(ListTheme.name, ListTheme);
Vue.component(ListItem.name, ListItem);
Vue.component(ListOther.name, ListOther);
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};

Vue.config.productionTip = false
import echarts from '../static/js/echarts.min.js'

Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})