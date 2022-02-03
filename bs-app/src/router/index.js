import router from 'vue-router'

import JoinUs from '@/components/MorePageComponents/JoinUs'
import Main from '@/components/Main'

export default new router({
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/joinUs',
            component: JoinUs
        },
    ]
})
