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
              <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave('review')">save</v-btn>
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
              <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave('approval')">save</v-btn>
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
              <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave('publication')">save</v-btn>
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
              <v-btn small dark color="blue" class="ml-4 mt-4" @click="handleSave('expiration')">save</v-btn>
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
              v-model="tempReviewDays"
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
                v-model="tempApprovalDays"
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
              v-model="tempPublicationDays"
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
                v-model="tempExpirationDays"
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
            @click="handleRecalculation('input')"
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
        initialreviewDate:null,
        initialapprovalDate:null,
        initialpublicationDate:null,
        initialexpirationDate:null,
        reviewDays : null,
        approvalDays : null,
        publicationDays : null,
        expirationDays : null,
        tempReviewDays : null,
        tempApprovalDays : null,
        tempPublicationDays : null,
        tempExpirationDays : null
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
      saveTimelineInBackend(){
        axios.post('http://localhost:5000/createVersion',this.lastVersion)
          .then(res => {
            this.fileData = {}
            this.fileData = res.data.fileData
            this.lastVersion = this.fileData.versions[this.fileData.versions.length-1]
            this.$emit('updateVersions',this.lastVersion)
          })
          .catch(err=>{
            console.log("error",err)
          })
      },
      handleSave(phase){
        if(this.lastVersion.review<this.fileData.created || this.lastVersion.approval<this.lastVersion.review || this.lastVersion.publication<this.lastVersion.approval || this.lastVersion.expiration<this.lastVersion.publication){
          alert("enter a valid timeline")
          return null
        }
        const initVal = 'initial'+phase+'Date'
        alert("intial"+this[initVal]+"   changed"+this.lastVersion[phase])
        if(this[initVal]==this.lastVersion[phase]){
          alert("value is not changed")
          return null
        }
        else{
          this[initVal]=this.lastVersion[phase]
        }
        if(this.lastVersion[phase])
        this.lastVersion = this.fileData.versions[this.fileData.versions.length-1]
        if(phase=="review"){
          this.reviewDays = this.computeDiff(this.fileData.created,this.lastVersion.review)
        }else if(phase=="approval")
          this.approvalDays = this.computeDiff(this.lastVersion.review,this.lastVersion.approval)
        else if(phase=="publication")
          this.publicationDays = this.computeDiff(this.lastVersion.approval,this.lastVersion.publication)
        else 
          this.expirationDays = this.computeDiff(this.lastVersion.publication,this.lastVersion.expiration)
        this.handleRecalculation()
      },
      handleRecalculation(input){
        if(input==="input"){
          this.reviewDays = this.tempReviewDays;
          this.approvalDays = this.tempApprovalDays
          this.publicationDays = this.tempPublicationDays
          this.expirationDays = this.tempExpirationDays
        }
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
        console.log("lastversion",this.lastVersion)
        this.saveTimelineInBackend()
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
          this.initialreviewDate = this.lastVersion.review
          this.initialapprovalDate = this.lastVersion.approval
          this.initialpublicationDate = this.lastVersion.publication
          this.initialexpirationDate = this.lastVersion.expiration
        })
        .catch(err=>{
          console.log("error",err)
        })
    },
    watch:{
      reviewDays(newVal){
        this.tempReviewDays = newVal
      },
      approvalDays(newVal){
        this.tempApprovalDays = newVal
      },
      publicationDays(newVal){
        this.tempPublicationDays = newVal
      },
      expirationDays(newVal){
        this.tempExpirationDays = newVal
      }
    }
  }
  </script>
  
  <style scoped>
  </style>