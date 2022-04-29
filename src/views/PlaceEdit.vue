<template>
    <div v-if="place" class="page">
        <h4>Hiệu chỉnh Địa điểm</h4>
        <PlaceForm
            :place="place"
            @submit:place="updatePlace"
            @delete:place="deletePlace"
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            place: null,
            message: "",
        };
    },
    methods: {
        async getPlace(id) {
            try {
                this.place = await PlaceService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updatePlace(data) {
            try {
                await PlaceService.update(this.place.id, data);
                this.message = "Địa điểm được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

        async deletePlace() {
            if (confirm("Bạn muốn xóa Địa điểm này?")) {
                try {
                    await PlaceService.delete(this.place.id);
                    this.$router.push({ name: "place" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getPlace(this.id);
        this.message = "";
    },
};
</script>