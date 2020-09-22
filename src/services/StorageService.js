import Box from "3box";

export default class Storage {

    async createRetrospective(box, spaceName) {
        return await box.openSpace("dretros-"+spaceName);
    }

    async getRetrospective(box, retrospectiveName){
        return await box.openSpace(retrospectiveName);
    }

    async getRetrospectives(address) {
        let retros = await Box.listSpaces(address);
        let dretros = retros.filter((retro) => retro.includes('dretros-'));
        return dretros;
    }

    async joinRetrospective(box, spaceName, owner, columnAddress) {
        let space = await box.openSpace("dretros-"+spaceName);
        space.public.set("owner", owner);
        space.public.set("columnAddress", columnAddress);
        return space;
    }

    async updateRetrospectiveMetaData(retrospective, key, value) {
        return retrospective.public.set(key, value);
    }

    async getRetrospectiveMetaData(retrospective, key){
        return await retrospective.public.get(key);
    }

    async createColumn(owner, box, retroName, columnName){
        let space = await box.openSpace(retroName);
        let column = await space.joinThread(columnName, {firstModerator: owner, members: true});
        return column;
    }

    async joinColumn(box, retroName, columnAddress){
        let space = await box.openSpace(retroName);
        let column = await space.joinThread(columnAddress);
        return column;
    }

    async addColumnMember(memberAddress, column) {
        return await column.addMember(memberAddress);
    }

    async getCards(column) {
        return await column.getPosts();
    }

    async createCard(column, card) {
        let result = await column.post(card);
        return result;
    }

    async deleteCard(column, cardId) {
        return await column.deletePost(cardId);
    }
}