<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/"><img src="/images/logo.jpg"></a>
        <div class="navbar-nav">
            <router-link :to="{name: 'place'}" 
                class="nav-item nav-link font">Trang chủ</router-link>
        </div>
        <div class="navbar-nav">
            <router-link :to="{name: 'place.feedback'}" 
                class="nav-item nav-link font"> Liên hệ</router-link>
        </div>
    </nav>
</template>
