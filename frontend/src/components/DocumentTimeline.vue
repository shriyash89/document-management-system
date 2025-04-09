<template>
    <div class="grey lighten-4 pa-4">
      <div class="d-flex">
        <b>Document Timeline</b>
        <v-spacer></v-spacer>
        <span>Document:Technical document specification</span>
      </div>

      <div>
        <template>
        <v-timeline small>
          <v-timeline-item small left class="text-right">
            <b>Document Created</b>
            <br>
            <small>{{fileData.created}}</small> 
            <br>
            <small style="display:block;position: absolute;top: 55px;left:340px;min-width: 70px;">{{reviewDays}} days</small>
          </v-timeline-item>
          <v-timeline-item small class="text-right">
            <template v-slot:opposite>
              <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave">save</v-btn>
            </template>
            <b>Review Phase</b>
            <br>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex justify-end">
                  <v-text-field
                    v-model="lastVersion.review"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    style="max-width: 150px;"
                    class="white"
                  ></v-text-field>
                </div>
              </template>
              <v-date-picker
                v-model="lastVersion.review"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu> 
            <br>
            <small style="display:block;position: absolute;top: 105px;left:360px;min-width: 40px;">{{approvalDays}} days</small>
          </v-timeline-item>
          <v-timeline-item small left class="text-right">
            <template v-slot:opposite>
              <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave">save</v-btn>
            </template>
            <b>Approval deadline</b>
            <br>
            <v-menu
              v-model="menu3"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex justify-end">
                <v-text-field
                  v-model="lastVersion.approval"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  hide-details
                  dense
                  outlined
                  style="max-width: 150px;"
                  class="white"
                ></v-text-field>
                </div>
              </template>
              <v-date-picker
                v-model="lastVersion.approval"
                @input="menu3 = false"
              ></v-date-picker>
            </v-menu>
            <br>
            <small style="display:block;position: absolute;top: 105px;left:360px;min-width: 40px;">{{publicationDays}} days</small>
          </v-timeline-item>
          <v-timeline-item small left class="text-right">
            <template v-slot:opposite>
              <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave">save</v-btn>
            </template>
            <b>Publication Date</b>
            <br>
            <v-menu
              v-model="menu4"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex justify-end">
                <v-text-field
                  v-model="lastVersion.publication"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  hide-details
                  dense
                  outlined
                  style="max-width: 150px;"
                  class="white"
                ></v-text-field>
                </div>
              </template>
              <v-date-picker
                v-model="lastVersion.publication"
                @input="menu4 = false"
              ></v-date-picker>
            </v-menu> 
            <br>
            <small style="display:block;position: absolute;top: 105px;left:360px;min-width: 40px;">{{expirationDays}} days</small>
          </v-timeline-item>
          <v-timeline-item small left class="text-right">
            <template v-slot:opposite>
              <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave">save</v-btn>
            </template>
            <b>Expiration</b>
            <br>
            <v-menu
              v-model="menu5"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex justify-end">
                <v-text-field
                  v-model="lastVersion.expiration"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  hide-details
                  dense
                  outlined
                  style="max-width: 150px;"
                  class="white"
                ></v-text-field>
                </div>
              </template>
              <v-date-picker
                v-model="lastVersion.expiration"
                @input="menu5 = false"
              ></v-date-picker>
            </v-menu> 
            <br>
          </v-timeline-item>
        </v-timeline>
        </template>
      </div>

      <div class="white">
        <v-container>
          <b>Timeline Settings</b>
          <v-row class="mt-3">
            <v-col
              cols="6"
            >
            <label>Review Duration</label>
            <v-text-field
              type="number"
              v-model="reviewDays"
              outlined
              dense
            ></v-text-field>
            </v-col>
            <v-col
              cols="6"
            >
              <label>Approval Duration</label>
              <v-text-field
                type="number"
                v-model="approvalDays"
                dense
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
              dense
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
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            block
            dark
            color="blue"
            elevation="0"
            @click="handleRecalculation"
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
      }
    },
    computed : {
      
    },
    methods: {
      computeDiff(a,b){
        const date1 = new Date(a)
        const date2 = new Date(b)
        const diffTime = Math.abs(date2 - date1)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
      },
      handleSave(){
        console.log("lastVersion",this.lastVersion)
        axios.post('http://localhost:5000/createVersion',this.lastVersion)
          .then(res => {
            this.fileData = {}
            this.fileData = res.data.fileData
            console.log("filedata response",res.data.fileData)
            this.lastVersion = this.fileData.versions[this.fileData.versions.length-1]
            this.reviewDays = this.computeDiff(this.fileData.created,this.lastVersion.review)
            this.approvalDays = this.computeDiff(this.lastVersion.review,this.lastVersion.approval)
            this.publicationDays = this.computeDiff(this.lastVersion.approval,this.lastVersion.publication)
            this.expirationDays = this.computeDiff(this.lastVersion.publication,this.lastVersion.expiration)
          })
          .catch(err=>{
            console.log("error",err)
          })
      },
      handleRecalculation(){
        var date = new Date(this.fileData.created)
        date.setDate(date.getDate() + parseInt(this.reviewDays))
        this.lastVersion.review = date.toISOString().split('T')[0]
        date.setDate(date.getDate() + parseInt(this.approvalDays))
        this.lastVersion.approval = date.toISOString().split('T')[0]
        date.setDate(date.getDate() + parseInt(this.publicationDays))
        this.lastVersion.publication = date.toISOString().split('T')[0]
        date.setDate(date.getDate() + parseInt(this.expirationDays))
        this.lastVersion.expiration = date.toISOString().split('T')[0]
        this.lastVersion = this.fileData.versions[this.fileData.versions.length-1]
        this.reviewDays = this.computeDiff(this.fileData.created,this.lastVersion.review)
        this.approvalDays = this.computeDiff(this.lastVersion.review,this.lastVersion.approval)
        this.publicationDays = this.computeDiff(this.lastVersion.approval,this.lastVersion.publication)
        this.expirationDays = this.computeDiff(this.lastVersion.publication,this.lastVersion.expiration)
        this.handleSave()
      }
    },
    created(){
      axios.get('http://localhost:5000/versions')
        .then(res => {
          this.fileData = {}
          this.fileData = res.data
          this.lastVersion = this.fileData.versions[this.fileData.versions.length-1]
          this.reviewDays = this.computeDiff(this.fileData.created,this.lastVersion.review)
          this.approvalDays = this.computeDiff(this.lastVersion.review,this.lastVersion.approval)
          this.publicationDays = this.computeDiff(this.lastVersion.approval,this.lastVersion.publication)
          this.expirationDays = this.computeDiff(this.lastVersion.publication,this.lastVersion.expiration)
        })
        .catch(err=>{
          console.log("error",err)
        })
    }
  }
  </script>
  
  <style scoped>
  </style>