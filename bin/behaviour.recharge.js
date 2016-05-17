var behaviourRecharge = {
    
    /** @param {Creep} creep **/
    applies: function(creep) {
        return creep.ticksToLive < 100 ||
                  (creep.memory.rechargeAtBase &&
                   creep.ticksToLive < 1000 &&
                   creep.pos.isNearTo(Game.getObjectById(creep.memory.rechargeAtBase).pos) &&
                   Game.getObjectById(creep.memory.rechargeAtBase).energy > 10);
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.rechargeAtBase) {
            creep.memory.rechargeAtBase = creep.pos.findClosestByPath(FIND_MY_SPAWNS).id;
        }
        
        var base = Game.getObjectById(creep.memory.rechargeAtBase);
        var rechargeResult = base.renewCreep(creep);
        if( rechargeResult == ERR_NOT_IN_RANGE ) {
            creep.moveTo(base);
        } else if(rechargeResult == ERR_NOT_OWNER) {
            creep.memory.rechargeAtBase = null;
        }
        console.log(rechargeResult);
	}
};

module.exports = behaviourRecharge;
