import router from "./utils/router.js"

new Vue({
    el:'#app',
    template:`
    <div>
        <router-view/>
    </div>
    `,
    router,
})