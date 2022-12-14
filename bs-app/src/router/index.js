import router from 'vue-router'

import JoinUs from '@/components/MorePageComponents/JoinUs'
import ClubSearch from '@/components/MorePageComponents/ClubSearch'
import UpdateInfo from '@/components/MorePageComponents/UpdateInfo'
import RecordList from '@/components/MorePageComponents/RecordList'
import Events from '@/components/MorePageComponents/Events'
import EventsDetails from '@/components/MorePageComponents/EventsDetails'
import Main from '@/components/Main'
import MorePage from '@/components/MorePage'
import MapTranslate from '@/components/MapTranslate'
import Skins from "@/components/MorePageComponents/Skins";
import Support from "@/components/MorePageComponents/Support";

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
        {
            path: '/recordList',
            component: RecordList
        },
        {
            path: '/events',
            component: Events
        },
        {
            path: '/eventsdetails',
            component: EventsDetails
        },
        {
            path: '/skins',
            component: Skins
        },
        {
            path: '/support',
            component: Support
        },
    ]
})
