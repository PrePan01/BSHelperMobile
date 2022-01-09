import router from "vue-router";

import MakeTeam from "@/components/MakeTeam";
import Default from "@/components/Default";
import CmdMain from "@/components/CloudMusicDownload/CmdMain";
import BSPersonalCard from "@/components/BSEventsSearch/BSPersonalCard";

export default new router({
    mode: 'hash',
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

    ]
})
