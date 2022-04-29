<script>
    export default {
        props: {
            place: { type: Object, required: true },
        },
    };
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ place.name }}
        </div>
        <div class="p-1">
            <strong>Hình ảnh:</strong>
            {{ place.image }}
        </div>
        <div class="p-1">
            <strong>Mô tả:</strong>
            {{ place.description }}
        </div>
        <div class="p-1">
            <strong>Lịch trình:</strong>
            {{ place.schedule }}
        </div>
        <div class="p-1">
            <strong>Khởi hành:</strong>
            {{ place.departure }}
        </div>
        <div class="p-1">
            <strong>Chỗ trống:</strong>
            {{ place.numberOfSeatsAvailable }}
        </div>
        <div class="p-1">
            <strong>Giá vé:</strong>
            {{ place.price }}
        </div>
    </div>
</template>