import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Account } from "@/types/account.ts"

const useAccountStore = defineStore('accounts', () => {
    const accounts = ref<Account[]>(JSON.parse(localStorage.getItem('accounts')) || []) //init/sync from/with localStorage

    function refreshLS(id: number) { // refresh localStorage
        const lsAccounts = JSON.parse(localStorage.getItem('accounts')) || []
        if (lsAccounts.length == 0 || !lsAccounts.find(e => e.id == id)) {
            const newAcc = accounts.value.find(e => e.id == id) //newAcc is already validated
            lsAccounts.push(newAcc)
        }else {
            const targetAcc = accounts.value.find(e => e.id == id)
            const targetLsIdx = lsAccounts.findIndex(e => e.id == id)
            lsAccounts[targetLsIdx] = targetAcc
        }

        localStorage.setItem('accounts', JSON.stringify(lsAccounts))
    }

    function rmAccount(id: number) {
        const lsAccounts = JSON.parse(localStorage.getItem('accounts'))
        let toBeRmIdx = lsAccounts.findIndex(e => e.id == id)

        if(toBeRmIdx == -1) { //not in localStorage
            toBeRmIdx = accounts.value.findIndex(e => e.id == id)
            accounts.value.splice(toBeRmIdx, 1)
            return
        }

        lsAccounts.splice(toBeRmIdx, 1)
        localStorage.setItem('accounts', JSON.stringify(lsAccounts))
        accounts.value = JSON.parse(localStorage.getItem('accounts')) || []
    }

    return {
        accounts,
        refreshLS,
        rmAccount,
    }
})

export default useAccountStore