import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import OrdersView from "../views/OrdersView.vue";
import TrackingView from "../views/TrackingView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Amazon Clone",
            component: HomeView,
        },
        {
            path: "/checkout",
            name: "Checkout",
            component: CheckoutView,
        },
        {
            path: "/orders",
            name: "Orders",
            component: OrdersView,
        },
        {
            path: "/tracking",
            name: "Tracking",
            component: TrackingView
        }
    ],
});

// used to display change the name on the brower's tab for each page.
router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

export default router;