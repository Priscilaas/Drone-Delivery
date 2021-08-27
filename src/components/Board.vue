

<template>
    <div class="container">
        <modal v-if="showModal" @close="CloseModal()" 
        :idUser="idUser" :title="nameUser" :nameUser="nameUser" :addressUser="addressUser"
        :average_speedUser="average_speedUser"  :batteryUser="batteryUser" :flyUser="flyUser" :imageUser="imageUser"
        :max_speedUser="max_speedUser" :statusUser="statusUser"
        />
        
        <nav class="d-flex text-info">
            <b-form-group class="col-md-2" id="id" label="Drone Id" label-for="filter-id">
                <b-input-group>
                    <b-form-input id="filter-id" v-model="filterId" type="search"></b-form-input>
                </b-input-group>
            </b-form-group>

            <b-form-group class="col-md-4" id="name" label="Name" label-for="filter-name" >
                <b-input-group>
                    <b-form-input id="filter-name" v-model="filterName" type="search"></b-form-input>
                </b-input-group>
            </b-form-group>

            <b-form-group class="col-md-3" id="current" label="Current Fly" label-for="current">
                <b-form-select data-field="status"  id="filter-fly" v-model="filterFly" :options="currentFly"></b-form-select>
            </b-form-group>

            <b-form-group class="col-md-2" id="status" label="Status" label-for="status">
                <b-form-select data-field="status"  id="status" v-model="filterStatus" :options="status"></b-form-select>
            </b-form-group> 

            <b-form-group class="col-md-1 d-flex align-items-end" >
                 <button type="button" id="clear" @click="FilterClrear()" class="btn btn-secondary btn-outline-light">Clear</button>
            </b-form-group>            
        </nav>

        <section>
            
            <b-table id="droneTable"  striped hover :fields="fields" :items="filterGet" :per-page="perPage" :current-page="currentPage">
                    <template v-slot:cell(id)="data" >
                        <span @click="OpenModal(data.item.id)" v-b-modal.modal-1 id="id" class="text-info">{{data.item.id}}</span>
                    </template>
                    <template v-slot:cell(name)="data" >
                        <div class="d-flex align-items-center" @click="OpenModal(data.item.id)" v-b-modal.modal-1>
                            <b-avatar class="mr-2" variant="info" :src="data.item.image" alt="" srcset=""></b-avatar>
                            <div class="d-flex flex-column">
                                <b class="d-flex text-info" id="name" >{{data.item.name}}</b>
                                <small class="text-info fsmall">{{data.item.address}}</small>
                            </div>
                        </div>
                        
                    </template>
                    <template v-slot:cell(battery)="data" >
                        <span @click="OpenModal(data.item.id)" v-b-modal.modal-1>
                            <b-progress v-b-popover.hover.top="data.item.battery +'%'" @mouseover="hover = true" @mouseleave="hover = false" :value="data.item.battery" :max="100"  animated></b-progress>
                        </span>
                    </template>

                    <template v-slot:cell(max_speed)="data">
                        <span @click="OpenModal(data.item.id)" v-b-modal.modal-1>
                            <span class="text-info">{{Math.trunc(data.item.max_speed)}}</span><span class="text-info fsmall">.{{decimal(data.item.max_speed)}}m/h</span>
                        </span>
                    </template>

                    <template v-slot:cell(average_speed)="data" >
                        <span @click="OpenModal(data.item.id)" v-b-modal.modal-1>
                            <span class="text-info">{{Math.trunc(data.item.average_speed)}}</span><span class="text-info fsmall">.{{decimal(data.item.average_speed)}}m/h</span>
                        </span>
                    </template>
                    <template v-slot:cell(fly)="data">
                        <span class="slidecontainer" @click="OpenModal(data.item.id)" v-b-modal.modal-1 id="fly">
                            <hr v-if="data.item.status == 'charging' || data.item.status == 'offline'"  class="hr-dashed" :value="data.item.fly" type="range" min="0" max="100">
                            <button class="clearButton" v-else-if="data.item.fly >= 50" v-b-popover.hover.top="'Going - '+ data.item.fly+'%'"><input  class="slider left" :value="data.item.fly" type="range" min="0" max="100" disabled></button>
                            <button class="clearButton" v-else v-b-popover.hover.top="'Coming - '+ data.item.fly+'%'"><input  class="slider right" :value="data.item.fly" type="range" min="0" max="100" disabled></button>
                        </span>
                    </template>
                    <template v-slot:cell(status)="data" id="status" >
                        <button v-if="data.item.status == 'delayed'" type="button" @click="OpenModal(data.item.id)" v-b-modal.modal-1 class="status btn btn-warning btn-outline-light text-uppercase" >{{data.item.status}}</button>
                        <button v-else-if="data.item.status == 'fail'" type="button"  @click="OpenModal(data.item.id)" v-b-modal.modal-1 class="status btn btn-danger btn-outline-light text-uppercase" >{{data.item.status}}</button>
                        <button v-else type="button" class="status btn btn-primary text-uppercase" @click="OpenModal(data.item.id)" v-b-modal.modal-1>{{data.item.status}}</button>
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
import Modal from '../components/modal/Modal.vue'

