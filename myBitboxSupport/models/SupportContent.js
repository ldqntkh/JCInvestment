'use strict';

class SupportContent {

    constructor(SupportContentObject) {
        SupportContentObject && Object.assign(this, SupportContentObject);
        /**
         * contentId : String
         * supportId : String
         * type : Number
         * typeRequest : Number
         * content : String
         * lastUpdate : DateTime
         */
    }

    /**
     * get support content id
     * @return {String}
     */
    getContentId() {
        return this.contentId;
    }

    /**
     * set new support content id
     * @param {String} contentId 
     */
    setContentId(contentId) {
        this.contentId = contentId;
    }

    /**
     * get support id
     * @return {String}
     */
    getSupportId() {
        return this.supportId;
    }

    /**
     * set new support id
     * @param {String} supportId 
     */
    setSupportId(supportId) {
        this.supportId = supportId;
    }

    /**
     * get support content type 0: image, 1: text
     * @return {String}
     */
    getSupportContentType() {
        return this.type;
    }

    /**
     * set new support content type
     * @param {Number} type 
     */
    setSupportContentType(type) {
        this.type = type;
    }

    /**
     * get type request 0: client, 1: user
     */
    getTypeRequest() {
        return this.typeRequest;
    }

    /**
     * set new type request 0: client, 1: user
     * @param {Number} typeRequest 
     */
    setTypeRequest(typeRequest) {
        this.typeRequest = typeRequest;
    }

    /**
     * get content support
     * @return {String}
     */
    getContent() {
        return this.content;
    }

    /**
     * set new content support
     * @param {String} content 
     */
    setContent(content) {
        this.content = content;
    }

    /**
     * get last time update
     * @return {DateTime}
     */
    getLastUpdate() {
        return this.lastUpdate;
    }

    /**
     * set new last time update
     * @param {DateTime} lastUpdate 
     */
    setLastUpdate(lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
}

module.exports = SupportContent;