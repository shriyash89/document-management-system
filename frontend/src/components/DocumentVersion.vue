<template>
  <div>
    <div class="d-flex">
      <b>Document Versions</b>
      <v-spacer></v-spacer>
      <v-btn v-if="!showCompare" depressed small @click="showCompare=true">
        Compare
      </v-btn>
      <v-btn v-else depressed color="blue" small @click="handleCancelCompare()">
        Cancel Compare
      </v-btn>
    </div>
    <div class="my-4 pa-0">
        <v-card
          v-for="version in tillAllVersions"
          :key="version.id"
          class="mx-auto mb-3 pa-3"
          :class="{selectCard : isThisClass(version.id)}"
          max-width="344"
          outlined
          @click="selecteVersion(version)"
        >
          <div class="d-flex">
            <div>
              <span class="text-h6 pa-0 ma-0">
                {{version.name}}
              </span>
              <v-list-item-subtitle style="color:grey;">{{version.created}}</v-list-item-subtitle>
            </div>
            <v-spacer></v-spacer>
            <v-chip dark :color="`${chipColor(version.state)}`" class="mr-4 mt-4 pa-3 pr-3"><span>{{version.state}}</span></v-chip>
          </div>
        </v-card>
    </div>
    <div v-if="selectedVersion" class="my-5">
      <template>
        <v-card
          class="mx-auto pa-4 blue-grey lighten-5"
          max-width="344"
        >
          <div class="d-flex mb-3">
            <h3>Version Details</h3>
            <v-spacer></v-spacer>
            <v-btn text large color="blue" v-if="!showEdit" small @click="showEdit=true">edit 
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <div v-if="showEdit">
              <v-btn small dark color="red" @click="showEdit=false">cancel</v-btn>
              <v-btn small dark color="green" class="ml-3" @click="handleSave">save</v-btn>
            </div>
          </div>
          <div class="d-flex mb-3">
            <span>Name:</span>
            <v-spacer></v-spacer>
            <span>{{selectedVersion.name}}</span>
          </div>
          <div class="d-flex mb-3">
            <span>Created:</span>
            <v-spacer></v-spacer>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  style="width: 100px;"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="d-flex mb-3">
            <span>Author:</span>
            <v-spacer></v-spacer>
            <span v-if="!showEdit">{{selectedVersion.author}}</span>
            <v-text-field
              v-if="showEdit"
              v-model="selectedVersion.author"
              class="ma-0 pa-0"
            >{{selectedVersion.author}}</v-text-field>
          </div>
          <div class="d-flex mb-3">
            <span>State:</span>
            <v-spacer></v-spacer>
            <span v-if="!showEdit">
              <v-chip small dark :color="`${chipColor(selectedVersion.state)}`" class="pa-3 pr-3"><span>{{selectedVersion.state}}</span></v-chip>
            </span>
            <v-select
              v-if="showEdit"
              :items="['Draft','In review','Approved']"
              v-model="selectedVersion.state"
              item-value="selectedVersion.state"
            ></v-select>
          </div>
          <div class="d-flex mb-3">
            <span>Changes:</span>
            <v-spacer></v-spacer>
            <span v-if="!showEdit">{{selectedVersion.changes ? selectedVersion.changes:"none"}}</span>
            <v-text-field
              v-if="showEdit"
              v-model="selectedVersion.changes"
              class="ma-0 pa-0"
            >{{selectedVersion.changes}}</v-text-field>
          </div>
        </v-card>
      </template>
    </div>
    <div v-if="showCompare">
      <template>
        <v-card
          class="mx-auto pa-4"
          max-width="344"
        >
        <h3>version Comparison</h3>
        <v-card
          class="mx-auto pa-2 mt-3 mb-5 blue-grey lighten-5"
          max-width="344"
        >
        <div class="d-flex">
          <div class="dotStyle" style="background-color: green;">
          </div>
          <span class="ml-3">Added Content</span>
        </div>
        <div class="d-flex">
          <div class="dotStyle" style="background-color: red;">
          </div>
          <span class="ml-3">Removed Content</span>
        </div>
        <div class="d-flex">
          <div class="dotStyle" style="background-color: orange;">
          </div>
          <span class="ml-3">Modified Content</span>
        </div>
        </v-card>

        <span>comparing version {{ selectedVersion?.name }} with {{ compareVersion?.name }}</span>
        <div>
          <v-card
            class="mx-auto pa-2 mt-3 blue-grey lighten-5"
            max-width="344"
          >
            <div v-for="(change,index) in changes" :key="index">
              <span :class="change.color"> - {{ change.note }}</span>
            </div>
          </v-card>
        </div>
      </v-card>
      </template>
      
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      tillAllVersions : [],
      selectedVersion : null,
      compareVersion:"val",
      showCompare : false,
      changes : [],
      showEdit : false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  methods: {
    selecteVersion(version){
      if(this.showCompare){
        this.compareVersion = version
        this.compareVersions()
      }
      else{
        this.selectedVersion = version
        this.date = this.selectedVersion.created
        console.log("selectedversion",version.id)
      }
      
    },
    compareVersions(){
      this.changes = []
      for (const [key] of Object.entries(this.selectedVersion)) {
        if(this.selectedVersion[key]!=this.compareVersion[key]){
          if(key==="author" || key==="state" || key==="review" || key==="approval" || key==="expiration" || key==="publication"){
            const val1 = this.selectedVersion[key]
            const val2 = this.compareVersion[key]
            if(!val1 && val2)
              this.changes.push({note : `${key} added with value "${this.compareVersion[key]}"`,color:"green--text"})
            else if(val1 && !val2)
              this.changes.push({note : `${key} removed from "${this.selectedVersion[key]}"`,color:"red--text"})
            else
              this.changes.push({note : `${key} changed from "${this.selectedVersion[key]}" to "${this.compareVersion[key]}"`,color:"orange--text"})
          }
        }
      }
    },
    chipColor(status){
      if(status==="Draft")return "blue"
      else if(status==="In review") return "orange"
      return "green"
    },
    handleSave(){
      console.log("selectedVersion",this.selectedVersion)
      this.selectedVersion.created = this.date
      console.log("date",this.date)
      axios.put('http://localhost:5000/editVersion/'+this.selectedVersion.id,this.selectedVersion)
        .then(res => {
          console.log("response",res.data)
          this.showEdit = false
        })
        .catch(err=>{
          console.log("error",err)
        })
    },
    handleCancelCompare(){
      this.showCompare=false
      this.compareVersion=null
      this.compareVersion = null
      this.selectedVersion = null
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    isThisClass(id){
      if(id===this.selectedVersion?.id)
        return true
      return false
    }
  },
  created(){
    axios.get('http://localhost:5000/versions')
      .then(res => {
        console.log("response",res.data)
        this.tillAllVersions = []
        this.tillAllVersions = res.data.versions
      })
      .catch(err=>{
        console.log("error",err)
      })
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
};
</script>

<style scoped>
.selectCard{
  background-color: #E3F2FD;
  border: 1px solid rgb(0, 0, 255);
}
.dotStyle{
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-top: 5px;
}
</style>