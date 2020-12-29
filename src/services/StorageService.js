import Box from '3box'

export default class Storage {
  async createRetrospective (space, dretroData) {
    let dretros = await this.getRetrospectives(space)
    for (var i = 0; i < dretros.length; i++) {
      if (dretros[i]['name'] === dretroData['name']) {
        dretros[i] = dretroData
        space.public.set('retrospectives', dretros)
        return dretros
      }
    }
    let newDretros = [...dretros, dretroData]
    space.public.set('retrospectives', newDretros)
    return newDretros
  }

  async getRetrospectives (space) {
    let dretros = await space.public.get('retrospectives')
    if (dretros != undefined) {
      console.log('dretros', dretros)
      return dretros
    } else {
      return []
    }
  }

  async getRetrospective (space, name) {
    let dretros = await this.getRetrospectives(space)
    console.log('saving', dretros)
    for (var i = 0; i < dretros.length; i++) {
      console.log(
        'search',
        dretros[i]['url'],
        dretros[i]['name'],
        name,
        dretros[i]['name'] === name,
        dretros[i]['url'] === name
      )
      if (dretros[i]['name'] === name || dretros[i]['url'] === name) {
        console.log('returning', dretros[i])
        return dretros[i]
      }
    }
  }

  async saveRetrospective (space, name, cards) {
    let dretros = await this.getRetrospectives(space)
    console.log('saving', dretros)
    for (var i = 0; i < dretros.length; i++) {
      console.log('search', dretros[i]['name'], name)
      if (dretros[i]['name'] === name) {
        dretros[i].cards = cards
        space.public.set('retrospectives', dretros)
        console.log('saving', dretros)
        return dretros
      }
    }
  }
}
