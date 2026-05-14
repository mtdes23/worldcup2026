import { defineStore } from 'pinia'
import playersData from '../data/players.json'
import { formations, getFormationData, getFormationKeys } from '../data/formations.js'

export const useLineupStore = defineStore('lineup', {
  state: () => ({
    allPlayers: playersData,
    squad: Array(11).fill(null), // 11 slots for the lineup
    formationKey: '4-3-3', // Default formation
  }),
  getters: {
    availablePlayers: (state) => {
      // Return players that are not currently placed in the squad
      const selectedIds = state.squad.map(p => p?.id).filter(Boolean)
      return state.allPlayers.filter(p => !selectedIds.includes(p.id))
    },
    currentFormation: (state) => getFormationData(state.formationKey),
    allFormationKeys: () => getFormationKeys(),
    allFormationsList: () => formations
  },
  actions: {
    setFormation(newKey) {
      this.formationKey = newKey
    },
    addPlayerToSquad(player, index) {
      this.squad[index] = player
    },
    removePlayerFromSquad(index) {
      this.squad[index] = null
    },
    resetSquad() {
      this.squad = Array(11).fill(null)
    }
  }
})
