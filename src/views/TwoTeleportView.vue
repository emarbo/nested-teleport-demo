<template>
  <div class="two-teleports">
    <p>
      If you refresh here, the app reports an hydration mismatch and everything
      breaks after route change
    </p>

    <div>
      <teleport to="body">
        <div>Content of the first teleport</div>
      </teleport>
    </div>
    <div>
      <teleport to="body">
        <div>Content of the second teleport</div>
      </teleport>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TwoTeleportView",
});
</script>
