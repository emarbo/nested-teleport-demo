<template>
  <div class="one-teleport">
    <p>
      If you refresh here, there are no Hydration errors but the app breaks on
      route change.
    </p>

    <div>
      <teleport to="body">
        <div>Content of the single one teleport</div>
      </teleport>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OneTeleportView",
});
</script>
