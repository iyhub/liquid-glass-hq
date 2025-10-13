<script lang="ts">
  const year = $state(new Date().getFullYear());
</script>

<footer class="bg-secondary text-center py-4 flex flex-col items-center gap-2">
  <ul
    class="flex flex-col md:flex-row items-center gap-4 underline underline-offset-4 text-gray-600 text-xs"
  >
    <li>
      <a href="https://imagetoimage.app/" rel="dofollow"> Image to Image AI </a>
    </li>
    <li>
      <a href="https://tossfly.com/" rel="dofollow">Tossfly</a>
    </li>
    <li>
      <a href="https://imagedescriber.cc/" rel="dofollow"
        >Image Describer AI
      </a>
    </li>
  </ul>

  <p class="text-sm text-muted-foreground">
    &copy; {year} LiquidGlassHQ. All rights reserved.
  </p>
</footer>
