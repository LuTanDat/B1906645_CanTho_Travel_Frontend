<script>
export default {
    props: {
        places: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    computed: {
        selectedIndex() {
            return this.activeIndex;
        },
    },
    methods: {
        select(index) {
            this.$emit("update:activeIndex", index);
        },
    },
};
</script>

<template>
    <div>
        <div
            class="col-3 mt-3 mb-3 floatLeft"
            v-for="(place, index) in places"
            :key="place.name"
            :class="{ active: index === selectedIndex }"
            @click="select(index)"
        >   <a href="http://localhost:8081#details">
                <div class="placeListItem">
                    <img :src="`/images/${place.image}`" :alt="place.name" class="img"/>
                    <h5 class="text-center">{{ place.name }}</h5>
                    <h5 class="text-center">{{ place.schedule }}</h5>
                    <h5 class="text-center">{{ place.departure }}</h5>
                    <h5 class="text-center">Chỗ trống: {{ place.numberOfSeatsAvailable }}</h5>
                    <h5 class="text-center red">{{ place. price }}</h5>
                </div>
            </a>
        </div>
        <div style="clear: both;"></div>
    </div>
</template>