export default function calModeNum(battleLogs){
    //0宝石，1足球，2赏金，3金库，4热区，5机甲，6淘汰赛，7单鸡，8双鸡，9车轮战，10积分战,11推车，12篮球，13机甲天降，14追猎战
    //[序号，次数，胜场，负场]
    let data = [[0,0,0,0],[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0],[6,0,0,0],[7,0],[8,0],[9,0,0,0],[10,0,0,0],[11,0,0,0],[12,0,0,0],[13,0,0,0],[14,0,0,0]]
    for(let item in battleLogs){
        let battleItem = battleLogs[item].battle
        if(battleLogs[item].event.mode !== 'unknown' || battleLogs[item].battle.mode !== 'unknown'){
            if(battleItem.mode === 'gemGrab'){
                if (battleItem.result === 'victory') {
                    data[0][1]++
                    data[0][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[0][1]++
                    data[0][3]++
                }
            }
            else if(battleItem.mode === 'brawlBall'){
                if (battleItem.result === 'victory') {
                    data[1][1]++
                    data[1][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[1][1]++
                    data[1][3]++
                }
            }
            else if(battleItem.mode === 'bounty'){
                if (battleItem.result === 'victory') {
                    data[2][1]++
                    data[2][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[2][1]++
                    data[2][3]++
                }
            }
            else if(battleItem.mode === 'heist'){
                if (battleItem.result === 'victory') {
                    data[3][1]++
                    data[3][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[3][1]++
                    data[3][3]++
                }
            }
            else if(battleItem.mode === 'hotZone'){
                if (battleItem.result === 'victory') {
                    data[4][1]++
                    data[4][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[4][1]++
                    data[4][3]++
                }
            }
            else if(battleItem.mode === 'siege'){
                if (battleItem.result === 'victory') {
                    data[5][1]++
                    data[5][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[5][1]++
                    data[5][3]++
                }
            }
            else if(battleItem.mode === 'knockout'){
                if (battleItem.result === 'victory') {
                    data[6][1]++
                    data[6][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[6][1]++
                    data[6][3]++
                }
            }
            else if(battleItem.mode === 'soloShowdown'){
                data[7][1]++
            }
            else if(battleItem.mode === 'duoShowdown'){
                data[8][1]++
            }
            else if(battleItem.mode === 'duels'){
                if (battleItem.result === 'victory') {
                    data[9][1]++
                    data[9][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[9][1]++
                    data[9][3]++
                }
            }
            else if(battleItem.mode === 'wipeout'){
                if (battleItem.result === 'victory') {
                    data[10][1]++
                    data[10][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[10][1]++
                    data[10][3]++
                }
            }
            else if(battleItem.mode === 'payload'){
                if (battleItem.result === 'victory') {
                    data[11][1]++
                    data[11][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[11][1]++
                    data[11][3]++
                }
            }
            else if(battleItem.mode === 'basketBrawl'){
                if (battleItem.result === 'victory') {
                    data[12][1]++
                    data[12][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[12][1]++
                    data[12][3]++
                }
            }
            else if(battleItem.mode === 'invasion'){
                if (battleItem.result === 'victory') {
                    data[13][1]++
                    data[13][2]++
                }
                if (battleItem.result === 'defeat') {
                    data[13][1]++
                    data[13][3]++
                }
            }
            else if(battleItem.mode === 'hunters'){
                if (battleItem.rank < 5) {
                    data[14][1]++
                    data[14][2]++
                }
                if (battleItem.rank >= 5) {
                    data[14][1]++
                    data[14][3]++
                }
            }
        }
    }
    data = data.sort(function(x, y){
        return y[1] - x[1];
    });
    return data
}
