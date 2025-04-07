<template>
    <div>
      <div class="d-flex">
        <b>Document Timeline</b>
        <v-spacer></v-spacer>
        <small>Document:Technical document specification</small>
      </div>

      <div>
        <template>
        <v-timeline small>
          <v-timeline-item small left class="text-right">
            <b>Document Created</b>
            <br>
            <small>{{fileData.created}}</small> 
            <br>
            <small>{{reviewDays}} days</small>
          </v-timeline-item>
          <v-timeline-item small class="text-right">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex">
                <v-text-field
                  style="max-width: 250px;"
                  v-model="lastVersion.review"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
                <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave">save</v-btn>
                </div>
              </template>
              <v-date-picker
                v-model="lastVersion.review"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
            <b>Review Phase</b>
            <br>
            <small>{{lastVersion.review}}</small> 
            <br>
            <small>{{approvalDays}} days</small>
          </v-timeline-item>
          <v-timeline-item small left class="text-right">
            <v-menu
              v-model="menu3"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex">
                <v-text-field
                  style="max-width: 250px;"
                  v-model="lastVersion.approval"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
                <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave">save</v-btn>
                </div>
              </template>
              <v-date-picker
                v-model="lastVersion.approval"
                @input="menu3 = false"
              ></v-date-picker>
            </v-menu>
            <b>Approval deadline</b>
            <br>
            <small>{{lastVersion.approval}}</small> 
            <br>
            <small>{{ publicationDays }} days</small>
          </v-timeline-item>
          <v-timeline-item small left class="text-right">
            <v-menu
              v-model="menu4"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex">
                <v-text-field
                  style="max-width: 250px;"
                  v-model="lastVersion.publication"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
                <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave">save</v-btn>
                </div>
              </template>
              <v-date-picker
                v-model="lastVersion.publication"
                @input="menu4 = false"
              ></v-date-picker>
            </v-menu>
            <b>Publication Date</b>
            <br>
            <small>{{lastVersion.publication}}</small> 
            <br>
            <small>{{ expirationDays }} days</small>
          </v-timeline-item>
          <v-timeline-item small left class="text-right">
            <v-menu
              v-model="menu5"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex">
                <v-text-field
                  style="max-width: 250px;"
                  v-model="lastVersion.expiration"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
                <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave">save</v-btn>
                </div>
              </template>
              <v-date-picker
                v-model="lastVersion.expiration"
                @input="menu5 = false"
              ></v-date-picker>
            </v-menu>
            <b>Expiration</b>
            <br>
            <small>{{lastVersion.expiration}}</small> 
            <br>
          </v-timeline-item>
        </v-timeline>
        </template>
      </div>

      <div>
        <v-container>
          <b>Timeline Settings</b>
          <v-row>
            <v-col
              cols="6"
            >
            <label>Review Duration</label>
            <v-text-field
              type="number"
              v-model="reviewDays"
              outlined
            ></v-text-field>
            </v-col>
            <v-col
              cols="6"
            >
              <label>Approval Duration</label>
              <v-text-field
                type="number"
                v-model="approvalDays"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col
              cols="6"
            >
            <label>Publication Lead time</label>
            <v-text-field
              type="number"
              v-model="publicationDays"
              outlined
            ></v-text-field>
            </v-col>
            <v-col
              cols="6"
            >
              <label>Document validity</label>
              <v-text-field
                type="number"
                v-model="expirationDays"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            block
            dark
            color="blue"
            elevation="0"
            @click="handleRecalation"
          >Recalculate timeline</v-btn>
        </v-container>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data() {
      return {
        fileData : {},
        lastVersion : {},
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        menu3: false,
        menu4: false,
        menu5: false,
        reviewDays : null,
        approvalDays : null,
        publicationDays : null,
        expirationDays : null
      };
    },
    computed : {
      
    },
    methods: {
      computeDiff(date1,date2){
        var a = new Date(date1)
        var b =  new Date(date2)
        const _MS_PER_DAY = 1000 * 60 * 60 * 24
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
        return Math.floor((utc2 - utc1) / _MS_PER_DAY)
      },
      handleSave(){
        console.log("lastVersion",this.lastVersion)
        axios.post('http://localhost:5000/createVersion',this.lastVersion)
          .then(res => {
            this.fileData = {}
            this.fileData = res.data.fileData
            console.log("filedata response",res.data.fileData)
            this.lastVersion = this.fileData.versions[this.fileData.versions.length-1]
            this.reviewDays = this.computeDiff(this.lastVersion.created,this.lastVersion.review)
            this.approvalDays = this.computeDiff(this.lastVersion.review,this.lastVersion.approval)
            this.publicationDays = this.computeDiff(this.lastVersion.approval,this.lastVersion.publication)
            this.expirationDays = this.computeDiff(this.lastVersion.publication,this.lastVersion.expiration)
          })
          .catch(err=>{
            console.log("error",err)
          })
      },
      handleRecalation(){
        var date = new Date(this.lastVersion.created);
        date.setDate(date.getDate() + this.reviewDays);
        this.lastVersion.review = date.toISOString().split('T')[0]
        date.setDate(date.getDate() + this.approvalDays);
        this.lastVersion.approval = date.toISOString().split('T')[0]
        date.setDate(date.getDate() + this.publicationDays);
        this.lastVersion.publication = date.toISOString().split('T')[0]
        date.setDate(date.getDate() + this.expirationDays);
        this.lastVersion.expiration = date.toISOString().split('T')[0]
      }
    },
    created(){
      axios.get('http://localhost:5000/versions')
        .then(res => {
          this.fileData = {}
          this.fileData = res.data
          this.lastVersion = this.fileData.versions[this.fileData.versions.length-1]
          this.reviewDays = this.computeDiff(this.lastVersion.created,this.lastVersion.review)
          this.approvalDays = this.computeDiff(this.lastVersion.review,this.lastVersion.approval)
          this.publicationDays = this.computeDiff(this.lastVersion.approval,this.lastVersion.publication)
          this.expirationDays = this.computeDiff(this.lastVersion.publication,this.lastVersion.expiration)
        })
        .catch(err=>{
          console.log("error",err)
        })
    }
  };
  </script>
  
  <style scoped>
  </style>