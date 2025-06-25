<script setup lang='ts'>
import Account from "@/components/Account.vue"
import useAccountStore from '@/stores/accountStore.ts'

const accountStore = useAccountStore()
</script>

<template>
  <v-row class='mt-5 text-grey-darken-1' justify='center'>
    <v-col>Метки</v-col>
    <v-col>Тип записи</v-col>
    <v-col>Логин</v-col>
    <v-col>Пароль</v-col>
  </v-row>

  <Account v-for='acc in accountStore.accounts' :acc/>
</template>

<style scoped>

</style>