<template>
    <div>
    <b-modal id="modal-1" :title="'Detalhes do Drone '+nameUser">
        <div class="row">
            <label class="text-info col-md-4">Nome:</label>
            <span class="ml-4 col-md-4">{{nameUser}}</span>
        </div>
        <div class="row">
            <label class="text-info col-md-4">Endereço:</label>
            <p class="ml-4 col-md-4">{{addressUser}}</p>
        </div>
        <div class="row">
            <label class="text-info col-md-4">Velocidade Média:</label>
            <p class="ml-4 col-md-4">{{average_speedUser}}</p>
        </div>
        <div class="row">
            <label class="text-info col-md-4">Bateria:</label>
            <p class="ml-4 col-md-4">{{batteryUser}}</p>
        </div>
        <div class="row">
            <label class="text-info col-md-4">Voo:</label>
            <p class="ml-4 col-md-4">{{flyUser}}</p>
        </div>
        <div class="row">
            <label class="text-info col-md-4">Imagem:</label>
            <img :src="imageUser" alt="" srcset="">
        </div>
        <div class="row">
            <label class="text-info col-md-4">Velocidade Máxima:</label>
            <p class="ml-4 col-md-4">{{max_speedUser}}</p>
        </div>
        <div class="row">
            <label class="text-info col-md-4">Status do Voo:</label>
            <p class="ml-4 col-md-4">{{statusUser}}</p>
        </div>
    </b-modal>

    </div>

   
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {

    @Prop() private idUser!: number;
    @Prop() private nameUser!: string;
    @Prop() private addressUser!: string;
    @Prop() private average_speedUser!: string;
    @Prop() private batteryUser!: number;
    @Prop() private flyUser!: string;
    @Prop() private imageUser!: string;
    @Prop() private max_speedUser!: string;
    @Prop() private statusUser!: string;

   
}
</script>

