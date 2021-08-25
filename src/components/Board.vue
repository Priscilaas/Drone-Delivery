

<template>
    <div class="container">
        <nav class="d-flex text-info">
            <b-form-group class="col-md-2" id="droneId" label="Drone Id" label-for="droneId">
                <b-form-input></b-form-input>
            </b-form-group>

            <b-form-group class="col-md-4" id="name" label="Name" label-for="name">
                <b-form-input></b-form-input>
            </b-form-group>

            <b-form-group class="col-md-3" id="current" label="Current Fly" label-for="current">
                <b-form-select></b-form-select>
            </b-form-group>

            <b-form-group class="col-md-3" id="status" label="Status" label-for="status">
                <b-form-select id="status" v-model="status" :options="status"></b-form-select>
            </b-form-group>
        </nav>

        <section>
            <b-table id="droneTable" striped hover :fields="fields" :items="registros" :per-page="perPage" :current-page="currentPage">
                    <template v-slot:cell(id)="data">
                        <span class="text-info">{{data.item.id}}</span>
                    </template>
                    <template v-slot:cell(name)="data">
                        <div>
                            <img :src="data.item.image" alt="" srcset="">
                            <span class="text-info">{{data.item.name}}</span>
                        </div>
                        
                    </template>
                    <template v-slot:cell(battery)="data">
                        <b-progress v-b-tooltip.hover :title="data.item.battery +'%'" @mouseover="hover = true" @mouseleave="hover = false" :value="data.item.battery" :max="100"  animated></b-progress>
                    </template>

                    <template v-slot:cell(max_speed)="data">
                        <span class="text-info">{{data.item.max_speed}}m/h</span>
                    </template>

                    <template v-slot:cell(average_speed)="data">
                        <span class="text-info">{{data.item.average_speed}}m/h</span>
                    </template>
                    <template v-slot:cell(fly)="data">
                        <span class="text-info">{{data.item.fly}}</span>
                    </template>
                    <template v-slot:cell(status)="data">
                        <button type="button" class="btn btn-primary btn-outline-light" :style="{color: +'white', background: 'lightblue'}">{{data.item.status}}</button>
                    </template>
            </b-table>
        </section>

        <footer class="d-flex justify-content-center overflow-auto">
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="droneTable"></b-pagination>
        </footer>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DronesServices from '../services/DronesServices';

@Component
export default class Board extends Vue {

    registros: object[] = []
    rows: number = 0;
    perPage: number = 20;
    currentPage: number = 1;
    fields: object[] = [
                { key:'id', label: 'Drone'},
                { key:'name', label:'Customer'},
                { key:'battery', label:'Batteries'},
                { key:'max_speed', label:'Max Speed'},
                { key:'average_speed', label:'Average Speed'},
                { key:'fly', label:'Current Fly'},
                { key:'status', label:'Status'}
                ];
    status: string[] = ['Sucess', 'Delayed', 'Flying', 'Fail', 'Offline','Charging'];
    hover: boolean = false;
    // statusBackground: string = ""


    @Prop() private msg!: string;
    

    mounted(){
        DronesServices.getAll()
        .then((response) => {
            this.registros = response.data
            this.rows = this.registros.length
            
        })
        .catch((e) => {
            console.log(e);
        });
       
    };
    
    methods(){
        // statusBackground(): object{
        //     return console.log('azul')
        // }
        // changePage(this.page){
        //     this.currentPage = this.page;
        // }
    };
    
        
    
    
        
    
        



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
</style>
