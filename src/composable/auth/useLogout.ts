// import js-cookie
import Cookies from "js-cookie";

// import useRouter from vue-router
import { useRouter } from 'vue-router';

// custom composables useLogout
export const useLogout = (): (() => void) => {

    // initialize router
    const router = useRouter();

    // Fungsi logout
    const logout = (): void => {
        console.log("Logging out...");
        // Hapus token dan user dari cookie
        Cookies.remove("token");
        // Cookies.remove("user");

        console.log("Cookies after removal:", {
            token: Cookies.get("token"),
        });
        // redirect to login
        router.push({ name: 'login' })
    };

    return logout;
};