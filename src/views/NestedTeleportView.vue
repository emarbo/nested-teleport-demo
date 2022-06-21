<template>
  <div class="nested-teleports">
    <p>
      If you refresh here, the app reports an hydration mismatch and everything
      is broken
    </p>

    <div>
      <!--
      General note: avoid targeting body with Teleport during SSR, because this makes it impossible for the Teleport to
      locate the correct starting location for hydration with other potential content. Instead, use a dedicated element:

      <body>
        <div id="app">...</div>
        <div id="teleports"><! -- target teleports here -- ></div>
      </body>

      https://github.com/vuejs/core/issues/5242#issuecomment-1129829701
      -->
      <teleport to="#body-teleports">
        <div>
          <div>Content of the parent teleport</div>
          <div>
            <teleport to="#body-teleports">
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
