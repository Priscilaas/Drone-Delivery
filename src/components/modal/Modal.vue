

<template>
    <div>
    <b-modal id="modal-prevent-closing"  :ref="modal" title="Submit Your Name" >
        <!-- <b-form-group label-cols-lg="3" label="Shipping Address" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0" >
            <b-form-group label="Street:" label-for="nested-street" label-cols-sm="3" label-align-sm="right" >
                <b-form-input v-model="nameUser"></b-form-input>
                <b-form-input v-model="addressUser"></b-form-input>
                <b-form-input v-model="average_speedUser"></b-form-input>
                <b-form-input v-model="batteryUser"></b-form-input>
                <b-form-input v-model="flyUser"></b-form-input>
            </b-form-group>
        </b-form-group> -->
    </b-modal>
    </div>

   
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {

    @Prop() private title!: string;
    @Prop() private idUser!: number;
    @Prop() private nameUser!: string;
    @Prop() private addressUser!: string;
    @Prop() private average_speedUser!: string;
    @Prop() private batteryUser!: number;
    @Prop() private flyUser!: string;
    @Prop() private imageUser!: string;
    @Prop() private max_speedUser!: string;
    @Prop() private statusUser!: string;
    @Prop() private modal!: string;

    public CloseModal() {
        this.idUser = 0
        this.nameUser = ''
        this.addressUser = ''
        this.average_speedUser = ''
        this.batteryUser = 0
        this.flyUser = ''
        this.imageUser = ''
        this.max_speedUser = ''
        this.statusUser = ''
    };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
</style>
