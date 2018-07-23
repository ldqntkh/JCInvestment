'use strict';

class Locale {
    constructor(LocaleObject) {
        LocaleObject && Object.assign(this, LocaleObject);
        /**
         * id : string
         * name: string
         */
    }

    /**
     * get id
     * @return {String} id
     */
    getId() {
        return this.id;
    }

    /**
     * get name
     * @return {String} locale name
     */
    getName() {
        return this.name;
    }
}

module.exports = Locale;