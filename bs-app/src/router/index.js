import router from 'vue-router'

import JoinUs from '@/components/MorePageComponents/JoinUs'
import ClubSearch from '@/components/MorePageComponents/ClubSearch'
import UpdateInfo from '@/components/MorePageComponents/UpdateInfo'
import Main from '@/components/Main'
import MorePage from '@/components/MorePage'
import MapTranslate from '@/components/MapTranslate'

export default new router({
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/more',
            component: MorePage
        },
        {
            path: '/joinUs',
            component: JoinUs
        },
        {
            path: '/clubSearch',
            component: ClubSearch
        },
        {
            path: '/updateInfo',
            component: UpdateInfo
        },
        {
            path: '/mapTranslate',
            component: MapTranslate
        },
    ]
})
