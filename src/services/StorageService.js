import Box from "3box";

export default class Storage {

    async createRetrospective(box, spaceName) {
        return await box.openSpace(spaceName);
    }

    async getRetrospectives(address) {
        return await Box.listSpaces(address);
    }

    async createColumnList(box, columnName, spaceName) {
        let space = await box.openSpace(spaceName);
        let column = space.joinThread(columnName);
        return column;
    }

    async getCards(column) {
        return await column.getPosts();
    }

    async createCard(column, cardName) {
        let card = await column.post(cardName);
        return card;
    }

    async getColumnMembers(column) {
        return await column.listMembers();
    }

    async addColumnMember(address, column) {
        return await column.addMember(address);
    }
}