<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
const mode = useColorMode();
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

//import ref dan reactive dari vue
import { ref, reactive } from 'vue';

//import useRouter dari vue-router
import { useRouter } from 'vue-router';

//import js cookie
import Cookies from 'js-cookie';

//import composable useLogin
import { useLogin } from '@/composable/auth/useLogin';

// Tipe untuk error validasi
interface ValidationErrors {
    [key: string]: string
}

// Router
const router = useRouter();

// Composable login
const { mutate, isPending } = useLogin();

// Form state
const username = ref<string>('');
const password = ref<string>('');

// Error state
const errors = reactive<ValidationErrors>({})

// Handle submit form
const handleLogin = (e: Event) => {
    e.preventDefault()
    //call mutasi login
    mutate(
        { username: username.value, password: password.value },
        {
            onSuccess: (data: any) => {
             console.log('Login sukses, data:', data);
            Cookies.set('token', data.token);
            // toast({
            //   title: "Login Berhasil",
            //   description: `Selamat datang, ${username.value}!`,
            // });
            console.log('Redirecting...')
                router.push({ name: 'Dashboard' })
            },
            onError: (error: any) => {
                console.log('error', error.response.data.errors);
                Object.assign(errors, error.response.data.errors);
                //tampilkan toast error
            toast({
                title: "Login Gagal ⚠️",
                description: "Periksa kembali username atau password Anda.",
                variant: "destructive", // merah
              });
            },
        }
    )
}
</script>

<template>
     <section class="container py-24 sm:py-32">
       
  <Card class="mx-auto max-w-sm rounded-lg border border-border bg-card p-3 ">
    <CardHeader>
      <CardTitle class="text-2xl text-center">
        Login
      </CardTitle>
      <CardDescription>
          <div v-if="errors.Username" class="alert alert-danger">
              Username or Password is incorrect
          </div>
           <div v-if="errors.Password" class="alert alert-danger">
              Username or Password is incorrect
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="flex flex-col gap-4">
            <Button variant="outline" class="w-full">
            Login with SSO
            </Button>
        </div>
        <div class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span class="relative z-10 bg-background px-2 text-muted-foreground rounded-md">
            Or continue with
            </span>
        </div>
            <form @submit="handleLogin">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
                          
          <Input
            v-model="username"
            id="email"
            type="text"
            placeholder="buditest"
            required
          />
            <div v-if="errors.Username" class="alert alert-danger mt-2 rounded-4">
                {{ errors.Username }}
            </div>
        </div>
        <div class="grid gap-2 mt-4">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="#" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>
          <Input v-model="password" id="password" type="password" required  placeholder="********" />
            <div v-if="errors.Password" class="alert alert-danger mt-2 rounded-4">
                                {{ errors.Password }}
                            </div>
        </div>
   
        <Button type="submit" class="w-full bg-teal-500 hover:bg-teal-600 mt-4" :disabled="isPending">
       {{ isPending ? 'Loading...' : 'Login' }}
        </Button>
        <!-- <Button variant="outline" class="w-full">
          Login with Google
        </Button> -->

               
</form> 
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="#" class="underline">
          Sign up
        </a>
      </div>
    </CardContent>
  </Card>
  </section>
</template>
