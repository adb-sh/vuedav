<template>
  <div class="card sideMenu sticky-top">
    <div class="card-header">Menu</div>
    <div class="card-body">
      <router-link class="py-2" to="/files">
        <i class="bi-archive"></i> My Files
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sideMenu {
  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
