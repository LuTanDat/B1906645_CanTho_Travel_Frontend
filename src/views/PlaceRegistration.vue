<template>
    <div v-if="place" class="page">
        <h4>Đăng ký Tour du lịch</h4>
        <RegUserInfoForm
            :place="Object.assign(place, placeUser)" 
            @submit:place="RegistrationPlace"
        />     
        <h5>{{ message }}</h5>
    </div>
</template>

<script>
import RegUserInfoForm from "@/components/RegUserInfoForm.vue";
import PlaceService from "@/services/place.service";

export default {
    components: {
        RegUserInfoForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            place: null,
            placeUser: {
                nameUser: "",
                phoneUser: "",
            },
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

        async RegistrationPlace(data) {
            try {
                await PlaceService.createUser(data);
                this.message = "Địa điểm được đăng ký thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getPlace(this.id);
        this.message = "";
    },
};
</script>