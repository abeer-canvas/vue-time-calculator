<template>
  <div class="row">
    <!-- Calculate Time blocks -->
    <div class="cal-blocks col-6 mr-2">
      <p class="input-text">Insert time-blocks:</p>
      <textarea
        class="block-input d-block rounded w-100 p-2"
        rows="5"
      ></textarea>
      <button class="btn btn-success btn-calculate mt-2 w-100">
        CALCULATE
      </button>

      <!-- Result -->
      <div class="card shadow-sm mt-5">
        <div class="card-header alert alert-success h4 text-center">
          TOTAL TIME
        </div>
        <div class="card-body">
          <h4 class="card-title text-center">00:00</h4>
        </div>
      </div>
    </div>

    <!-- Calculate average time -->
    <div class="cal-avg col-6 ml-2"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.input-text {
  font-size: 20px;
}
.btn-calculate {
  font-family: "Concert One", cursive;
  font-size: 24px;
  font-weight: 200;
}
.card-header {
  font-family: "Concert One", cursive;
}
.block-input {
  font-family: "Roboto", sans-serif;
  font-size: 20px;
}
</style>