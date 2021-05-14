<template>
  <v-app dark>
    <v-app-bar app> Online Tic Tac Toe </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer app>
      <span>&copy; mGGk {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
