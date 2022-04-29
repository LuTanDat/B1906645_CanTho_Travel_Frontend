<template>
    <Form class="border"
        @submit="$emit('submit:place', placeLocal)"
        :validation-schema="placeFormSchema"
    >

        <div class="form-group">
            <label for="">Tên Địa điểm</label>
            <Field
                name="name" disabled
                type="text"
                class="form-control"
                v-model="placeLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="">Lịch trình</label>
            <Field
                name="schedule" disabled
                type="text"
                class="form-control"
                v-model="placeLocal.schedule"
            />
            <ErrorMessage name="schedule" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="">Khởi hành</label>
            <Field
                name="departure" disabled
                type="text"
                class="form-control"
                v-model="placeLocal.departure"
            />
            <ErrorMessage name="departure" class="error-feedback" />
        </div>
    
        <div class="form-group">
            <label for="">Giá vé</label>
            <Field
                name="price" disabled
                type="text"
                class="form-control"
                v-model="placeLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="">Tên của bạn</label>
            <Field
                name="nameUser"
                type="text"
                class="form-control"
                v-model="placeLocal.nameUser"
            />
            <ErrorMessage name="nameUser" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="">Số điện thoại</label>
            <Field
                name="phoneUser"
                type="text"
                class="form-control"
                v-model="placeLocal.phoneUser"
            />
            <ErrorMessage name="phoneUser" class="error-feedback" />
        </div>
        

        <div class="form-group">
            <button class="btn btn-primary m-3">Đăng ký</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:place"],
    props: {
        place: { type: Object, required: true }
    },
    data() {
        const placeFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(500, "Tên có nhiều nhất 65 ký tự."),
            schedule: yup
                .string()
                .required("Lịch trình phải có giá trị."),
            departure: yup
                .string()
                .required("Thời gian khởi hành phải có giá trị."),
            price: yup
                .string()
                .required("Giá phải có giá trị."),
            nameUser: yup
                .string()
                .required("Tên của bạn phải có giá trị."),
            phoneUser: yup
                .string()
                .required("Số điện thoại phải có giá trị."),

        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //  để liên kết với các input trên form
            placeLocal: this.place,
            placeFormSchema,
        };
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>