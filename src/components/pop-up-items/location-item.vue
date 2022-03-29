<template>
    <div>
        <Autocomplete @input="getItems" :results="items"></Autocomplete>
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
    <!-- <el-button type="primary" plain @click="tlv">TLV</el-button>
    <el-button type="primary" plain @click="had">HAD</el-button>
    <el-button type="primary" plain @click="btym">BT-YM</el-button>-->
</template>

<script>
import Autocomplete from 'vue3-autocomplete'
import { mapsService } from '../../services/maps-service.js'
export default {

    data() {
        return {
            center: { lat: 32.109333, lng: 34.855499 },
            markers: [
                {
                    position: {
                        lat: 32.109333, lng: 34.855499
                    },
                },
                {
                    position: {
                        lat: 32.434046, lng: 34.919652
                    },
                },
                {
                    position: {
                        lat: 32.017136, lng: 34.745441
                    },
                }
                , // Along list of clusters
            ]
        }
    },
    created() {
        console.log('oppppppppppppppppppppppppppppppppp')
        mapsService.getPlaces()
    },
    methods: {
        tlv() {
            this.center = { lat: 32.109333, lng: 34.855499 }
        },
        had() {
            this.center = { lat: 32.434046, lng: 34.919652 }
        },
        btym() {
            this.center = { lat: 32.017136, lng: 34.745441 }
        }

    },
    components: {
        Autocomplete,
    }

}
</script>

<style>
.maps {
    height: 20vh;
}
</style>



