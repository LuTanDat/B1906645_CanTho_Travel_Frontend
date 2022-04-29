<template>
    <div v-if="place" class="page">
        <h3>Thêm Địa điểm du lịch</h3>
        <PlaceForm
            :place="place"
            @submit:place="createPlace"
        />
        <h5>{{ message }}</h5>
    </div>
</template>

<script>
import PlaceForm from "@/components/PlaceForm.vue";
import PlaceService from "@/services/place.service";

export default {
    components: {
        PlaceForm,
    },
    data() {
        return {
            place: {
                name: "",
                slug: "",
                image: "",
                description: "",
                schedule: "",
                departure: "",
                numberOfSeatsAvailable: 0,
                price: "",
            },
            message: "",
        };
    },
    methods: {
        async createPlace(data) {
            try {
                await PlaceService.create(data);
                this.message = "Địa điểm được tạo thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>