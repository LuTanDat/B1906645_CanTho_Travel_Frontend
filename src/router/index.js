import { createWebHistory, createRouter } from "vue-router";
import Place from "@/views/Place.vue";

const routes = [
    {
        path: "/",
        name: "place",
        component: Place,
    },
    {
        path: "/places/",
        name: "place.add",
        component: () => import("@/views/PlaceAdd.vue"),
    },
    {
        path: "/places/:id",
        name: "place.edit",
        component: () => import("@/views/PlaceEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/places/registration/:id",
        name: "place.registration",
        component: () => import("@/views/PlaceRegistration.vue"),
        props: true
    },
    {
        path: "/places/feedback",
        name: "place.feedback",
        component: () => import("@/views/Feedback.vue"),
    },
    // {
    //     path: "/places/dashboard",
    //     name: "place.dashboard",
    //     component: () => import("@/views/Dashboard.vue"),
    // },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;