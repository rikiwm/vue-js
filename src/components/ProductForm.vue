<script setup lang="ts">

import { ref, watchEffect } from "vue";
import { useRoute } from 'vue-router'
import { useProductsId, useUpdateProduct }  from '@/composable/products/useProducts';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const route = useRoute()
const id = Number(route.params.id)
const { data:product, isLoading, isError, error } = useProductsId(id)
console.log(product);

const isEdit = ref(!!id)
const title = ref<string>('')
const description = ref<string>('')
const price = ref<number | null>(null)

watchEffect(() => {
    if (product.value) {
        title.value = product.value.title
        description.value = product.value.description
        price.value = product.value.price
    }
})
const handleSubmit = async () => {
  if (isEdit.value) {
    // await updateMutation.mutateAsync({ id, ...form })
    // alert('Product updated successfully!')
        toast({
          title: " Berhasil",
          description: `Product updated successfully!!`,
        });
  } else {
    // Logic for creating 
      toast({
          title: "Berhasil",
          description: `Product created successfully!!`,
        });
  }
}

</script>

<template>
    <div>
        <h1>{{ isEdit ? 'Edit Product' : 'Create Product' }}</h1>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block text-sm font-bold mb-2 capitalize" for="title">
                    {{ product?.title }}
                </label>
             <Input type="text" placeholder="title" v-model="title"  />

            </div>
              <div class="mb-4">
                  <label class="block text-sm font-bold mb-2 capitalize" for="description">
                  description
                </label>
             <!-- <Input type="text" placeholder="description" v-model="description"  /> -->
              <Textarea placeholder="Type your message here." v-model="description" />

            </div>
            <div class="mb-4">
                <label class="block text-sm font-bold mb-2 capitalize" for="price">
                  price
                </label>
                <Input type="number" placeholder="price" v-model="price"  />
            </div>
            <Button type="submit">{{ isEdit ? 'Update' : 'Create' }}</Button>
        </form>
    </div>
</template>