<template>
  <div class="container">
    <!-- Head Grid => for logo and categories -->
    <div class="head-grid">
      <div class="row mt-3">
        <!-- Logo -->
        <div class="logo col-6">
          <h2>Time Calculator</h2>
        </div>
        <!-- Categories -->
        <div class="categories text-right col-6">
          <div class="btn-menu btn btn-success">
            MENU <i class="fas fa-bars"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Head Grid -->

    <!-- Deafult Calculation page -->
    <abirs-way class="mt-3"></abirs-way>
  </div>
</template>

<script>
import AbirsWay from "./AbirsWay.vue";

export default {
  components: {
    AbirsWay,
  },
};
</script>

<style scoped>
.logo {
  font-family: "Satisfy", cursive;
}
.btn-menu {
  font-weight: bold;
}
</style>;
