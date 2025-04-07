<template>
  <div>
    <div class="d-flex">
      <b>Document Versions</b>
      <v-spacer></v-spacer>
      <v-btn depressed small>
        Compare
      </v-btn>
    </div>
    <div class="mt-4 mb-4">
        <v-card
          class="mx-auto mb-3"
          max-width="344"
          outlined
          v-for="version in tillAllVersions"
          :key="version.id"
          @click="selecteVersion(version)"
        >
          <div class="d-flex">
            <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1">
                {{version.name}}
              </v-list-item-title>
              <v-list-item-subtitle>{{version.created}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-spacer></v-spacer>
            <v-chip color="green" class="mr-4 mt-4">Approved</v-chip>
          </div>
        </v-card>
    </div>
    <div v-if="selectedVersion" class="mt-5">
      <template>
        <v-card
          class="mx-auto pa-4"
          max-width="344"
        >
          <div class="d-flex mb-3">
            <b>Version details</b>
            <v-spacer></v-spacer>
            <v-btn v-if="!showEdit" small @click="showEdit=true">edit</v-btn>
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
            <!-- <span v-if="!showEdit">{{selectedVersion.created}}</span> -->
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
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
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
            <!-- <v-text-field
              v-if="showEdit"
              v-model="selectedVersion.created"
              class="ma-0 pa-0"
            >{{selectedVersion.created}}</v-text-field> -->
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
            <span v-if="!showEdit">{{selectedVersion.state}}</span>
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
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      tillAllVersions : [],
      selectedVersion : null,
      showEdit : false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  methods: {
    selecteVersion(version){
      this.selectedVersion = version
      this.date = this.selectedVersion.created
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
</style>