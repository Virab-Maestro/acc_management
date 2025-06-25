<script setup lang="ts">
import { computed } from "vue";
import type { Account } from "@/types/account.ts"
import useAccountStore from "@/stores/accountStore.ts";

const accountStore = useAccountStore()

const props = defineProps<{
      acc: Account
    }>(),
    rules = {
      marks(v) {
        return v?.length <= 50 || 'Макс. кол-во символов - 50'
      },
      login(v) {
        return v?.length <= 100 || 'Макс. кол-во символов - 100'
      },
      pass(v) {
        return v?.length <= 100 || 'Макс. кол-во символов - 100'
      }
    }

const marks = computed({
  get() {
    //[{text: 'XXX'}, {text: 'AA'}]
    let preview = ''
    for(let mark of props.acc.marks) {
      preview += mark.text + ';'
    }

    return preview.slice(0, -1)
  },
  set(v) {
    //'XXX;AA'
    if(v.length > 0) {
      const marksSplit = v.split(';').map(mark => ({ text: mark }))
      props.acc.marks = marksSplit
    }else {
      props.acc.marks = []
    }
  }
})

function editAccount() {
  /* Two ways: build unique fc for every field or
  build one fc that validate every field at once(my choice) */

  if(marks.value.length > 50) {
    return
  }else if(!props.acc.login) {
    return
  }else if(props.acc.login.length > 0 && props.acc.login.length > 100) {
    return
  }else if(props.acc.type === 'local' && !props.acc.pass) {
    return
  }else if(props.acc.type === 'local' && props.acc.pass.length > 1 && props.acc.pass.length > 100) {
    return
  }

  if(props.acc.type === 'ldap') {
    props.acc.pass = null
  }

  accountStore.refreshLS(props.acc.id)
}
</script>

<!--btw, changing props isn't the best practice-->
<!--don't try this at home-->
<template>
  <v-row align='center'>
    <v-col cols='3'>
      <v-text-field placeholder='Значение' density='compact' variant='solo-filled' v-model='marks' :rules="[rules.marks]" @focusout="editAccount" />
    </v-col>
    <v-col cols='3'>
      <v-select :items="['ldap', 'local']" density='compact' variant='solo-filled' v-model='props.acc.type' @update:model-value="editAccount"/>
    </v-col>
    <v-col>
      <v-text-field density='compact' variant='solo-filled' v-model='props.acc.login' :rules="[(v) => v?.length > 0 || 'Введите логин', rules.login]" @focusout="editAccount" />
    </v-col>
    <v-col cols='3' v-if='props.acc.type === "local"'>
      <v-text-field density='compact' variant='solo-filled' v-model='props.acc.pass' :rules="[(v) => v?.length > 0 || 'Введите пароль', rules.pass]" @focusout="editAccount" />
    </v-col>

    <v-btn class='mb-6' icon='mdi-trash-can-outline' size='small' variant='flat' @click="accountStore.rmAccount(props.acc.id)"/>
  </v-row>
</template>

<style scoped>

</style>