<template>
  <form-render @confirm="onConfirm" />
</template>
<script setup lang="ts">
import FormRender from '@/components/form';
import { useUsersStore } from '@/store/modules/users';
import type { UserInfo } from '@/types/interface';

const userStoreRefs = useUsersStore();

interface FormData extends UserInfo {
  setDefault: boolean;
}

const onConfirm = (result: object | boolean, data: FormData) => {
  if (result === true) {
    const { setDefault, occupation } = data;
    userStoreRefs.addUser(
      {
        ...data,
        occupation: occupation?.[0],
      },
      setDefault,
    );
  }
};
</script>
