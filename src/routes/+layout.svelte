<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Siderbar.svelte";
  import Sidebar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();

  import { ModeWatcher } from "mode-watcher";
  import { open } from "$lib/store/sidebar.js";
  import { cn } from "$lib/utils";

  let status = $state();

  open.subscribe((value) => {
    status = value;
  });
</script>

<ModeWatcher />

<Navbar />

<div class={"min-h-screen"}>
  <Sidebar />
  <div class="container mx-auto mt-20">
    {@render children()}
  </div>
</div>

<Footer />
