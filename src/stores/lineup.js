import { defineStore } from 'pinia'
import playersData from '../data/players.json'

export const useLineupStore = defineStore('lineup', {
  state: () => ({
    allPlayers: playersData,
    squad: Array(11).fill(null), // 11 slots for the lineup
    formation: '4-3-3', // Default formation
  }),
  getters: {
    availablePlayers: (state) => {
      // Return players that are not currently placed in the squad
      const selectedIds = state.squad.map(p => p?.id).filter(Boolean)
      return state.allPlayers.filter(p => !selectedIds.includes(p.id))
    }
  },
  actions: {
    setFormation(newFormation) {
      this.formation = newFormation
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
