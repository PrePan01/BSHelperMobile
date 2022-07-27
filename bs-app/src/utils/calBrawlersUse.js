export default function calBrawlersUse(battleLogs,myName) {
    let data = {}
    for (let item in battleLogs) {
        let battleLogsItem = battleLogs[item]
        if(battleLogsItem.event.mode !== 'unknown' || battleLogsItem.battle.mode !== 'unknown'){
            //处理3V3
            if ('teams' in battleLogsItem.battle && battleLogsItem.battle.teams.length === 2) {
                let teams = battleLogsItem.battle.teams
                for (let i in teams[0]) {
                    if (teams[0][i].name === myName) {
                        if (teams[0][i].brawler.id in data) {
                            if (battleLogsItem.battle.result === 'victory') {
                                data[teams[0][i].brawler.id][0]++
                                data[teams[0][i].brawler.id][1]++
                            }
                            if (battleLogsItem.battle.result === 'defeat') {
                                data[teams[0][i].brawler.id][0]++
                                data[teams[0][i].brawler.id][2]++
                            }
                        } else {
                            if (battleLogsItem.battle.result === 'victory') {
                                data[teams[0][i].brawler.id] = [1, 1, 0]
                            }
                            if (battleLogsItem.battle.result === 'defeat') {
                                data[teams[0][i].brawler.id] = [1, 0, 1]
                            }
                        }
                    }
                }
                for (let i in teams[1]) {
                    if (teams[1][i].name === myName) {
                        if (teams[1][i].brawler.id in data) {
                            if (battleLogsItem.battle.result === 'victory') {
                                data[teams[1][i].brawler.id][0]++
                                data[teams[1][i].brawler.id][1]++
                            }
                            if (battleLogsItem.battle.result === 'defeat') {
                                data[teams[1][i].brawler.id][0]++
                                data[teams[1][i].brawler.id][2]++
                            }
                        } else {
                            if (battleLogsItem.battle.result === 'victory') {
                                data[teams[1][i].brawler.id] = [1, 1, 0]
                            }
                            if (battleLogsItem.battle.result === 'defeat') {
                                data[teams[1][i].brawler.id] = [1, 0, 1]
                            }
                        }
                    }
                }
            }
            //处理车轮战
            if(battleLogsItem.battle.mode === 'duels'){
                if(battleLogsItem.battle.players[0].name === myName){
                    for(let i in battleLogsItem.battle.players[0].brawlers){
                        let brawlersItem = battleLogsItem.battle.players[0].brawlers
                        if (brawlersItem[i].id in data) {
                            if (battleLogsItem.battle.result === 'victory') {
                                data[brawlersItem[i].id][0]++
                                data[brawlersItem[i].id][1]++
                            }
                            if (battleLogsItem.battle.result === 'defeat') {
                                data[brawlersItem[i].id][0]++
                                data[brawlersItem[i].id][2]++
                            }
                        } else {
                            if (battleLogsItem.battle.result === 'victory') {
                                data[brawlersItem[i].id] = [1, 1, 0]
                            }
                            if (battleLogsItem.battle.result === 'defeat') {
                                data[brawlersItem[i].id] = [1, 0, 1]
                            }
                        }
                    }
                }
                else if(battleLogsItem.battle.players[1].name === myName){
                    for(let i in battleLogsItem.battle.players[1].brawlers){
                        let brawlersItem = battleLogsItem.battle.players[1].brawlers
                        if (brawlersItem[i].id in data) {
                            if (battleLogsItem.battle.result === 'victory') {
                                data[brawlersItem[i].id][0]++
                                data[brawlersItem[i].id][1]++
                            }
                            if (battleLogsItem.battle.result === 'defeat') {
                                data[brawlersItem[i].id][0]++
                                data[brawlersItem[i].id][2]++
                            }
                        } else {
                            if (battleLogsItem.battle.result === 'victory') {
                                data[brawlersItem[i].id] = [1, 1, 0]
                            }
                            if (battleLogsItem.battle.result === 'defeat') {
                                data[brawlersItem[i].id] = [1, 0, 1]
                            }
                        }
                    }
                }
            }
        }
    }
    var brawlUseSorted = Object.keys(data).sort((a,b)=>{
        return data[b][0]-data[a][0];
    });
    return [data,brawlUseSorted]
}
