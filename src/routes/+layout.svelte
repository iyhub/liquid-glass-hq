<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Siderbar.svelte";
  import Sidebar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { PUBLIC_CLARITY_ID } from "$env/static/public";
  import { onMount } from "svelte";

  let { children } = $props();

  import { ModeWatcher } from "mode-watcher";
  import { open } from "$lib/store/sidebar.js";

  onMount(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", '${PUBLIC_CLARITY_ID}');
  `;
    document.head.appendChild(script);
  });

  let status = $state();

  open.subscribe((value) => {
    status = value;
  });
</script>

<svelte:head>
  <script
    defer
    data-domain="liquidglasshq.com"
    src="https://stats.tierany.net/js/script.js"
  ></script>
</svelte:head>

<ModeWatcher />

<Navbar />

<div class={"min-h-screen"}>
  <Sidebar />
  <div class="container mx-auto mt-20">
    {@render children()}
  </div>
</div>

<Footer />
