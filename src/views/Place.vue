<template>
    <div class="row">
        <div class="col-md-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h3>
                Các địa điểm du lịch
                <i class="fa-solid fa-plane-arrival ml-3"></i>
            </h3>
            <PlaceList
                v-if="filteredPlacesCount > 0"
                :places="filteredPlaces"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có địa điểm du lịch nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary p-2" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button v-if="isAdmin" class="btn btn-sm btn-success" @click="goToAddPlace">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button v-if="isAdmin"
                    class="btn btn-sm btn-danger"
                    @click="removeAllPlaces"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
                
                <button v-if="isAdmin" class="btn btn-sm btn-primary" @click="showListUserRegs">
                    <i class="fa-solid fa-clipboard-list"></i> DS Khách Đặt Tour
                </button>

                <!-- <router-link :to="{ name: 'place.dashboard' }">
                    <button  class="btn btn-sm btn-success">
                        <i class="fa-solid fa-lock"></i> Đăng Nhập
                    </button>
                </router-link> -->

                <a href="http://localhost:8081#loginAdmin">
                    <button @click="setLogin" v-if="!isAdmin" class="btn btn-sm btn-success p-2">
                            <i class="fa-solid fa-lock"></i> Đăng Nhập
                    </button>
                </a>
                

                <button @click="setLogout" v-if="isAdmin" class="btn btn-sm btn-danger p-2">
                    <i class="fa-solid fa-right-from-bracket"></i> Đăng Xuất
                </button>
                
            </div>
        </div>

        <!-- DE HIEN THI CHI TIET DIA DIEM DU LICH -->
        <div class="mt-3 border" id="details">
            <div v-if="activePlace" class="boder p-3">
                <h4 class="text-center">
                    Chi tiết Địa điểm du lịch
                </h4>
                <PlaceCard :place="activePlace" />
                
                <router-link
                    :to="{
                        name: 'place.edit',
                        params: { id: activePlace.id },
                    }"
                >
                    <span v-if="isAdmin" class="mt-2 badge badge-warning mr-3">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span
                    >
                </router-link>
                <router-link
                    :to="{
                        name: 'place.registration',
                        params: { id: activePlace.id },
                    }"
                >
                    <span class="btn btn-sm btn-success ml-3">
                        <i class="fas fa-plus"></i> Đặt Tour </span
                    >
                </router-link>
            </div>
        </div>

        <!-- DE HIEN THI DANH SACH NGUOI DUNG DA DAT TUOR -->
        <div class="mt-3 border" id="detailsUser">
            <div v-if="isShowListUser" class="boder p-3">
                <h2 class="text-center m-4">
                    DANH SÁCH KHÁCH HÀNG ĐÃ ĐẶT TOUR
                </h2>

                <div>
                    <div
                        class="col-3 mt-3 mb-3 floatLeft"
                        v-for="regUserInfo in regUserInfos"
                        :key="regUserInfo.name"
                    >
                            <div class="regUserListItem p-2">
                                <h4 class="text-center">{{ regUserInfo.nameUser }}</h4>
                                <h4 class="text-center">{{ regUserInfo.phoneUser }}</h4><hr>
                                <h5 class="text-center">{{ regUserInfo.name }}</h5>
                                <h5 class="text-center">{{ regUserInfo.schedule }}</h5>
                                <h5 class="text-center">{{ regUserInfo.departure }}</h5>
                                <h5 class="text-center red">{{ regUserInfo. price }}</h5>
                            </div>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>

        <!-- FORM NHAP THONG TIN DANG NHAP (Chi ADMIN) -->
        <form id="loginAdmin" v-if="isLogin" class="login mt-3" @submit.prevent="accountVerification">
            <h2 class="p-3">Đăng nhập</h2>
            <div class="container">
                <div class="row log">
                    <div class="col">
                        <i class="fa-solid fa-user-tie fa-2xl"></i>
                        <label for="name" class="mw h6 m-3">Tài Khoản:</label>
                    </div>
                    <div class="col-8">
                        <input type="text" id="name" v-model="nameAdmin">
                    </div>
                    <div class="col">
                        <i class="fa-solid fa-key fa-2xl"></i>
                        <label for="name" class="mw h6 m-3">Mật Khẩu:</label>
                    </div>
                    <div class="col-8">
                        <input type="password" id="pw" v-model="pwAdmin">
                    </div>
                </div>
            </div>
            <button type="submit" class="m-3 btn btn-sm btn-success h3">Đăng nhập</button><br />
            <h5 class="p-3 yellow">{{message}}</h5>
	    </form>

    </div>
</template>

<script>
import PlaceCard from "@/components/PlaceCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import PlaceList from "@/components/PlaceList.vue";
import PlaceService from "@/services/place.service";
// import DashBoard from "./Dashboard.vue";

export default {
    components: {
        PlaceCard,
        InputSearch,
        PlaceList,
        // DashBoard
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            places: [],
            regUserInfos: [],
            activeIndex: -1,
            searchText: "",
            
            isShowListUser: false,

            isCheck: false, // bien tam de luu trang thai dang nhap hay chưa
            isLogin: false, // bat su kien click nut dang nhap
            isAdmin: false, // nguoi dung chua dang nhap
            message: "Đăng nhập thất bại",
            nameAdmin: "",
			pwAdmin: "",
			accountAdmin:{
				name: "admin",
				pw: "admin",
			},
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng place thành chuỗi để tiện cho tìm kiếm.
        placeStrings() {
            return this.places.map((place) => {
                const { name, email, address, phone } = place;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các place có chứa thông tin cần tìm kiếm.
        filteredPlaces() {
            if (!this.searchText) return this.places;
            return this.places.filter((place, index) =>
                this.placeStrings[index].includes(this.searchText)
            );
        },
        activePlace() {
            if (this.activeIndex < 0) return null;
            return this.places[this.activeIndex];
        },
        filteredPlacesCount() {
            return this.filteredPlaces.length;
        },

        accountVerification(){
			if(this.accountAdmin.name === this.nameAdmin && this.accountAdmin.pw === this.pwAdmin){
				this.isAdmin = true;
				this.message = "";
                this.isLogin = false;
                this.$router.push({ name: "place" });
			}
			else {
				this.isAdmin = false;
				this.message = "Đăng nhập thất bại";
				this.nameAdmin = "";
				this.pwAdmin = "";
			}
		}
    },
    methods: {
        async retrievePlaces() {
            try {
                this.places = await PlaceService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async retrieveRegUserInfos() {
            try {
                this.regUserInfos = await PlaceService.getAllUser();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrievePlaces();
            this.activeIndex = -1;
        },

        showListUserRegs() {
            this.retrieveRegUserInfos();
            this.isShowListUser = true;
            this.activeIndex = -1;
        },

        setLogin(){
            this.isLogin = true;
        },

        async removeAllPlaces() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await PlaceService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddPlace() {
            this.$router.push({ name: "place.add" });
        },

        setLogout() {
            this.isAdmin = false;
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>
