<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar"
import { faker } from 'https://esm.sh/@faker-js/faker';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"
import NavMain from "@/components/NavMain.vue"
import NavProjects from "@/components/NavProjects.vue"
import NavUser from "@/components/NavUser.vue"
import TeamSwitcher from "@/components/TeamSwitcher.vue"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

// This is sample data.
const data = {
  user: {
    name: faker.person.prefix('male') + faker.person.firstName('male') + faker.person.lastName('male'),
    email: faker.internet.exampleEmail(),
    avatar: faker.image.avatar(),
  },
  teams: [
    {
      name: "PADANG INC",
      logo: GalleryVerticalEnd,
      plan: "Goverment",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Data Manager",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Products",
          url: "/admin/products",
        },
        {
          title: "Tags",
          url: "/admin/tags",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Post",
          url: "#",
        },
        {
          title: "Page",
          url: "#",
        },
        {
          title: "Product",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "User",
          url: "/admin/users",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
