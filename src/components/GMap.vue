<template>
  <section v-if="showMap" class="listMap">
    <!-- {{isFixed}} -->
    <GmapMap
      v-if="center"
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        @click="zoomIn"
        :key="index"
        :position="m"
        :visible="m.visibility"
      />
    </GmapMap>
  </section>
</template>

<script>
export default {
  props: {
    coords: Object,
    marker: Array
  },

  data() {
    return {
      markers: [],
      center: null,
      showMap: false,
      zoom: 7
    };
  },

  created() {
    this.center = this.coords;
    this.markers = this.marker;
  },

  methods: {
    zoomIn() {
      this.zoom = 13;
    }
  },

  async mounted() {
    if (!this.marker) {
      let temp = [];
      temp.push(this.coords);
      this.markers = temp;
      this.showMap = true;
    }
    this.showMap = true;
  }
};
</script>