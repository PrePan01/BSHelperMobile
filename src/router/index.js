import router from "vue-router";

import MakeTeam from "@/components/MakeTeam";
import Default from "@/components/Default";
import CmdMain from "@/components/CloudMusicDownload/CmdMain";

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
        }
    ]
})
