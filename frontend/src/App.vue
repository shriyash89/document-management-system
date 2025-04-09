<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="4">
          <DocumentVersion :tillAllVersions="tillAllVersions" />
        </v-col>
        <v-col cols="8">
          <DocumentTimeline @updateVersions="handleUpdateVersion($event)" />
        </v-col>
      </v-row>
    </v-container>
    
  </v-app>
</template>

<script>
import axios from "axios"
import DocumentVersion from "./components/DocumentVersion.vue"
import DocumentTimeline from "./components/DocumentTimeline.vue"
export default {
  components: {
    DocumentVersion,
    DocumentTimeline,
  },

  data: () => ({
    tillAllVersions : []
  }),
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
  methods:{
    handleUpdateVersion(newVersion){
      this.tillAllVersions.push(newVersion)
    }
  }
};
</script>
