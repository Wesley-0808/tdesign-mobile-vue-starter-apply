<template>
  <div class="mine-card">
    <t-avatar class="mine-card--avatar" size="large" alt=""></t-avatar>
    <div class="mine-card--content">
      <div class="mine-card--content--info"></div>
      <div class="mine-card--content--edit"></div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.mine-card {
  width: 343px;
  height: 96px;
  border-radius: 12px;
  background: #fff;
  opacity: 1;
  margin: 0 auto;
  .flex-center();

  &--avatar {
    margin-left: 16px;
  }

  &--content {
    flex-grow: 1;
    border: 1px solid #000;
    height: 64px;
    .flex-center(start);

    &--info {
      margin-left: 16px;
      width: 195px;
      height: 54px;
      border: 1px solid #000;
    }

    &--edit {
      // flex-grow: 1;
      margin-left: 16px;
      width: 20px;
      height: 20px;
      border: 1px solid #000;
    }
  }
}
</style>
