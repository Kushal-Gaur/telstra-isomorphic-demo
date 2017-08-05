actions = {

    numberOfUSersInDB : function(){
        this.count = this.count || 5;
        this.count = this.count * this.count;
        return this.count;
    }

}

module.exports = actions