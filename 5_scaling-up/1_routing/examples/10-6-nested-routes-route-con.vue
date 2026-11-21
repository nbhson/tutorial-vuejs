<!-- User.vue — RouterView lồng nhau -->
<template>
  <h2>Người dùng #{{ route.params.id }}</h2>
  <nav>
    <RouterLink :to="`/user/${route.params.id}/profile`">Hồ sơ</RouterLink>
    <RouterLink :to="`/user/${route.params.id}/posts`">Bài viết</RouterLink>
  </nav>
  <RouterView />   <!-- route con render ở đây -->
</template>
