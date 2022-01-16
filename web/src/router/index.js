import router from "vue-router";

import MakeTeam from "@/components/MakeTeam";
import Default from "@/components/Default";
import CmdMain from "@/components/CloudMusicDownload/CmdMain";
import BSPersonalCard from "@/components/BSEventsSearch/BSPersonalCard";
import RecentEvents from "@/components/BSEventsSearch/RecentEvents";

export default new router({
    routes: [
        {
            path:'',
            component: Default
        },
        {
            path: '/cloudmusicdownload',
            component: CmdMain
        },
        {
            path: '/make-team',
            component: MakeTeam
        },
        {
            path: '/bsPersonalCard',
            component: BSPersonalCard
        },
        {
            path: '/recentEvents',
            component: RecentEvents
        },
    ]
})
