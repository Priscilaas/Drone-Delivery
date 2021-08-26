

<template>
    <div class="container">
        <nav class="d-flex text-info">
            <b-form-group class="col-md-2" id="droneId" label="Drone Id" label-for="droneId">
                <b-form-input></b-form-input>
            </b-form-group>

            <b-form-group class="col-md-4" id="name" label="Name" label-for="filter-name" >
                <b-input-group>
                    <b-form-input id="filter-name" v-model="filter" type="search"></b-form-input>
                </b-input-group>
            </b-form-group>

            <b-form-group class="col-md-3" id="current" label="Current Fly" label-for="current">
                <b-form-select></b-form-select>
            </b-form-group>

            <b-form-group class="col-md-3" id="status" label="Status" label-for="status">
                <b-form-select id="status" v-model="status" :options="status"></b-form-select>
            </b-form-group>
        </nav>

        <section>
            <b-table id="droneTable" striped hover :fields="fields" :items="registros" :per-page="perPage" :current-page="currentPage" :filter="filter">
                    <template v-slot:row()="data">
                        <b-tr @click="OpenModal(data.item.id)"></b-tr>
                    </template>
                    <template v-slot:cell(id)="data">
                        <span class="text-info">{{data.item.id}}</span>
                    </template>
                    <template v-slot:cell(name)="data">
                        <div class="d-flex align-items-center">
                            <b-avatar class="mr-2" variant="info" :src="data.item.image" alt="" srcset=""></b-avatar>
                            <div class="d-flex flex-column">
                                <b class="d-flex text-info">{{data.item.name}}</b>
                                <small class="text-info fsmall">{{data.item.address}}</small>
                            </div>
                        </div>
                        
                    </template>
                    <template v-slot:cell(battery)="data">
                        <b-progress v-b-popover.hover.top="data.item.battery +'%'" @mouseover="hover = true" @mouseleave="hover = false" :value="data.item.battery" :max="100"  animated></b-progress>
                    </template>

                    <template v-slot:cell(max_speed)="data">
                        <span class="text-info">{{Math.trunc(data.item.max_speed)}}</span><span class="text-info fsmall">.{{decimal(data.item.max_speed)}}m/h</span>
                    </template>

                    <template v-slot:cell(average_speed)="data">
                        <span class="text-info">{{Math.trunc(data.item.average_speed)}}</span><span class="text-info fsmall">.{{decimal(data.item.average_speed)}}m/h</span>
                    </template>
                    <template v-slot:cell(fly)="data">
                        <span class="slidecontainer">
                            <hr v-if="data.item.status == 'charging' || data.item.status == 'offline'"  class="hr-dashed" :value="data.item.fly" type="range" min="0" max="100">
                            <button class="clearButton" v-else-if="data.item.fly >= 50" v-b-popover.hover.top="'Going - '+ data.item.fly+'%'"><input  class="slider left" :value="data.item.fly" type="range" min="0" max="100" disabled></button>
                            <button class="clearButton" v-else v-b-popover.hover.top="'Coming - '+ data.item.fly+'%'"><input  class="slider right" :value="data.item.fly" type="range" min="0" max="100" disabled></button>
                        </span>
                    </template>
                    <template v-slot:cell(status)="data">
                        <button v-if="data.item.status == 'delayed'" type="button" class="status btn btn-warning btn-outline-light text-uppercase" >{{data.item.status}}</button>
                        <button v-else-if="data.item.status == 'fail'" type="button" class="status btn btn-danger btn-outline-light text-uppercase" >{{data.item.status}}</button>
                        <button v-else type="button" class="status btn btn-primary text-uppercase" >{{data.item.status}}</button>
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
                { key:'id', label: 'Drone', sortable: true},
                { key:'name', label:'Customer'},
                { key:'battery', label:'Batteries', sortable: true},
                { key:'max_speed', label:'Max Speed'},
                { key:'average_speed', label:'Average Speed'},
                { key:'fly', label:'Current Fly'},
                { key:'status', label:'Status', sortable: true}
                ];
    status: string[] = ['Sucess', 'Delayed', 'Flying', 'Fail', 'Offline','Charging'];
    hover: boolean = false;
    filter = null;
    number: number = 0;
    titleModal: string = ''
    contentModal: string = ''


    @Prop() private msg!: string;
    
    // sortOptions() {
    //     // Create an options list from our fields
    //     return this.fields
    //         .filter(f => f.sortable)
    //         .map(f => {
    //             return { text: f.label, value: f.key }
    //         })
    // }
    public  decimal(num: number): String {
      let number = (num + "").split(".")[1]
      return number
    }

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


    
    
    OpenModal(id:any) {
        console.log('teste')
    };
    // ResetModal() {
    //     this.titleModal = ''
    //     this.contentModal = ''
    // };
    // onFiltered(filteredItems) {
    //     // Trigger pagination to update the number of buttons/pages due to filtering
    //     this.totalRows = filteredItems.length
    //     this.currentPage = 1
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
</style>
