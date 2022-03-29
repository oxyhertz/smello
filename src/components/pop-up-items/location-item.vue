<template>
    <div>
        <input type="text" placeholder="Yes.." ref="autocomplete" />
    </div>
    <GMapMap
        class="maps"
        :center="center"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
    >
        <GMapCluster>
            <GMapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="center = m.position"
            />
        </GMapCluster>
    </GMapMap>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            autocomplete: '',
            center: { lat: 32.109333, lng: 34.855499 },
            markers: [
                {
                    position: {
                        lat: 32.109333, lng: 34.855499
                    },
                },

            ]
        }
    },
    mounted() {
        this.autocomplete = new google.maps.places.Autocomplete(
            this.$refs["autocomplete"],
            {
                types: ['establishment'],
                componentRestrictions: { 'country': ['IL'] },
                fields: ['place._id', 'geometry', 'name']
            });

        this.autocomplete.addListener("place_changed", this.yes)
    },
    methods: {
        yes() {
            console.log(this.autocomplete.getPlace());
            this.onSearch()
        },
        onPanTo(lat = 35.6895, lng = 139.6917) {
            this.center = {
                lat,
                lng,
            }
            this.markers[0].position = {
                lat,
                lng,
            }
            console.log('this.center', this.center)
        },
        geocode(val) {
            axios
                .get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: val,
                        key: 'AIzaSyCv9mke4qM6dFwfae-VsXNlKlW2Mnk4kBk',
                    },
                })
                .then(res => res.data.results[0].geometry.location)
                .then(res => this.onPanTo(res.lat, res.lng));
        },

        onSearch() {
            this.geocode(this.$refs["autocomplete"].value);
        }
    },
    components: {
    }

}
</script>

<style>
.maps {
    height: 20vh;
}
</style>



