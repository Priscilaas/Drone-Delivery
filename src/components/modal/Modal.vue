<template>
    <div>
    <b-modal id="modal-1" :title="'Detalhes do Drone '+nameUser">
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Nome:" label-for="input-sm">
            <p class="my-4">{{nameUser}}</p>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Endereço:" label-for="input-sm">
            <p class="my-4">{{addressUser}}</p>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Velocidade Média:" label-for="input-sm">
            <p class="my-4">{{average_speedUser}}</p>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Bateria:" label-for="input-sm">
            <p class="my-4">{{batteryUser}}</p>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Voo:" label-for="input-sm">
            <p class="my-4">{{flyUser}}</p>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Imagem:" label-for="input-sm">
            <img :src="imageUser" alt="" srcset="">
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Velocidade Máxima:" label-for="input-sm">
            <p class="my-4">{{max_speedUser}}</p>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Status do Voo:" label-for="input-sm">
            <p class="my-4">{{statusUser}}</p>
        </b-form-group>
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

