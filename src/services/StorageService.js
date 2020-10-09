import Box from "3box";

export default class Storage {

    async createRetrospective(space, dretroData) {
        let dretros = await this.getRetrospectives(space);
        for (var i = 0; i < dretros.length; i++){
            if (dretros[i]['name'] === dretroData['name']){
                dretros[i] = dretroData;
                space.public.set("retrospectives", dretros);
                return dretros;
            }
        }
        let newDretros = [...dretros, dretroData];
        space.public.set("retrospectives", newDretros);
        return newDretros;
    }

    async getRetrospectives(space) {
        let dretros = await space.public.get("retrospectives");
        if (dretros != undefined){
            return dretros;
        } else {
            return [];
        }
    }
}