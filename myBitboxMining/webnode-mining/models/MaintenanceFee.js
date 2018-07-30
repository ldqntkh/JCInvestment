'use strict';

class MaintenanceFee {
    constructor(MaintenanceFee) {
        MaintenanceFee && Object.assign(this, MaintenanceFee)
        /**
         * id: Number
         * createAt: Date
         * updateAt: Date
         */
    }

    /**
     * get id of customer
     * @return {Number} id
     */
    getId() {
        return this.id
    }

    /**
     * set id for customer
     * @param {Number} id 
     */
    setId(id) {
        this.id = id;
    }

    /**
     * get createAt
     * @return {Date}
     */
    getCreateAt() {
        return this.createAt;
    }

    /**
     * set createAt
     * @param {Date} createAt
     */
    setCreateAt(createAt) {
        this.createAt = createAt;
    }

    /**
     * get updateAt
     * @return {Date}
     */
    getUpdateAt() {
        return this.updateAt;
    }

    /**
     * set updateAt
     * @param {Date} updateAt
     */
    setUpdateAt(updateAt) {
        this.updateAt = updateAt;
    }

}

module.exports = MaintenanceFee;