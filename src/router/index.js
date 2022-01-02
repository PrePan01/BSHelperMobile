import router from "vue-router";

import CloudMusicDownload from "@/components/CloudMusicDownload";
import MakeTeam from "@/components/MakeTeam";
import Default from "@/components/Default";

export default new router({
    routes: [
        {
            path:'',
            component: Default
        },
        {
            path: '/cloudmusicdownload',
            component: CloudMusicDownload
        },
        {
            path: '/make-team',
            component: MakeTeam
        }
    ]
})