@Component({
  components: {
    Modal,
  },
})
export default class Board extends Vue {

    registros: object[] = []
    rows: number = 0;
    perPage: number = 20;
    currentPage: number = 1;
    fields: object[] = [
                { key:'id', label: 'Drone', sortable: true, },
                { key:'name', label:'Customer'},
                { key:'battery', label:'Batteries', sortable: true},
                { key:'max_speed', label:'Max Speed'},
                { key:'average_speed', label:'Average Speed'},
                { key:'fly', label:'Current Fly'},
                { key:'status', label:'Status', sortable: true}
                ];
    status: string[] = ['Sucess', 'Delayed', 'Flying', 'Fail', 'Offline','Charging'];
    currentFly: string[] = ['Going', 'Coming', 'All'];
    hover: boolean = false;
    number: number = 0;
    showModal: boolean = false;
    idUser: number = 0;
    nameUser: string = '';
    addressUser: string = '';
    average_speedUser: string = '';
    batteryUser: number = 0;
    flyUser: string = '';
    imageUser: string = '';
    max_speedUser: string = '';
    statusUser: string = '';
    filterId: string = '';
    filterName: string = '';
    filterFly: string = '';
    filterStatus: string = '';
    
    
    @Prop() private msg!: string;

    public OpenModal(id:number) {
        this.showModal = true
        this.getDroneId(id)
    };
    
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
    
    public decimal(num: number): String {
      let number = (num + "").split(".")[1]
      return number
    }

    public getDroneId(id: number){
        DronesServices.getDroneId(id)
        .then((response) => {
            this.idUser = response.data.id
            this.nameUser = response.data.name
            this.addressUser = response.data.address
            this.average_speedUser = response.data.average_speed
            this.batteryUser = response.data.battery
            this.flyUser = response.data.fly
            this.imageUser = response.data.image
            this.max_speedUser = response.data.max_speed
            this.statusUser = response.data.status
        })
        .catch((e) => {
            console.log(e);
        });
    };
    public FilterClrear(){
        this.filterId = '';
        this.filterName = '';
        this.filterFly = '';
        this.filterStatus = '';
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

    get filterGet() {
        if (this.filterId !== '') {
      	    return this.registros.filter((item) => {
        	    return item.id == this.filterId
            })
        }else if (this.filterName !== '') {
      	    return this.registros.filter((item) => {
        	    return item.name.toLowerCase().match(this.filterName.toLowerCase())
            })
        }else if(this.filterFly !== '') {
      	    return this.registros.filter((item) => {
                if(this.filterFly == 'Going'){
                    return item.fly >= 50 && !(item.status.toLowerCase()).match('OFFLINE'.toLowerCase())&& !(item.status.toLowerCase()).match('CHARGING'.toLowerCase())
                }else if(this.filterFly == 'Coming' ){
                    return item.fly < 50 && !(item.status.toLowerCase()).match('OFFLINE'.toLowerCase())&& !(item.status.toLowerCase()).match('CHARGING'.toLowerCase())
                }else{
                    return item.fly
                }
            })
        }else if(this.filterStatus !== '') {
      	    return this.registros.filter((item) => {
        	    return (item.status.toLowerCase()).match(this.filterStatus.toLowerCase())
            });
        }
      return this.registros;
    }



    

}
</script>

