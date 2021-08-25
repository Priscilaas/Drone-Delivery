<template>
  <div class="main">
    <Board msg=""/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from '@/components/Board.vue';

@Component({
  components: {
    Board,
  },
})
export default class Main extends Vue {}
</script>
