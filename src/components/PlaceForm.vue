<template>
    <Form
        @submit="$emit('submit:place', placeLocal)"
        :validation-schema="placeFormSchema"
        class="border"
    >
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="placeLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Slug</label>
            <Field
                name="slug"
                type="text"
                class="form-control"
                v-model="placeLocal.slug"
            />
            <ErrorMessage name="slug" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Hình ảnh</label>
            <Field
                name="image"
                type="text"
                class="form-control"
                v-model="placeLocal.image"
            />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Mô tả</label>
            <Field
                name="description"
                type="text"
                class="form-control"
                v-model="placeLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Lịch trình</label>
            <Field
                name="schedule"
                type="text"
                class="form-control"
                v-model="placeLocal.schedule"
            />
            <ErrorMessage name="schedule" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="name">Khởi hành</label>
            <Field
                name="departure"
                type="text"
                class="form-control"
                v-model="placeLocal.departure"
            />
            <ErrorMessage name="departure" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Số chỗ còn lại</label>
            <Field
                name="numberOfSeatsAvailable"
                type="Number"
                class="form-control"
                v-model="placeLocal.numberOfSeatsAvailable"
            />
            <ErrorMessage name="numberOfSeatsAvailable" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Giá vé</label>
            <Field
                name="price"
                type="text"
                class="form-control"
                v-model="placeLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        
        

        <div class="form-group">
            <button class="btn btn-primary m-3">Lưu</button>
            <button
                v-if="placeLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="$emit('delete:place', placeLocal.id)"
            >
                Xóa
            </button>
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
    emits: ["submit:place", "delete:place"],
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
            slug: yup
                .string()
                .required("Slug phải có giá trị."),
            image: yup
                .string()
                .required("Hình ảnh phải có giá trị."),
            description: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .max(1000, "Description có nhiều nhất 1000 ký tự."),
            schedule: yup
                .string()
                .required("Lịch trình phải có giá trị."),
            departure: yup
                .string()
                .required("Thời gian khởi hành phải có giá trị."),
            numberOfSeatsAvailable: yup
                .number()
                .required("Số chỗ ngồi còn trống phải có giá trị."),
            price: yup
                .string()
                .required("Giá phải có giá trị.")

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