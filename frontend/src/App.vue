<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="4">
          <DocumentVersion />
        </v-col>
        <v-col cols="8">
          <DocumentTimeline />
        </v-col>
      </v-row>
    </v-container>
    
  </v-app>
</template>

<script>
import DocumentVersion from "./components/DocumentVersion.vue"
import DocumentTimeline from "./components/DocumentTimeline.vue"
export default {
  components: {
    DocumentVersion,
    DocumentTimeline,
  },

  data: () => ({
   
  }),
};
</script>
