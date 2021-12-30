import router from "vue-router";

import CloudMusicDownload from "@/components/CloudMusicDownload";
import MakeTeam from "@/components/MakeTeam";

export default new router({
    routes: [
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