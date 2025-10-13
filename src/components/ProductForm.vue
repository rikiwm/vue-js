<script setup lang="ts">

import { ref, watchEffect } from "vue";
import { useRoute } from 'vue-router'
import { useProductsId, useUpdateProduct, useCreateProduct }  from '@/composable/products/useProducts';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast/use-toast";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const createMutation = useCreateProduct()

const { toast } = useToast();

const route = useRoute()
const id = Number(route.params.id)
const { data:product, isLoading, isError, error } = useProductsId(id)
console.log(product);

const isEdit = ref(!!id)
// const title = ref<string>('')
// const description = ref<string>('')
// const price = ref<number | null>(null)

const form = ref({
  title: '',
  price: 0,
  description: '',
  image: '',
  category: 'general',
})

watchEffect(() => {
    if (product.value) {
        form.value.title = product.value.title
        form.value.description = product.value.description
        form.value.price = product.value.price
    }
})
const handleSubmit = async () => {
  if (isEdit.value) {

        toast({
          title: " Berhasil",
          description: `Product updated successfully!!`,
        });
  } else {
    // Logic for creating
    await createMutation.mutateAsync(form.value)
    toast({
      title: "Berhasil",
      description: `Product created successfully!! ${form.value.title}!`,
    });
  }
}

// import { VisStackedBar, VisXYContainer } from "@unovis/vue"
// import { Minus, Plus } from "lucide-vue-next"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"

// const goal = ref(350)

// type Data = typeof data[number]
// const data = [
//   { goal: 400 },
//   { goal: 300 },
//   { goal: 200 },
//   { goal: 300 },
//   { goal: 200 },
//   { goal: 278 },
//   { goal: 189 },
//   { goal: 239 },
//   { goal: 300 },
//   { goal: 200 },
//   { goal: 278 },
//   { goal: 189 },
//   { goal: 349 },
// ]
</script>

<template>
    <!-- <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">
        Open Drawer
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="p-4 pb-0">
          <div class="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8 shrink-0 rounded-full"
              :disabled="goal <= 200"
              @click="goal -= 10"
            >
              <Minus class="h-4 w-4" />
              <span class="sr-only">Decrease</span>
            </Button>
            <div class="flex-1 text-center">
              <div class="text-7xl font-bold tracking-tighter">
                {{ goal }}
              </div>
              <div class="text-[0.70rem] uppercase text-muted-foreground">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8 shrink-0 rounded-full"
              :disabled="goal >= 400"
              @click="goal += 10"
            >
              <Plus class="h-4 w-4" />
              <span class="sr-only">Increase</span>
            </Button>
          </div>
          <div class="my-3 px-3 h-[120px]">
            <VisXYContainer
              :data="data"
              class="h-[120px]"
              :style="{
                'opacity': 0.9,
                '--theme-primary': `hsl(var(--foreground))`,
              }"
            >
              <VisStackedBar
                :x="(d: Data, i :number) => i"
                :y="(d: Data) => d.goal"
                color="var(--theme-primary)"
                :bar-padding="0.1"
                :rounded-corners="0"
              />
            </VisXYContainer>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer> -->

    <Card class="w-full mx-auto bg-muted/50">
    <form @submit.prevent="handleSubmit">
    <CardHeader>
      <CardTitle>{{ isEdit ? 'Edit Product' : 'Create Product' }}</CardTitle>
      <CardDescription>{{ isEdit ? 'Edit Product' : 'Create Product' }} your new product in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
            <div class="mb-4">
              <Label for="title">Title</Label>
             <Input type="text" placeholder="title" v-model="form.title" required/>
            </div>
              <div class="mb-4">
              <Label for="description">Description</Label>
              <Textarea placeholder="Type your message here." v-model="form.description" required />
            </div>
            <div class="mb-4">
                <Label for="price">Price</Label>
                <Input type="number" placeholder="price" v-model="form.price" required/>
            </div>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button type="button" variant="outline">
        Cancel
      </Button>
      <Button type="submit">{{ isEdit ? 'Update' : 'Create' }}</Button>
    </CardFooter>
        </form>
  </Card>
</template>