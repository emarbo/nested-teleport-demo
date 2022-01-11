<template>
  <div class="nested-teleports">
    <p>
      If you refresh here, the app reports an hydration mismatch and everything
      is broken
    </p>

    <div>
      <teleport to="body">
        <div>
          <div>Content of the parent teleport</div>
          <div>
            <teleport to="body">
              <div>Content of the child teleport</div>
            </teleport>
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NestedTeleportView",
});
</script>
