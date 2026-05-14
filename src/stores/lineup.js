import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { formations } from '../data/formations'

export const useLineupStore = defineStore('lineup', () => {
  // State
  const activeFormation = ref('4-3-3')
  const players = ref({}) // { 'gk': { id: 1, name: 'Pelé', ... }, 'lb': { ... } }
  
  // Load from LocalStorage on mount
  const savedState = localStorage.getItem('wc-lineup')
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState)
      if (parsed.activeFormation) activeFormation.value = parsed.activeFormation
      if (parsed.players) players.value = parsed.players
    } catch (e) {
      console.error('Failed to parse saved lineup', e)
    }
  }
  
  // Watch for changes and save to LocalStorage automatically (Task 4)
  watch([activeFormation, players], () => {
    localStorage.setItem('wc-lineup', JSON.stringify({
      activeFormation: activeFormation.value,
      players: players.value
    }))
  }, { deep: true })
  
  // Actions
  const setFormation = (formationStr) => {
    if (!formations[formationStr]) return
    activeFormation.value = formationStr
    
    // When changing formations, we should ideally keep players in similar positions,
    // but for simplicity, we just clear the players that no longer fit the new node IDs
    const newNodes = formations[formationStr].map(n => n.id)
    const newPlayers = {}
    for (const key in players.value) {
      if (newNodes.includes(key)) {
        newPlayers[key] = players.value[key]
      }
    }
    players.value = newPlayers
  }
  
  const setPlayer = (slotId, playerObj) => {
    players.value[slotId] = playerObj
  }
  
  const removePlayer = (slotId) => {
    delete players.value[slotId]
  }
  
  const clearLineup = () => {
    players.value = {}
  }
  
  return {
    activeFormation,
    players,
    setFormation,
    setPlayer,
    removePlayer,
    clearLineup
  }
})
