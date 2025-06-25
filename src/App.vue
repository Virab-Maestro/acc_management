<script setup lang="ts">
import AccountList from "@/components/AccountList.vue"
import useAccountStore from "@/stores/accountStore.ts"

const accountStore = useAccountStore()

function addAccount(): void {
  accountStore.accounts.push({
    id: Math.floor(Math.random() * 1000), //random id
    type: "local",
  })
}
</script>

<template>
  <v-container>
    <div class="d-flex ga-3 mb-5">
      <h2>Учетные записи</h2>
      <v-btn icon="mdi-plus" size="small" @click="addAccount"/>
    </div>

    <v-alert
      text="Для указания нескольких методов для одной пары логин/пароль используйте разделитель ;"
      type="info"
      density="compact"
    ></v-alert>

    <AccountList />
  </v-container>
</template>

<style scoped>
</style>
