var behaviourRecharge = require('behaviour.recharge');

var roles = {
    builder: require('role.builder'),
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader')
};

var behaviours = {
    renew: require('behaviour.recharge')
};

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.spawning) continue;
        
        var actionTaken = false;
        for(var bname in behaviours) {
            var behaviour = behaviours[bname];
            if(behaviour.applies(creep)) {
                behaviour.run(creep);
                actionTaken = true;
                break;
            }
        }
        if(!actionTaken) {
            roles[creep.memory.role].run(creep);
        }
    }
}
